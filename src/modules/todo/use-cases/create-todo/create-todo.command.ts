import { IsDateString, IsNotEmpty, IsString } from 'class-validator'
import { IsNullable } from '@wisemen/validators'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTodoCommand {
  @ApiProperty()
  @IsNotEmpty()
  title: string

  @ApiProperty({ type: String, nullable: true })
  @IsString()
  @IsNullable()
  description: string | null

  @ApiProperty({ type: String, nullable: true, format: 'date-time' })
  @IsDateString({ strict: true })
  @IsNullable()
  deadline: Date | null
}
