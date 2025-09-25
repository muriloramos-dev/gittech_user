import { User } from '@prisma/client'
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService){}

  async findByEmail(email: string): Promise<User> {
    const user: User | null = await this.prisma.user.findUnique({
      where: { email }
    });

    if (user != null) {
      return user;
    }
    throw new NotFoundException();
  }
}
