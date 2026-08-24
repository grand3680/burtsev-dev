import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

/**
 * Логирует каждый GraphQL-резолвер и его длительность.
 * Этот «интерсептор» — та самая ступень, которую визуализирует секция data-fetching на фронте.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('GraphQL')

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const gqlContext = GqlExecutionContext.create(context)
    const info = gqlContext.getInfo<{ parentType: { name: string }; fieldName: string }>()
    const label = `${info.parentType.name}.${info.fieldName}`
    const startedAt = Date.now()

    return next.handle().pipe(
      tap(() => {
        this.logger.log(`${label} — ${String(Date.now() - startedAt)}ms`)
      })
    )
  }
}
