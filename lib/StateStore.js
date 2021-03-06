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

const { StateStoreError } = require('./StateStoreError')
const joi = require('@hapi/joi')

// eslint-disable-next-line jsdoc/require-jsdoc
function throwNotImplemented (methodName) {
  throw new StateStoreError(`method "${methodName}" is not implemented`, StateStoreError.codes.NotImplemented)
}

// eslint-disable-next-line jsdoc/require-jsdoc
function validateInput (input, joiObject) {
  const res = joi.validate(input, joiObject)
  if (res.error) throw new StateStoreError(res.error.message, StateStoreError.codes.BadArgument)
}

// eslint-disable-next-line jsdoc/require-jsdoc
function validateKey (filePath, label = 'key') {
  validateInput(filePath, joi.string().label(label).required())
}

// eslint-disable-next-line jsdoc/require-jsdoc
function validateValue (filePath, label = 'value') {
  validateInput(filePath, joi.any().label(label)) // make it .required() ?
}

/**
 * @abstract
 * @class StateStore
 * @classdesc Cloud State Management
 * @hideconstructor
 */
class StateStore {
  /* **************************** CONSTRUCTOR/INIT TO IMPLEMENT ***************************** */

  /**
   * Creates an instance of StateStore.
   *
   * @param {boolean} _isTest set this to true to allow construction
   * @memberof StateStore
   * @private
   * @abstract
   */
  constructor (_isTest) { if (new.target === StateStore && !_isTest) throwNotImplemented('StateStore') }
  // marked as private to hide from jsdoc, wrapped by index.js init
  /**
   * Instantiates and returns a new StateStore object
   *
   * @static
   * @param {object} credentials abstract credential object
   * @returns {Promise<StateStore>} a new StateStore instance
   * @memberof StateStore
   * @private
   */
  static async init (credentials) { throwNotImplemented('init') }

  /* **************************** STATE STORE OPERATORS ***************************** */

  /**
   * Retrieves the state value for given key.
   * If the key doesn't exist returns undefined.
   *
   * @param {string} key state key identifier
   * @returns {Promise<any>} value stored under key or undefined
   * @memberof StateStore
   */
  async get (key) {
    validateKey(key)
    return this._get(key)
  }

  /**
   * Creates or updates a state key-value pair
   *
   * @param {string} key state key identifier
   * @param {any} value state value
   * @param {module:types~StateStorePutOptions} [options={}] put options
   * @returns {Promise<string>} key
   * @memberof StateStore
   */
  async put (key, value, options = {}) {
    validateKey(key)
    validateValue(value)
    validateInput(options, joi.object().label('options').keys({ ttl: joi.number() }))
    options.ttl = options.ttl || StateStore.DefaultTTL // => undefined, null, 0 sets to default
    return this._put(key, value, options)
  }

  /**
   * Deletes a state key-value pair
   *
   * @param {string} key state key identifier
   * @returns {Promise<string>} key
   * @memberof StateStore
   */
  async delete (key) {
    validateKey(key)
    return this._delete(key)
  }

  // /**
  //  * List all existing state keys.
  //  *
  //  * Use wisely as this is a slow operation => o(n)
  //  *
  //  * @returns {Promise<Array<string>>} list of keys
  //  * @memberof StateStore
  //  */
  // async keys () {
  //   return this._keys()
  // }

  /* **************************** PRIVATE METHODS TO IMPLEMENT ***************************** */
  async _get (key) { throwNotImplemented('_get') }
  async _put (key, value, options) { throwNotImplemented('_put') }
  async _delete (key) { throwNotImplemented('_delete') }
  // async _keys () { throwNotImplemented('_keys') }
}

StateStore.DefaultTTL = 86400 // 24hours

module.exports = { StateStore }
