import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { ContactModel } from './models/contact.model'
import { ContactService } from './contact.service'
import { SubmitContactInput } from './dto/submit-contact.input'

@Resolver(() => ContactModel)
export class ContactResolver {
  constructor(private readonly contactService: ContactService) {}

  @Mutation(() => ContactModel, { description: 'Отправить сообщение из формы обратной связи' })
  submitContact(@Args('input') input: SubmitContactInput): Promise<ContactModel> {
    return this.contactService.submit(input)
  }
}
