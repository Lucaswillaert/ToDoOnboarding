import type { Readable } from 'stream'
import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  type ListObjectsV2Output,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Upload } from '@aws-sdk/lib-storage'
import type { MimeType } from '../enums/mime-type.enum.js'
import type { File } from '../entities/file.entity.js'

@Injectable()
export class S3Service {
  private readonly s3: S3Client

  constructor (
    private readonly configService: ConfigService
  ) {
    const region: string = this.configService.get('S3_REGION', 'nl-ams')

    this.s3 = new S3Client({
      forcePathStyle: true,
      region,
      endpoint: this.configService.getOrThrow('S3_ENDPOINT'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.getOrThrow('S3_SECRET_KEY')
      }
    })
  }

  public async createTemporaryDownloadUrl (
    name: string,
    key: string,
    mimeType?: MimeType | null,
    expiresInSeconds?: number
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: this.prependEnvKey(key),
      ResponseContentType: mimeType ?? 'application/octet-stream',
      ResponseContentDisposition: `attachment; filename=${name}`
    })

    const expiresIn = expiresInSeconds ?? 1800

    return await getSignedUrl(this.s3, command, { expiresIn })
  }

  public async createTemporaryUploadUrl (
    file: File,
    expiresInSeconds?: number
  ): Promise<string> {
    if (file.mimeType == null) {
      throw new Error('File MIME type is required')
    }

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: this.prependEnvKey(file.uuid),
      ContentType: file.mimeType,
      ACL: 'private'
    })

    const expiresIn = expiresInSeconds ?? 180

    return await getSignedUrl(this.s3, command, { expiresIn })
  }

  public async upload (
    key: string,
    content: Buffer
  ): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: this.prependEnvKey(key),
      Body: content,
      ACL: 'private'
    })

    await this.s3.send(command)
  }

  public async uploadStream (
    key: string,
    stream: Readable
  ): Promise<void> {
    const parallelUploads = new Upload({
      client: this.s3,
      params: {
        Bucket: this.bucketName,
        Key: this.prependEnvKey(key),
        Body: stream,
        ACL: 'private'
      },
      queueSize: 10,
      leavePartsOnError: false
    })

    await parallelUploads.done()
  }

  public async list (
    key: string
  ): Promise<ListObjectsV2Output['Contents']> {
    const command = new ListObjectsV2Command({
      Bucket: this.bucketName,
      Prefix: this.prependEnvKey(key)
    })

    const result = await this.s3.send(command)

    return result.Contents
  }

  public async delete (
    key: string
  ): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: this.prependEnvKey(key)
    })

    await this.s3.send(command)
  }

  private get bucketName (): string {
    return this.configService.getOrThrow('S3_BUCKET')
  }

  private prependEnvKey (
    key: string
  ): string {
    const env: string = this.configService.get('NODE_ENV', 'local')

    return `${env}/${key}`
  }
}
