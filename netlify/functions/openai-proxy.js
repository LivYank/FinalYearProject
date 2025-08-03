// netlify/functions/openai-proxy.js

import fetch from 'node-fetch';

exports.handler = async (event, context) => {
    console.log('OpenAI API Key:', process.env.VITE_OPENAI_API_KEY ? 'Key found' : 'Key not found');

    if (event.httpMethod !== 'POST') {
        console.log('Invalid HTTP method.');
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const body = JSON.parse(event.body);
        const { text } = body;

        if (!text) {
            console.log('Missing text in request body.');
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing "text" in request body' })
            };
        }

        const openAIApiKey = process.env.VITE_OPENAI_API_KEY;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openAIApiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: `Translate the following text to sign language gestures: "${text}"` }]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('OpenAI API Error:', response.status, errorText);
            throw new Error(`OpenAI API responded with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const translation = data.choices[0].message.content;

        console.log('Translation successful.');

        return {
            statusCode: 200,
            body: JSON.stringify({ translation })
        };

    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to process translation', details: error.message })
        };
    }
};