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

/**
 * @class StateStoreError
 * @classdesc Errors raised by state store lib
 * @hideconstructor
 * @augments Error
 */
class StateStoreError extends Error {
  /**
   * Creates an instance of StateStoreError.
   *
   * @param {string} message error message
   * @param {StateStoreError.codes} code Storage Error code
   * @param {object} [internal] debug error object for internal/underlying wrapped errors
   * @memberof StateStoreError
   */
  constructor (message, code, internal) {
    code = StateStoreError.codes[code]
    message = `[${code}] ${message}`
    super(message)
    this.name = 'StateStoreError'// this.constructor.name
    this.code = code
    this._internal = internal
  }
}

/**
 * @enum {string} StateStoreError codes
 */
StateStoreError.codes = {
  Internal: 'Internal',
  NotImplemented: 'NotImplemented',
  BadArgument: 'BadArgument',
  Forbidden: 'Forbidden',

  PayloadTooLarge: 'PayloadTooLarge'
}

module.exports = { StateStoreError }
