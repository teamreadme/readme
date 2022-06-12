const client = require('@sendgrid/client');
if (process.env.SENDGRID_API_KEY != null) {
    client.setApiKey(process.env.SENDGRID_API_KEY);
}

async function sendGridRequest(config: { url: string, method: string, body: any }) {
    if (process.env.SENDGRID_API_KEY == null) return;
    try {
        return await client.request(config);
    } catch (err) {
        console.error(err);
        throw new Error("Internal server error");
    }
}

export { sendGridRequest };