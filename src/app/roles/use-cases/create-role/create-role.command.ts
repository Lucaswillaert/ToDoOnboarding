import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Matches, IsString } from 'class-validator'

export class CreateRoleCommand {
  @ApiProperty({ type: String, description: 'The name of the role' })
  @IsNotEmpty()
  @Matches(/^[a-zA-Z-]+$/)
  @IsString()
  name: string
}
