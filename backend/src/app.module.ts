import { join } from 'node:path'
import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { AcceptLanguageResolver, I18nModule, QueryResolver, HeaderResolver } from 'nestjs-i18n'
import { PrismaModule } from './prisma/prisma.module'
import { SeedModule } from './seed/seed.module'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { AppResolver } from './app.resolver'
import { ExperienceModule } from './modules/experience/experience.module'
import { SkillModule } from './modules/skill/skill.module'
import { ContactModule } from './modules/contact/contact.module'
import { DemoModule } from './modules/demo/demo.module'
import { RestModule } from './rest/rest.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    I18nModule.forRoot({
      fallbackLanguage: 'ru',
      loaderOptions: {
        path: join(__dirname, 'i18n', 'locales'),
        // На Vercel файловая система read-only — fs.watch недоступен.
        watch: !process.env.VERCEL
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        new HeaderResolver(['x-lang']),
        AcceptLanguageResolver
      ]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // process.cwd() на Vercel read-only — генерируемую схему пишем в /tmp.
      autoSchemaFile: process.env.VERCEL ? '/tmp/schema.gql' : join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      playground: false,
      graphiql: true,
      introspection: true
    }),
    PrismaModule,
    SeedModule,
    ExperienceModule,
    SkillModule,
    ContactModule,
    DemoModule,
    RestModule
  ],
  providers: [
    AppResolver,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ]
})
export class AppModule {}
