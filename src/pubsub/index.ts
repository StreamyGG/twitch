import { StaticAuthProvider } from '@twurple/auth';
import { ApiClient } from '@twurple/api';
import { EventSubWsListener } from '@twurple/eventsub-ws';
import { ACESSTOKEN, CLIENTID } from '../config';

const init = async () => {
    const authProvider = new StaticAuthProvider(CLIENTID!, ACESSTOKEN!);
    const apiClient = new ApiClient({ authProvider });
    
    const listener = new EventSubWsListener({ apiClient });
    listener.start();
    
}

export default { init };