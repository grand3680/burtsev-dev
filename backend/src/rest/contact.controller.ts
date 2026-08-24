import { Body, Controller, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ContactService } from '@/modules/contact/contact.service'
import { ContactDto, SubmitContactBody } from './dto/contact.dto'

@ApiTags('contact')
@Controller('api')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('contact')
  @ApiOperation({ summary: 'Отправить сообщение из формы обратной связи' })
  @ApiCreatedResponse({ type: ContactDto })
  submit(@Body() body: SubmitContactBody): Promise<ContactDto> {
    return this.contactService.submit(body)
  }
}
