import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { ContactModel } from './models/contact.model'
import { SubmitContactInput } from './dto/submit-contact.input'

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async submit(input: SubmitContactInput): Promise<ContactModel> {
    return this.prisma.contact.create({
      data: {
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        message: input.message.trim()
      }
    })
  }
}
