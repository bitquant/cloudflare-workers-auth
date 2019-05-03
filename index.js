var API_KEY_HEADER_NAME = null;
var API_KEY_QUERY_PARAM_NAME = null;
var apiKeys = new Set();

function init(config) {

    API_KEY_HEADER_NAME = config.apiKeyHeaderName;
    API_KEY_QUERY_PARAM_NAME = config.apiKeyQueryParamName;

    for (key of config.apiKeys) {
        apiKeys.add(key)
    }
}

function apiKeyAuth(request) {

    if (API_KEY_HEADER_NAME !== null) {
        let headerApiKey = request.headers.get(API_KEY_HEADER_NAME);
        if (apiKeys.has(headerApiKey)) {
            return;
        }
    }

    return new Response("401 - Unauthorized\n", {
        status: 401, headers: { 'Content-Type': 'text/plain; charset=utf-8'}
    });
}

exports.apiKeyAuth = apiKeyAuth;
