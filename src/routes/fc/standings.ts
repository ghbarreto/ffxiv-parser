import { format_gc } from '../../utils/format_gc';
import { Parser } from '../parser';
import type { GrandCompany } from '../../types/gc_types';

module.exports = app => {
    app.get('/api/free_company/standings', async (req, res) => {
        const lodestone = new Parser();
        const endpoint = 'lodestone/ranking/fc/monthly/';
        const selector = '.ranking-character__freecompany';

        const base = await lodestone.parse(endpoint, selector);

        let free_companies = [];

        base.forEach(e => {
            const table: HTMLCollection = e.getElementsByTagName('tr');

            Object.values(table).forEach(row => {
                const ranking = row.querySelector('.ranking-character__number').textContent.trim();
                const name = row.querySelector('.ranking-character__info-freecompany > h4').textContent;
                const fc_link = row.getAttribute('data-href');
                const fc_gc = row
                    .querySelector('.ranking-character__gc-freecompany > img')
                    .getAttribute('alt') as GrandCompany;
                const home_world: any = row.querySelector('.ranking-character__info-freecompany > p').innerHTML;
                const company_credits = Number(row.querySelector('.ranking-character__value').textContent.trim());
                const increasing_rank = row.querySelector('.ranking-character__up') ? true : false;
                const fc_crest = row.querySelector('.ranking-character__crest__bg').getElementsByTagName('img');

                free_companies.push({
                    ranking,
                    name,
                    fc_link,
                    fc_gc: format_gc(fc_gc),
                    home_world: home_world.replace(/(.*)\<\/i>/, ''),
                    company_credits,
                    increasing_rank,
                    fc_crest: {
                        0: fc_crest[0] ? fc_crest[0].getAttribute('src') : null,
                        1: fc_crest[1] ? fc_crest[1].getAttribute('src') : null,
                        2: fc_crest[2] ? fc_crest[2].getAttribute('src') : null,
                    },
                });
            });
        });

        res.status(200).send(free_companies);
    });
};
