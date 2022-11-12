import { base_url } from './url';
import axios from 'axios';

export const fetch = (params: string) => axios(`${base_url}/${params}`);
