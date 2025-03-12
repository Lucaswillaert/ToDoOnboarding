import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@wisemen/nestjs-typeorm'
import { Todo } from '../../entities/todo.entity.js'
import { AuthModule } from '../../../auth/auth.module.js'
import { CreateTodoController } from './create-todo.controller.js'
import { CreateTodoUseCase } from './create-todo.use-case.js'

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), AuthModule],
  controllers: [CreateTodoController],
  providers: [CreateTodoUseCase]
})
export class CreateTodoModule {}
