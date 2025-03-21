import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@wisemen/nestjs-typeorm'
import { Todo } from '../../entities/todo.entity.js'
import { UpdateTodoController } from './update-todo.controller.js'
import { UpdateTodoUseCase } from './update-todo.use-case.js'

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [UpdateTodoController],
  providers: [UpdateTodoUseCase]
})
export class UpdateTodoModule {}
