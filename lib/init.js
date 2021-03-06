/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const { CosmosStateStore } = require('./impl/CosmosStateStore')
const { StateStoreError } = require('./StateStoreError')
const { StateStore } = require('./StateStore')
const TvmClient = require('@adobe/adobeio-cna-tvm-client')

// eslint-disable-next-line jsdoc/require-jsdoc
async function wrapTVMRequest (promise) {
  return promise
    .catch(e => {
      if (e.status === 401 || e.status === 403) {
        throw new StateStoreError(`forbidden access to TVM, make sure your ow credentials are valid`, StateStoreError.codes.Forbidden)
      }
      throw e // throw raw tvm error
    })
}

/**
 * Initializes and returns the key-value-store SDK.
 *
 * To use the SDK you must either provide your
 * [OpenWhisk credentials]{@link module:types~OpenWhiskCredentials} in
 * `config.ow` or your own
 * [Azure Cosmos credentials]{@link module:types~AzureCosmosMasterCredentials} in `config.cosmos`.
 *
 * OpenWhisk credentials can also be read from environment variables (`OW_NAMESPACE` or `__OW_NAMESPACE` and `OW_AUTH` or `__OW_AUTH`).
 *
 * @param {object} [config={}] used to init the sdk
 *
 * @param {module:types~OpenWhiskCredentials} [config.ow]
 * {@link module:types~OpenWhiskCredentials}. Set those if you want
 * to use ootb credentials to access the state management service. OpenWhisk
 * namespace and auth can also be passed through environment variables:
 * `__OW_NAMESPACE` and `__OW_AUTH`
 *
 * @param {module:types~AzureCosmosMasterCredentials|module:types~AzureCosmosPartitionResourceCredentials} [config.cosmos]
 * [Azure Cosmos resource credentials]{@link module:types~AzureCosmosPartitionResourceCredentials} or
 * [Azure Cosmos account credentials]{@link module:types~AzureCosmosMasterCredentials}
 *
 * @param {object} [config.tvm] tvm configuration, applies only when passing OpenWhisk credentials
 * @param {string} [config.tvm.apiUrl] alternative tvm api url.
 * @param {string} [config.tvm.cacheFile] alternative tvm cache file, set to `false` to disable caching of temporary credentials.
 * @returns {Promise<StateStore>} A StateStore instance
 * @throws {StateStoreError}
 */
async function init (config = {}) {
  // todo joi-validate config here or leave it to StateStore impl + TvmClient?

  // 1. set provider
  const provider = 'cosmos' // only cosmos is supported for now

  // 2. instantiate tvm if ow credentials
  let tvm
  if (provider === 'cosmos' && !config.cosmos) {
    // remember config.ow can be empty if env vars are set
    const tvmArgs = { ow: config.ow, ...config.tvm }
    tvm = await TvmClient.init(tvmArgs)
  }

  // 3. return state store based on provider
  switch (provider) {
    case 'cosmos':
      return CosmosStateStore.init(config.cosmos || (await wrapTVMRequest(tvm.getAzureCosmosCredentials())))
    // default:
    //   throw new StateStoreError(`provider '${provider}' is not supported.`, StateStoreError.codes.BadArgument)
  }
}

module.exports = { init }
