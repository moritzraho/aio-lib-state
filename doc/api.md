## Modules

<dl>
<dt><a href="#module_types">types</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#StateStore">StateStore</a></dt>
<dd><p>Cloud State Management</p>
</dd>
<dt><a href="#StateStoreError">StateStoreError</a> ⇐ <code>Error</code></dt>
<dd><p>Errors raised by state store lib</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#init">init(credentials, [options])</a> ⇒ <code><a href="#StateStore">Promise.&lt;StateStore&gt;</a></code></dt>
<dd><p>Initializes and returns the key-value-store SDK.</p>
<p>To use the SDK you must either provide your
<a href="#module_types..OpenWhiskCredentials">OpenWhisk credentials</a> in
<code>credentials.ow</code> or your own
<a href="#module_types..AzureCosmosMasterCredentials">Azure Cosmos credentials</a> in <code>credentials.cosmos</code>.</p>
<p>OpenWhisk credentials can also be read from environment variables (<code>OW_NAMESPACE</code> or <code>__OW_NAMESPACE</code> and <code>OW_AUTH</code> or <code>__OW_AUTH</code>).</p>
</dd>
</dl>

<a name="module_types"></a>

## types

* [types](#module_types)
    * [~OpenWhiskCredentials](#module_types..OpenWhiskCredentials) : <code>object</code>
    * [~AzureCosmosPartitionResourceCredentials](#module_types..AzureCosmosPartitionResourceCredentials) : <code>object</code>
    * [~AzureCosmosMasterCredentials](#module_types..AzureCosmosMasterCredentials) : <code>object</code>

<a name="module_types..OpenWhiskCredentials"></a>

### types~OpenWhiskCredentials : <code>object</code>
An object holding the OpenWhisk credentials

**Kind**: inner typedef of [<code>types</code>](#module_types)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| namespace | <code>string</code> | user namespace |
| auth | <code>string</code> | auth key |

<a name="module_types..AzureCosmosPartitionResourceCredentials"></a>

### types~AzureCosmosPartitionResourceCredentials : <code>object</code>
An object holding the Azure Cosmos resource credentials with permissions on a single partition and container

**Kind**: inner typedef of [<code>types</code>](#module_types)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| endpoint | <code>string</code> | cosmosdb resource endpoint |
| resourceToken | <code>string</code> | cosmosdb resource token restricted to the partitionKey |
| databaseId | <code>string</code> | id for cosmosdb database |
| containerId | <code>string</code> | id for cosmosdb container within database |
| partitionKey | <code>string</code> | key for cosmosdb partition within container authorized by resource token |

<a name="module_types..AzureCosmosMasterCredentials"></a>

### types~AzureCosmosMasterCredentials : <code>object</code>
An object holding the Azure Cosmos account master key

**Kind**: inner typedef of [<code>types</code>](#module_types)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| endpoint | <code>string</code> | cosmosdb resource endpoint |
| masterKey | <code>string</code> | cosmosdb account masterKey |
| databaseId | <code>string</code> | id for cosmosdb database |
| containerId | <code>string</code> | id for cosmosdb container within database |
| partitionKey | <code>string</code> | key for cosmosdb partition where data will be stored |

<a name="StateStore"></a>

## *StateStore*
Cloud State Management

**Kind**: global abstract class  

* *[StateStore](#StateStore)*
    * *[.get(key)](#StateStore+get) ⇒ <code>Promise.&lt;any&gt;</code>*
    * *[.put(key, value)](#StateStore+put) ⇒ <code>Promise.&lt;string&gt;</code>*
    * *[.delete(key)](#StateStore+delete) ⇒ <code>Promise.&lt;string&gt;</code>*
    * *[.listKeys()](#StateStore+listKeys) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>*

<a name="StateStore+get"></a>

### *stateStore.get(key) ⇒ <code>Promise.&lt;any&gt;</code>*
Retrieves the state value for given key.
If the key doesn't exist returns undefined.

**Kind**: instance method of [<code>StateStore</code>](#StateStore)  
**Returns**: <code>Promise.&lt;any&gt;</code> - value stored under key or undefined  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | state key identifier |

<a name="StateStore+put"></a>

### *stateStore.put(key, value) ⇒ <code>Promise.&lt;string&gt;</code>*
Creates or updates a state key-value pair

**Kind**: instance method of [<code>StateStore</code>](#StateStore)  
**Returns**: <code>Promise.&lt;string&gt;</code> - key  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | state key identifier |
| value | <code>any</code> | state value |

<a name="StateStore+delete"></a>

### *stateStore.delete(key) ⇒ <code>Promise.&lt;string&gt;</code>*
Deletes a state key-value pair

**Kind**: instance method of [<code>StateStore</code>](#StateStore)  
**Returns**: <code>Promise.&lt;string&gt;</code> - key  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | state key identifier |

<a name="StateStore+listKeys"></a>

### *stateStore.listKeys() ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>*
List all existing state keys.

Use wisely as this is a slow operation => o(n)

**Kind**: instance method of [<code>StateStore</code>](#StateStore)  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> - list of keys  
<a name="StateStoreError"></a>

## StateStoreError ⇐ <code>Error</code>
Errors raised by state store lib

**Kind**: global class  
**Extends**: <code>Error</code>  

* [StateStoreError](#StateStoreError) ⇐ <code>Error</code>
    * [.StateStoreError](#StateStoreError.StateStoreError)
        * [new StateStoreError(message, code, [internal])](#new_StateStoreError.StateStoreError_new)
    * [.codes](#StateStoreError.codes) : <code>enum</code>

<a name="StateStoreError.StateStoreError"></a>

### StateStoreError.StateStoreError
**Kind**: static class of [<code>StateStoreError</code>](#StateStoreError)  
<a name="new_StateStoreError.StateStoreError_new"></a>

#### new StateStoreError(message, code, [internal])
Creates an instance of StateStoreError.


| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | error message |
| code | [<code>codes</code>](#StateStoreError.codes) | Storage Error code |
| [internal] | <code>object</code> | debug error object for internal/underlying wrapped errors |

<a name="StateStoreError.codes"></a>

### StateStoreError.codes : <code>enum</code>
StateStoreError codes

**Kind**: static enum of [<code>StateStoreError</code>](#StateStoreError)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| Internal | <code>string</code> | <code>&quot;Internal&quot;</code> | 
| NotImplemented | <code>string</code> | <code>&quot;NotImplemented&quot;</code> | 
| BadArgument | <code>string</code> | <code>&quot;BadArgument&quot;</code> | 
| Forbidden | <code>string</code> | <code>&quot;Forbidden&quot;</code> | 
| KeyNotFound | <code>string</code> | <code>&quot;KeyNotFound&quot;</code> | 

<a name="init"></a>

## init(credentials, [options]) ⇒ [<code>Promise.&lt;StateStore&gt;</code>](#StateStore)
Initializes and returns the key-value-store SDK.

To use the SDK you must either provide your
[OpenWhisk credentials](#module_types..OpenWhiskCredentials) in
`credentials.ow` or your own
[Azure Cosmos credentials](#module_types..AzureCosmosMasterCredentials) in `credentials.cosmos`.

OpenWhisk credentials can also be read from environment variables (`OW_NAMESPACE` or `__OW_NAMESPACE` and `OW_AUTH` or `__OW_AUTH`).

**Kind**: global function  
**Returns**: [<code>Promise.&lt;StateStore&gt;</code>](#StateStore) - A StateStore instance  
**Throws**:

- [<code>StateStoreError</code>](#StateStoreError) 


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| credentials | <code>object</code> |  | used to init the sdk |
| [credentials.ow] | [<code>OpenWhiskCredentials</code>](#module_types..OpenWhiskCredentials) |  | [OpenWhiskCredentials](#module_types..OpenWhiskCredentials). Set those if you want to use ootb credentials to access a the state management service. OpenWhisk namespace and auth can also be passed through environment variables: `OW_NAMESPACE` or `__OW_NAMESPACE` and `OW_AUTH` or `__OW_AUTH` |
| [credentials.cosmos] | [<code>AzureCosmosMasterCredentials</code>](#module_types..AzureCosmosMasterCredentials) \| [<code>AzureCosmosPartitionResourceCredentials</code>](#module_types..AzureCosmosPartitionResourceCredentials) |  | [Azure Cosmos resource credentials](#module_types..AzureCosmosPartitionResourceCredentials) or [Azure Cosmos account credentials](#module_types..AzureCosmosMasterCredentials) |
| [options] | <code>object</code> | <code>{}</code> | options |
| [options.tvmApiUrl] | <code>string</code> |  | alternative tvm api url. Only makes sense in the context of OpenWhisk credentials. |
| [options.tvmCacheFile] | <code>string</code> |  | alternative tvm cache file, defaults to `<tmpfolder>/.tvmCache`. Set to `false` to disable caching. Only makes sense in the context of OpenWhisk credentials. |
