import { IsDateString, IsNotEmpty, IsString } from 'class-validator'
import { IsNullable } from '@wisemen/validators'

export class CreateTodoCommand {
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNullable()
  description: string | null

  @IsDateString({ strict: true })
  @IsNullable()
  deadline: Date | null
}
