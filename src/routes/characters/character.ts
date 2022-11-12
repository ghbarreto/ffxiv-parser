import { fetch } from '../../utils/fetch';
import { JSDOM } from 'jsdom';
import { base_url } from '../../utils/url';

module.exports = app => {
    app.get('/api/character/:name', async (req, res) => {
        try {
            const { data } = await fetch(`/lodestone/character/?q=${req.body.characterName}`);
            const dom = new JSDOM(data);
            const { document } = dom.window;

            const base = document.querySelectorAll('.entry');

            const characters = [];

            const response = {
                total_results: Number(document.querySelector('.parts__total').textContent.replace('Total', '').trim()),
                number_of_pages: Number(document.querySelector('.btn__pager__current').textContent.match(/\d+$/)[0]),
                characters,
            };

            base.forEach(e => {
                const id = e.querySelector('.entry__link');
                const img = e.querySelector('.entry__chara__face');
                const name = e.querySelector('.entry__name');
                const world = e.querySelector('.entry__world');
                const fc = e.querySelector('.entry__freecompany__link');

                if (img && name) {
                    characters.push({
                        id: id.getAttribute('href').replace('/lodestone/character', '').replace(/\//g, ''),
                        img: img.getElementsByTagName('img')[0].src,
                        name: name.textContent,
                        world: world.textContent,
                        fc: {
                            link: fc ? `${base_url}${fc.getAttribute('href')}` : null,
                            name: fc ? fc.textContent : null,
                        },
                    });
                }
            });

            res.status(200).send(response);
        } catch (err) {
            console.log(err);
        }
    });
};
