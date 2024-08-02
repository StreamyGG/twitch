import { Client } from '@streamygg/tmi.js';
import { ACESSTOKEN } from '../config';

const init = async () => {

const client = new Client({
  token: ACESSTOKEN,
  initialChannels: ['brydenisnotsmart'],
});

client.connect();

client.on("message", (data) => {
   if (data.user.id == client.identity.userId) return;
    if (data.message.text == "!ping") {
        data.reply("Pong!")
    }
})
}
export default { init };