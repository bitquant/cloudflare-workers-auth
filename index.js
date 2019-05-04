var apiKeyHeader;
var apiKeyQueryParam;
var apiKeys = new Set();

function init(config) {

    apiKeyHeader = config.apiKeyHeader;
    apiKeyQueryParam = config.apiKeyQueryParam;

    for (key of config.apiKeys) {
        apiKeys.add(key)
    }
}

function apiKey(request) {

    if (typeof apiKeyHeader !== 'undefined') {
        let headerValue = request.headers.get(apiKeyHeader);
        if (apiKeys.has(headerValue)) {
            return;
        }
    }

    return new Response("401 - Unauthorized\n", {
        status: 401, headers: { 'Content-Type': 'text/plain; charset=utf-8'}
    });
}

exports.init = init;
exports.apiKey = apiKey;
