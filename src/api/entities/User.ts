import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { IsEmail, IsString } from 'class-validator';

export type Role = 'user' | 'staff' | 'admin';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @IsString()
  firstName?: string;

  @Column()
  @IsString()
  lastName?: string;

  @Column()
  @Index({ unique: true })
  @IsEmail(
    {},
    {
      message: 'Invalid email address',
    }
  )
  email?: string;

  @Column()
  @IsString()
  password?: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate?: Date;

  @Column()
  role?: Role = 'user';

  public constructor(data?: Users) {
    if (data) {
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.password = data.password;
      this.role = data.role || this.role;
    }
  }

  public hasAccessTo?(role: Role): boolean {
    const roles = ['user', 'staff', 'admin'];
    return roles.indexOf(this.role) >= roles.indexOf(role);
  }
}
