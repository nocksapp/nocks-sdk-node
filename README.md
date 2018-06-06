# Nocks SDK Node

Nocks Node SDK is a node package arround the Nocks API. It can be used in any (`>=7.0.0`) Node environment and, because it doesn't use any `core Node JS modules`, it is also compatible with a browser environment, so it can, for example, be used in React(-native).

## Installation
Installation requires no more than just a simple install of the npm package with `npm` (or `yarn`):

`npm install nocks-sdk-node --save`

## Getting Started
The `SDK` supports both the calls to the Nocks `api` endpoints (`api scope`) as well to the `oauth` endpoints (`oauth scope`). All `oauth` calls can directly be used from the `oauth scope`. The `api` calls are divided at `resource level` in the `api scope` (e.g. `scope.user.findAuthenticated`).

Each call will return a [javascript native promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises), which is resolved with the result or rejected with an [error](#errors). With an exception of the `getOauthUri` call in the `oauth` scope, this will return the result directly (or throw an error) instead of a promise.

For the most calls  [authentication](https://docs.nocks.com/#authentication) is required. Checkout the [docs](https://docs.nocks.com/) to see what is required for every call.

### Oauth
The `oauth` scope provides the following methods:

* getOauthUri (`will not return a promise`)
* requestToken
* refreshToken
* passwordGrantToken
* scopes
* tokenScopes

#### Example
```javascript
// es6
import NocksOauth from 'nocks-sdk-node/oauth';

const scope = NocksOauth.scope({
    platform: 'production', // Use sandbox for testing
    scopes: ['user.read', 'user.update'],
    clientId: '1',
    clientSecret: 'super_secret',
    redirectUri: 'https://example.com',
});

// Use the oauth methods. For more, check examples
const oauthUri = scope.getOauthUri();

// At Nocks oauth redirect
const code = 'code_from_nocks_oauth_redirect';

return scope.requestToken({ code })
    .then(({ access_token, refresh_token, expires_on }) => {
        // Do something
    });
```

Please checkout the [oauth docs](https://docs.nocks.com/#oauth-applications) and [examples](#examples) to see how the `oauth` methods can be used.

### API
The `api` scope provides all the `Nocks` resources. Please checkout the [resources docs](https://docs.nocks.com/#public-resources) and [examples](#examples).

```javascript
// es6
import NocksApi from 'nocks-sdk-node/api';

const scope = NocksApi.scope({
    platform: 'production', // Use sandbox for testing
    accessToken: 'user_access_token',
});

// Use the api methods. For more, check examples
return scope.user.findAuthenticated()
    .then((user) => {
        // Do something with the user
    });
```

#### Request/Response Transformers
The SDK uses `transformers` to transform the `requests` to the `api` and the `responses` from the `api`. This means that there is not always a 1-1 mapping between the `api` and the `sdk`. Most of the time there is, but there are some exceptions:

##### Data property
A `typical` response from the `api` looks like the following:

```javascript
{
    "data": {...} // or "data": [...]
    "status": 200
}
```

However the `promise` returned from a call with the `SDK` will only resolve the `data` part or the `data` and `pagination` part. See [examples](#examples) and [pagination](#pagination).

Also the `data` property is removed in `nested` resources. For example a `transaction` with `payments` looks like:
```javascript
{
    ...
    "payments": [{...}], // instead of "payments": { "data": [{...}] }
}
```

##### Date
A `date` in a `api response` is auto converted to a `javascript date` (or to `null`).

The `SDK` makes it also possible to use a `javascript date` while making a `request` to the `api`. The `SDK` will then convert the provided date to a `string` that is accepted by the `api`.

`Note that the Nocks api dates are always UTC +2, the SDK will auto convert the provided dates to UTC +2 with date.getTimezoneOffset()`

##### Numbers
A `number` returned from the `API` is auto converted to a javascript `number`.

[Money](https://docs.nocks.com/#money) is handled a bit different. In `money` objects the SDK will add an additional `value` property which holds the `number` representation of the `amount` in responses. When making a request, the `value` property can also be used, the SDK will then set the `amount` based on the `value` property.

```javascript
{
    "amount": {
        "amount": "250", // Can be omitted when doing a request
        "currency": "NLG",
        "value": 250,
    }
}
```

##### Additional properties
To some `responses` the SDK will add additional properties for convenient. For example a `merchant` response will have a method `findInvoices` to retreive all the invoices for that `merchant`.

In each [example](#examples) the `additional propterties` are listed.

#### Pagination
For all `get` endpoints that may return a list of results the `api` uses [pagination](https://docs.nocks.com/#pagination). These calls in the SDK (typically the `.find` methods) return an object with the properties `pagination` and `data`. Where the `data` property is the result `array` and the `pagination` property is an `object` with the pagination info. An example of a `pagination` object:

```javascript
{
    "total": 56,
    "count": 25,
    "per_page": 25,
    "current_page": 1,
    "total_pages": 3,
    "links": {
        "next": "https://api.nocks.com/api/v2/transaction?page=2"
    },
    // Additional helper functions
    "hasNext": () => boolean
    "hasPrevious": () => boolean
    "getNextPage": () => integer
    "getPreviousPage": () => integer
}
```

Example call with `pagination`:
```javascript
// es6
import NocksApi from 'nocks-sdk-node/api';

const scope = NocksApi.scope({
    platform: 'production',
    accessToken: 'user_access_token',
});

return scope.transaction.find()
    .then(({ pagination, data }) => {
        // use pagination object (e.g. pagination.hasNext())
        // data is an array with the found transactions
    });
```

### Errors

The SDK uses three types of errors: `ConfigurationError`, `ValidationError` and `ResponseError`. (These types can be imported from `nocks-sdk-node/errors`).

```javascript
// es6
import { ConfigurationError, ValidationError, ResponseError } from 'nocks-sdk-node/errors';
```

#### Configuration Errors
A `ConfigurationError` may occur when calling `.scope` or doing any other call inside the `oauth` or `api` scope. The `ConfigurationError` simply means that there is something wrong with your `.scope` configuration. Each `ConfigurationError` will have a clear message with what is wrong.

#### Validation Errors
A `ValidationError` will occur when trying to make a call to `Nocks` but there is something wrong with the parameters you provided to the method call. Each `ValidationError` will have a clear message with what is wrong.

`Note that the SDK doesn't check your request data that is send to the api, if there is something wrong with your data the api call will be rejected with a ResponseError`

#### Response Errors
A `ResponseError` will occur when a call to `Nocks` fails. The `ResponseError` will always contain the following data: `status`, `message` and `code`. For example:

```javascript
{
    "status": 400,
    "message": "An error occurred",
    "code": 400,
}
```

## Examples
In the [examples directory](./examples) you will find examples for each call that is supported in this SDK.

## Support
Need help or support? Please check https://www.nocks.com/support.

Found a bug? Please check the existing GitHub issues and open a new issue if necessary. Or even better, create a pull request to directly resolve the issue you have found!
