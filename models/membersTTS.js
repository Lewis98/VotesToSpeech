/**
 * MembersTTS model
 * 
 * @module models/membersTTS
 * @author Lewis Stokes
 */

const reqHandler = require('axios').default;
const childModel = require('./members');

const SURL = require('../helpers/shortener');

const APIConf = require('../config/voiceRSS.conf');

/**
 *  Return votes by MP
 * 
 * @description Returns array of MPs and apiIDs
 * @param id {number} - ID of MP to list voting history of
 */
module.exports.ListVotesTTS = async (id)=>{

    if (!Number.isInteger(id)) {
        throw new Error(`ListVotesTTS - ID must be integer, '${typeof id}' supplied`);
        return null;
    };
    
    let MP = await childModel.getMP(id);
    let voteData = await childModel.ListVotes(id);    

    let ttsOutput = `${MP.name}, ${MP.party} MP, has voted: `;
    voteData.forEach((vote) => {
        ttsOutput += `${vote.voted}, the ${vote.act} act. `;
    })


    let response = await reqHandler.get(`http://api.voicerss.org/?key=${APIConf.API_Key}&hl=en-gb&src=${ttsOutput}`);
    let ttsURL = await SURL.shortern(response.request.res.responseUrl);

    if (response.status == 200){
        let responseObj = {
            url: ttsURL,
            data: response.data
        }

        return responseObj;
    }else{
        throw new Error(response)
    };  

};

