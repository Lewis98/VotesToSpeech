/**
 * MembersTTS model
 * 
 * @module models/membersTTS
 * @author Lewis Stokes
 */

const reqHandler = require('axios').default;
const childModel = require('./members');

const SURL = require('../helpers/shortener');
const TTS = require('../helpers/TTS');



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

    link = await TTS.generateLink(ttsOutput);

    return link;

};

