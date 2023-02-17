const https = require('https');

exports.getAllAnime = (_, res) => {
    https.get('https://kitsu.io/api/edge/anime?page[limit]=16&page[offset]=0', r => {
        let data = '';
        r.on('data', chunk => data += chunk);
        r.on('close', () => res.status(200).send(JSON.parse(data)));
    });    
};

