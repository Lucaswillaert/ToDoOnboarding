import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsString } from 'class-validator'
import { IsNullable } from '@wisemen/validators'

export class UpdateTodoCommand {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  title: string

  @ApiProperty({ type: String })
  @IsNullable()
  @IsString()
  description: string

  @ApiProperty({ type: String, nullable: true, format: 'date-time' })
  @IsDateString({ strict: true })
  @IsNullable()
  deadline: string | null
}
