import { config as configDev } from './config/config.development';
import { config as configProd } from './config/config.production';
import { config as configTest } from './config/config.testing';
let config;

switch(process.env.NODE_ENV ) { 
    case 'production': { 
        config = configProd;
       break; 
    } 
    case 'test': { 
       config = configTest
       break; 
    } 
    default: { 
       config = configDev;
       break; 
    } 
 } 
 

export default config;
