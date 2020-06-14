import { Url } from './url.entity';

export const urlProviders = [{ provide: 'UrlRepository', useValue: Url }];
