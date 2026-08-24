import { Controller, Get, Query } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { ExperienceService } from '@/modules/experience/experience.service'
import { ExperienceDto } from './dto/experience.dto'
import { parseLang } from './rest-lang'

@ApiTags('experience')
@Controller('api')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get('experiences')
  @ApiOperation({ summary: 'Опыт работы для таймлайна' })
  @ApiQuery({ name: 'lang', enum: ['ru', 'en'], required: false })
  @ApiOkResponse({ type: [ExperienceDto] })
  experiences(@Query('lang') lang?: string): Promise<ExperienceDto[]> {
    return this.experienceService.findJobs(parseLang(lang))
  }

  @Get('projects')
  @ApiOperation({ summary: 'Проекты' })
  @ApiQuery({ name: 'lang', enum: ['ru', 'en'], required: false })
  @ApiOkResponse({ type: [ExperienceDto] })
  projects(@Query('lang') lang?: string): Promise<ExperienceDto[]> {
    return this.experienceService.findProjects(parseLang(lang))
  }
}
