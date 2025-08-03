

import fetch from 'node-fetch';

exports.handler = async (event, context) => {
    // This is where we securely get the key from Netlify
    const OPENAI_API_KEY = process.env.VITE_OPENAI_API_KEY;

    // This is a safety check to make sure the key is there
    if (!OPENAI_API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'OpenAI API key not configured.' }),
        };
    }

    try {
        // This gets the data sent from your front-end
        const { prompt } = JSON.parse(event.body);

        // This is the secure call to OpenAI using the hidden key
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'text-davinci-003', // This is an example, use your model
                prompt: prompt,
                max_tokens: 150,
            }),
        });

        const data = await response.json();

        // This sends the result back to your front-end
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data from OpenAI.' }),
        };
    }
};