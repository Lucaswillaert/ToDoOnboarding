import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@wisemen/nestjs-typeorm'
import { Todo } from '../../entities/todo.entity.js'
import { GetAllTodosController } from './get-all-todos.controller.js'
import { GetAllTodosUseCase } from './get-all-todos.use-case.js'

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [GetAllTodosController],
  providers: [GetAllTodosUseCase]
})
export class GetAllTodosModule {}
