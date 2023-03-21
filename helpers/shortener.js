const reqHandler = require('axios').default;

module.exports.shortern = async (link) => {
    if (typeof link != 'string'){
        throw new Error(`shortener - link must be string, '${typeof link}' passed : ('${link}')`);
    }

    let surl = await reqHandler.post('https://url-shortener-service.p.rapidapi.com/shorten', {url: link}, {headers : {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'ffeafb812amsh508a5fe868359f9p164974jsn613d3226fb28',
        'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
    }})

    return surl.data.result_url;
}