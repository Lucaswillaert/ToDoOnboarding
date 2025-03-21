import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsString } from 'class-validator'
import { IsNullable } from '@wisemen/validators'

export class UpdateTodoCommand {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty({ type: String, nullable: true })
  @IsNullable()
  @IsString()
  description: string | null

  @ApiProperty({ type: String, nullable: true, format: 'date-time' })
  @IsDateString({ strict: true })
  @IsNullable()
  deadline: string | null
}
