import { GrandCompany } from '../types/gc_types';

export const format_gc = (gc: GrandCompany) => {
    if (gc === 'Immortal Flames') {
        return 1;
    } else if (gc === 'Order of the Twin Adder') {
        return 2;
    } else if (gc === 'Maelstrom') {
        return 3;
    }
};
