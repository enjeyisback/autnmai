const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const url = `https://www.auntm.ai${event.path}`;
    const response = await fetch(url, {
        method: event.httpMethod,
        headers: event.headers,
        body: event.body
    });

    const body = await response.text();

    return {
        statusCode: response.status,
        headers: response.headers.raw(),
        body: body
    };
};
