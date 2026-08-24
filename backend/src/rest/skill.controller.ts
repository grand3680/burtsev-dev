import { Controller, Get, Query } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { SkillService } from '@/modules/skill/skill.service'
import { SkillDto } from './dto/skill.dto'
import { parseLang } from './rest-lang'

@ApiTags('skill')
@Controller('api')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get('skills')
  @ApiOperation({ summary: 'Категории навыков' })
  @ApiQuery({ name: 'lang', enum: ['ru', 'en'], required: false })
  @ApiOkResponse({ type: [SkillDto] })
  skills(@Query('lang') lang?: string): Promise<SkillDto[]> {
    return this.skillService.findAll(parseLang(lang))
  }
}
