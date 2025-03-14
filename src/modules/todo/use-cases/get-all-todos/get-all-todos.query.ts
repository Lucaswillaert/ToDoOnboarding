import { FilterQuery, PaginatedOffsetSearchQuery } from '@wisemen/pagination'
import { ApiProperty } from '@nestjs/swagger'
import { Equals, IsArray, IsDateString, IsOptional, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class TodosFilterQuery extends FilterQuery {
  @ApiProperty({ type: String, required: false, isArray: true })
  @IsOptional()
  @IsArray()
  @IsDateString()
  CreatedAt?: string[]
}

export class GetAllTodosQuery extends PaginatedOffsetSearchQuery {
  @Equals(undefined)
  sort?: never

  @ApiProperty({ type: TodosFilterQuery })
  @IsOptional()
  @Type(() => TodosFilterQuery)
  @ValidateNested()
  filter?: TodosFilterQuery

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  search?: string
}
