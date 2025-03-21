import { TypeOrmModule } from '@wisemen/nestjs-typeorm'
import { Module } from '@nestjs/common'
import { Todo } from '../../entities/todo.entity.js'
import { GetTodoController } from './get-todo.controller.js'
import { GetTodoUseCase } from './get-todo.use-case.js'

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [GetTodoController],
  providers: [GetTodoUseCase]
})
export class GetTodoModule {}
