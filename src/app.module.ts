import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
  ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema // Validar el schema de las ENV
    }),
    // Servir archivos estáticos
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public')
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    PokemonModule,
    CommonModule,
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
