/**
 * MembersTTS model
 * 
 * @module models/membersTTS
 * @author Lewis Stokes
 */

const childModel = require('./members');
const TTS = require('../helpers/TTS');



/**
 *  Return votes by MP
 * 
 * @description Returns array of MPs and apiIDs
 * @param id {number} - ID of MP to list voting history of
 */
module.exports.ListVotesTTS = async (id, generateFile=false, collated=false)=>{

    if (typeof generateFile != 'boolean') {
        throw new Error(`ListVotesTTS - generateFile must be boolean, '${typeof generateFile}' supplied`);
    }

    if (typeof collated != 'boolean') {
        throw new Error(`ListVotesTTS - collated must be boolean, '${typeof collated}' supplied`);
    }

    if (!Number.isInteger(id)) {
        throw new Error(`ListVotesTTS - ID must be integer, '${typeof id}' supplied`);
    };
    
    let MP = await childModel.getMP(id);
    let voteData = await childModel.ListVotes(id);
    
    let ttsOutput = '';
    if (voteData.length == 0) {
        ttsOutput = `${MP.name}, ${MP.party} M P, appears to have no voting record.`
    } else {
        ttsOutput = `${MP.name}, ${MP.party} M P, has voted: `;

        if (collated){
            votesFor = [];
            votesAgainst = [];

            voteData.forEach((vote) => {
                if (vote.voted == 'For') {
                    votesFor.push(vote.act)
                }else{
                    votesAgainst.push(vote.act)
                }
            })

            ttsOutput += `For the following acts. `;
            votesFor.forEach((act) => {
                ttsOutput += act + ', ';
            })

            ttsOutput += `And has voted against the following acts. `;
            votesAgainst.forEach((act) => {
                ttsOutput += act + ', ';
            })
        }else{
            voteData.forEach((vote) => {
                ttsOutput += `${vote.voted}, the ${vote.act} act. `;
            })
        }
        
    }

    if (generateFile) {
        link = await TTS.generateFile(MP.apiId, ttsOutput);
    } else {
        link = await TTS.generateLink(ttsOutput);
    }

    return link;

};

