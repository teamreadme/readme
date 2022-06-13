import { LogSnag } from 'logsnag';
const LOG_SNAG_ENABLED: boolean = !!process.env.LOG_SNAG_API_KEY;

let client: LogSnag;
if (LOG_SNAG_ENABLED) {
    client = new LogSnag(process.env.LOG_SNAG_API_KEY!);
}

/**
 * Publish events to https://logsnag.com
 * @param config
 */
export async function logSnagPublish(config: {
    project: string,
    channel: string,
    description?: string;
    event: string,
    icon: string,
    notify: boolean
}) {
    if (LOG_SNAG_ENABLED) {
        console.log(`Sending ${config.event} event to the ${config.channel} logsnag channel`)
        try {
            await client.publish(config);
        } catch (err) {
            console.error("Error publishing to logsnag", err);
        }
    }
}