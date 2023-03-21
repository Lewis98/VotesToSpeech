const reqHandler = require('axios').default;

module.exports.shortern = async (link) => {
    if (typeof link != 'string'){
        throw new Error(`shortener - link must be string, '${typeof link}' passed : ('${link}')`);
    }

    let surl = await reqHandler.post('https://url-shortener-service.p.rapidapi.com/shorten', {url: link}, {headers : {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': process.env.SHORTLINK_API_KEY,
        'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
    }})

    return surl.data.result_url;
}