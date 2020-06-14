import { Sequelize } from 'sequelize-typescript';
import { User } from './../users/user.entity';
import { Url } from './../url/url.entity';
import { ConfigService } from './../shared/config/config.service';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            console.log(configService.sequelizeOrmConfig);
            const sequelize = new Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([User, Url]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];
