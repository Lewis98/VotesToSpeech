const APIConf = require('../config/voiceRSS.conf');
const SURL = require('./shortener');

const reqHandler = require('axios').default;

module.exports.generateLink = async (text) => {
    if (typeof text != 'string'){
        throw new Error(`TTS - text must be string, '${typeof text}' passed : ('${text}')`);
    }

    let response = await reqHandler.get(`http://api.voicerss.org/?key=${APIConf.API_Key}&hl=en-gb&src=${text}`);
    let ttsURL = await SURL.shortern(response.request.res.responseUrl);

    if (response.status == 200){
        return ttsURL;
    }else{
        console.warn(`Error generating TTS : API returned ${response.status} - ${response.statusText}`)
        return null;
    }; 

}