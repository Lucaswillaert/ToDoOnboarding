import { Injectable, type OnModuleDestroy, type OnModuleInit } from '@nestjs/common'
import { type NatsConnection, connect, type KV, credsAuthenticator, type Authenticator, type Payload, type Subscription, type SubscriptionOptions } from 'nats'
import { ConfigService } from '@nestjs/config'

interface SubscribeOptions {
  loadBalance: boolean
}

@Injectable()
export class NatsClient implements OnModuleInit, OnModuleDestroy {
  public client: NatsConnection
  public cache: KV
  private readonly queueName: string

  constructor (
    private readonly configService: ConfigService
  ) {
    this.queueName = 'nest-template-' + this.configService.get<string>('NODE_ENV')
  }

  async onModuleInit (): Promise<void> {
    const host = this.configService.get<string>('NATS_HOST')
    const port = this.configService.get<string>('NATS_PORT')

    if (host == null || port == null) {
      throw new Error('NATS config variables are not set')
    }

    this.client = await connect({
      servers: `nats://${host}:${port}`,
      authenticator: this.getAuthenticator(),
      timeout: 3000
    })

    this.cache = await this.client.jetstream().views.kv('cache')
  }

  async onModuleDestroy (): Promise<void> {
    if (this.client !== undefined) {
      await this.client.drain()
    }
  }

  private getAuthenticator (): Authenticator | undefined {
    const nkey = this.configService.get<string>('NATS_NKEY')

    if (nkey == null) {
      return undefined
    } else {
      return credsAuthenticator(new TextEncoder().encode(
        Buffer.from(nkey, 'base64').toString()
      ))
    }
  }

  subscribe (subject: string, options?: SubscribeOptions): Subscription {
    const opts: SubscriptionOptions = {}

    if (options?.loadBalance != null) {
      opts.queue = this.queueName
    }

    return this.client.subscribe(subject, opts)
  }

  publish (subject: string, message: Payload | undefined): void {
    this.client.publish(subject, message)
  }

  async getCachedValue (key: string): Promise<string | null> {
    const result = await this.cache.get(key)

    if (result != null && result.operation === 'PUT') {
      String(result.value)
    }

    return null
  }

  async putCachedValue (key: string, value: string): Promise<void> {
    await this.cache.put(key, value)
  }

  async deleteCachedValue (key: string): Promise<void> {
    await this.cache.delete(key)
  }
}
