import { Client } from '@streamygg/tmi.js';
import { ACESSTOKEN, USERNAME } from '../config';
import { createClient } from 'redis';

const redisClient = createClient();

redisClient.on('error', (err) => console.error('Redis Client Error', err));

const init = async () => {
  await redisClient.connect();

  const client = new Client({
    token: ACESSTOKEN,
    initialChannels: ['brydenisnotsmart', 'freedoomok'],
  });

  client.connect();

  client.on("message", async (data) => {
    if (data.user.id == client.identity.userId) return;
    console.log(data.user.badges)
    const message = {
      streamy: {
          platform: "twitch",
          account: {
              username: USERNAME,
          }
      },
      sender: {
        id: data.user.id,
        username: data.user.name,
        displayName: data.user.displayName,
        color: data.user.color,
        badges: data.user.badges
      },
      message: {
        content: data.message.text,
        id: data.message.id,
        flags: data.message.flags
      }
  };
    await redisClient.publish('chat', JSON.stringify(message));
  });
}

export default { init };