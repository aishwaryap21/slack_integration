import { RTMClient } from "@slack/rtm-api";
import { SLACK_OAUTH_TOKEN, BOT_SPAM_CHANNEL } from './constants';
import { WebClient } from "@slack/web-api";
const packageJson = require('../package.json');
//initialise the client
const rtm=new RTMClient(SLACK_OAUTH_TOKEN);
const web=new WebClient(SLACK_OAUTH_TOKEN);

rtm.start().catch(console.error); 
rtm.on('ready', async () =>{
    console.log('bot started')
    sendMessage(BOT_SPAM_CHANNEL,`Bot version ${packageJson.version} is Online`)
}); 
rtm.on('slack_event', async (eventType, event) =>{
    if (event &&event.type==='message'){
            hello(event.channel,event.user,event.text);        
    }
} 
    )

    function hello(channelId,userId,message){
    sendMessage(channelId,`Heya!<@${userId}> texted you ${message}`)
}
async function sendMessage(channel, message){
    //helper function to post a message.
    await web.chat.postMessage({
        channel:channel,
        text:message,
    })
}