import { Injectable } from '@nestjs/common'
import { Any, DataSource } from 'typeorm'
import { transaction } from '@wisemen/nestjs-typeorm'
import type { CreateFileLinkDto } from '../dtos/create-file-entity.dto.js'
import type { FileLink } from '../entities/file-link.entity.js'
import { FileLinkRepository } from '../repositories/file-link.repository.js'

@Injectable()
export class FileLinkService {
  constructor (
    private readonly dataSource: DataSource,
    private readonly fileLinkRepository: FileLinkRepository
  ) {}

  async create (
    dto: CreateFileLinkDto,
    entityUuid: string,
    entityType: string,
    entityPart: string
  ): Promise<FileLink> {
    const file = this.fileLinkRepository.create({
      ...dto,
      entityUuid,
      entityType,
      entityPart
    })

    await this.fileLinkRepository.insert(file)

    return file
  }

  async update (
    link: FileLink,
    dto: CreateFileLinkDto
  ): Promise<void> {
    await this.fileLinkRepository.update({
      uuid: link.uuid
    }, dto)
  }

  async sync (
    dtos: CreateFileLinkDto[],
    entityUuid: string,
    entityType: string,
    entityPart: string
  ): Promise<void> {
    const previousFileLinks = await this.fileLinkRepository.find({
      where: {
        entityPart,
        entityUuid,
        entityType
      }
    })

    const removedFileLinks = previousFileLinks.filter((existing) => {
      return !dtos.some(dto => dto.fileUuid === existing.fileUuid)
    })

    const upsertFileLinks = dtos.map((dto) => {
      const existing = previousFileLinks.find((link) => {
        return link.fileUuid === dto.fileUuid
      })

      return {
        ...dto,
        uuid: existing?.uuid
      }
    })

    await transaction(this.dataSource, async () => {
      await this.fileLinkRepository.delete({
        uuid: Any(removedFileLinks.map(link => link.uuid))
      })

      await this.fileLinkRepository.upsert(
        upsertFileLinks,
        ['uuid']
      )
    })
  }
}
