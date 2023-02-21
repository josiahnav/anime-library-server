const https = require('https');

exports.getAllAnime = (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    https.get(`https://kitsu.io/api/edge/anime?page[limit]=${limit}&page[offset]=${offset * limit}`, r => {
        let data = '';
        let payload;
        r.on('data', chunk => data += chunk);
        r.on('close', () => {
            payload = JSON.parse(data);
            payload = payload.data.map(d => {
                return { id: +d.id, title: chooseTitle(d), posterImageSrc: d.attributes.posterImage.small };
            });
            res.status(200).send({ animeLibrary: payload });
        });
    });
};

exports.getAnimeDetails = (req, res) => {
    https.get(`https://kitsu.io/api/edge/anime/${req.params.id}`, r => {
        let data = '';
        let payload;
        r.on('data', chunk => data += chunk);
        r.on('close', () => {
            payload = JSON.parse(data);
            console.log(payload.data.attributes.coverImage.large);
            payload = {
                id: +payload.data.id,
                title: chooseTitle(payload.data),
                averageRating: +payload.data.attributes.averageRating,
                description: payload.data.attributes.description,
                startDate: payload.data.attributes.startDate,
                endDate: payload.data.attributes.endDate
            };
            // console.log(payload);
            res.status(200).send({ anime: payload });
        });
    })
}

chooseTitle = (anime) => {
    return !!anime.attributes.titles.en ? anime.attributes.titles.en : anime.attributes.titles.en_jp;
}

