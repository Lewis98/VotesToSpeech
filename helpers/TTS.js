/**
 * Text to Speech module
 * 
 * @module helpers/TTS
 * @author Lewis Stokes
 */


const fs = require('fs');
const SURL = require('./shortener');

const reqHandler = require('axios').default;

/**
 *  Generate link to TTS output
 * 
 * @description Returns link of TTS file (hosted by voice RSS)
 * @param {string} text - Text to convert to speech
 */
module.exports.generateLink = async (text) => {
    if (typeof text != 'string'){
        throw new Error(`TTS - text must be string, '${typeof text}' passed : ('${text}')`);
    }

    let response = await reqHandler.get(`http://api.voicerss.org/?key=${process.env.TTS_API_KEY}&hl=en-gb&src=${text}`);
    

    if (response.status == 200){
        let ttsURL = await SURL.shortern(response.request.res.responseUrl);
        return ttsURL;
    }else{
        console.warn(`Error generating TTS : API returned ${response.status} - ${response.statusText}`)
        return null;
    }; 

}


/**
 *  Generate file containing TTS output
 * 
 * @description Returns link of TTS file (hosted by voice RSS)
 * @param {string} fname - Filename to store output data
 * @param {string} text - Text to convert to speech
 */
module.exports.generateFile = async (fname, text) => {
    if (typeof text != 'string'){
        throw new Error(`TTS - text must be string, '${typeof text}' passed : ('${text}')`);
    }

    let response = await reqHandler.get(`http://api.voicerss.org/?key=${APIConf.API_Key}&hl=en-gb&src=${text}`);

    if (response.status == 200){
        fs.writeFileSync(__dirname + `\\..\\TTSOutput\\${fname}.wav`, response.data);
        let ttsURL = `/TTSOutput/${fname}.wav`;
        return ttsURL;
    }else{
        console.warn(`Error generating TTS : API returned ${response.status} - ${response.statusText}`)
        return null;
    }; 

}