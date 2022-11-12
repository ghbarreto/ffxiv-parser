import { fetch } from '../utils/fetch';
import { JSDOM } from 'jsdom';

export class Parser {
    async parse(endpoint, selector) {
        try {
            const { data } = await fetch(endpoint);

            const dom = new JSDOM(data);
            const { document } = dom.window;

            return document.querySelectorAll(selector);
        } catch (err) {
            throw new Error(err);
        }
    }
}
