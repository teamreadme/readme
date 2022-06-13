const client = require('@sendgrid/client');
const SENDGRID_ENABLED = !!process.env.SENDGRID_API_KEY;

if (SENDGRID_ENABLED) {
    client.setApiKey(process.env.SENDGRID_API_KEY);
}

/**
 * Send a request to SendGrid
 * @param config 
 * @param throwOnError if there is a request error, should we throw an error. Returns null if false
 * @returns 
 */
async function sendGridRequest(config: { url: string, method: string, body?: any, qs?: any }, throwOnError: boolean = true) {
    if (!SENDGRID_ENABLED) return;
    try {
        console.log("Sending sendgrid request", config)
        let response = await client.request(config);
        return response;
    } catch (err) {
        console.error(err);
        if (throwOnError) {
            throw new Error("Internal server error");
        }
        return null;
    }
}

/**
 * Look up the SendGrid ID of the provided contact and delete them from SendGrid
 * @param email 
 * @returns 
 */
async function deleteSendGridContact(email: string) {
    if (!SENDGRID_ENABLED) return;
    //Get the SendGrid ID of the provided email
    let sendGridResponse = await sendGridRequest({
        url: `/v3/marketing/contacts/search/emails`,
        method: 'POST',
        body: { emails: [email] }
    }, false)
    if (!sendGridResponse || !sendGridResponse?.length || sendGridResponse[0].statusCode !== 200) {
        console.error("Error requesting contact from SendGrid");
        return;
    }

    //Delete the contact from SendGrid
    const contactId = sendGridResponse[0].body.result[email].contact.id;
    console.log(`Deleting contact id ${contactId} from SendGrid`);
    return await sendGridRequest({
        url: `/v3/marketing/contacts`,
        method: 'DELETE',
        qs: { "ids": contactId }
    })
}

export { sendGridRequest, deleteSendGridContact };