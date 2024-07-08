const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const url = `https://www.auntm.ai${event.path}${event.rawQuery ? '?' + event.rawQuery : ''}`;
    const response = await fetch(url, {
        method: event.httpMethod,
        headers: {
            ...event.headers,
            host: 'www.auntm.ai'
        }
    });

    const body = await response.text();

    // Ensure the content type matches the response from the upstream server
    const contentType = response.headers.get('content-type') || 'text/html';

    return {
        statusCode: response.status,
        headers: {
            'Content-Type': contentType
        },
        body: body
    };
};
