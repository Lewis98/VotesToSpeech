/**
 * Members model
 * 
 * @module models/members
 * @author Lewis Stokes
 */

const reqHandler = require('axios').default;


/**
 *  Return MPs
 * 
 * @description Returns array of MPs and apiIDs
 */
module.exports.ListMPs = async ()=>{

    rawData = await reqHandler.get('https://members-api.parliament.uk/api/Members/Search?skip=0&take=20');

    returnObj = [];

    rawData.data.items.forEach((MP, index) => {
        returnObj.push = {
            apiId: MP.value.id,
            name: MP.value.nameDisplayAs
        }
    })
    

    return returnObj
}


/**
 *  Return MP by ID
 * 
 * @description Returns MP by apiID
 * @param id {number} - ID of MP to return
 */
module.exports.getMP = async (id)=>{

    rawData = await reqHandler.get(`https://members-api.parliament.uk/api/Members/${id}`);

    let MP = rawData.data.value;

    returnObj = {
        apiId: MP.id,
        name: MP.nameDisplayAs,
        party: MP.latestParty.name
    };    

    return returnObj
}


/**
 *  Return votes by MP
 * 
 * @description Returns array of MPs and apiIDs
 * @param id {number} - ID of MP to list voting history of
 */
module.exports.ListVotes = async (id)=>{

    
    if (!Number.isInteger(id)) {
        throw new Error(`ListVotes - ID must be integer, '${typeof id}' supplied`);
        return null;
    }
    

    let rawData = await reqHandler.get(`https://members-api.parliament.uk/api/Members/${id.toString()}/Voting?house=1`);

    let returnObj = [];

    rawData.data.items.forEach((vote) => {
        returnObj.push({
            apiId: vote.value.id,
            act: vote.value.title,
            voted: (vote.value.inAffirmativeLobby ? 'For' : 'Against')
        });
    })
    

    return returnObj
}

