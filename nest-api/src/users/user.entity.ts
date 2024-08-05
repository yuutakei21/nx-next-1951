import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';

class UserEntity {
  @ApiProperty({ type: () => Number, required: true })
  @IsNumber()
  public id: number;

  @ApiProperty({ type: () => String, required: true })
  @IsString()
  public sub: string;

  @ApiProperty({ type: () => String, required: true })
  @IsEmail()
  public email: string;

  @ApiProperty({ type: () => String, required: true })
  @IsString()
  public firstName: string;

  @ApiProperty({ type: () => String, required: true })
  @IsString()
  public lastName: string;

  @ApiProperty({ type: () => String, required: false })
  @Exclude()
  public password?: string;

  @ApiProperty({ type: () => String, required: false })
  @Exclude()
  public currentHashedRefreshToken?: string;
}

export default UserEntity;
