import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn, Relation,
  UpdateDateColumn
} from 'typeorm'
import { User } from '../../../app/users/entities/user.entity.js'

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date | null

  @Column({ type: 'varchar' })
  title: string

  @Column({ type: 'varchar', nullable: true })
  description: string | null

  @Column ({ type: 'timestamptz', nullable: true })
  deadline: Date | null

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean

  @Column({ type: 'uuid' })
  userUuid: string

  @ManyToOne(() => User, user => user.todos)
  @JoinColumn({ name: 'user_uuid' })
  user?: Relation<User>
}
