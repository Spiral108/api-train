import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    UpdateDateColumn,
    CreateDateColumn,
  } from 'typeorm';
  import { IsEmail, IsString } from 'class-validator';
  import {MimeType} from '../../constant/constant';
  
  export type Role = 'user' | 'staff' | 'admin';
  
  @Entity()
  export class Files {
    @PrimaryGeneratedColumn()
    id?: number;
  
    @Column({
        type: "varchar",
        length: 128
    })
    @IsString()
    originalName?: string;
  
    @Column({
        type: "set",
        enum: MimeType,
        default: [MimeType.JPEG, MimeType.PNG]
    })
    @IsString()
    mimeType?: string;
  
    @CreateDateColumn()
    createdDate: Date;
  
    @UpdateDateColumn()
    updatedDate?: Date;
  
    public constructor(data?: Files) {
      if (data) {
        this.originalName = data.originalName;
        this.mimeType = data.mimeType;
      }
    }
  
  }
  