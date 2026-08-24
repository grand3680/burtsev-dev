import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger'

class HealthDto {
  @ApiProperty({ example: 'ok' })
  status!: string

  @ApiProperty({ type: String, format: 'date-time' })
  time!: string
}

@ApiTags('health')
@Controller('api')
export class HealthController {
  @Get('health')
  @ApiOperation({ summary: 'Health-check' })
  @ApiOkResponse({ type: HealthDto })
  health(): HealthDto {
    return { status: 'ok', time: new Date().toISOString() }
  }
}
