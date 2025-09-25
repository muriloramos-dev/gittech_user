import { ApiProperty } from '@nestjs/swagger';

export class AuthLocally {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
