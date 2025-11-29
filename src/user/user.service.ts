import { User } from '@prisma/client'
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService){}

  async findAll(page: number = 1, limit: number = 10): Promise<User[]> {
    const skip = (page - 1) * limit;
    
    return await this.prisma.user.findMany({
      skip,
      take: limit,
      include: {
        pessoaFisica: true,
        pessoaJuridica: true,
        phone: true,
        address: true,
      },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        pessoaFisica: true,
        pessoaJuridica: true,
        federatedIdentity: true,
        phone: true,
        address: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user: User | null = await this.prisma.user.findUnique({
      where: { email }
    });

    if (user != null) {
      return user;
    }
    throw new NotFoundException();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // First check if user exists
    await this.findOne(id);

    const { pessoaFisica, phone, address, ...userData } = updateUserDto;

    return await this.prisma.user.update({
      where: { id },
      data: {
        ...userData,
        ...(pessoaFisica && {
          pessoaFisica: {
            update: pessoaFisica,
          },
        }),
        ...(phone && {
          phone: {
            update: phone,
          },
        }),
        ...(address && {
          address: {
            update: address,
          },
        }),
      },
      include: {
        pessoaFisica: true,
        pessoaJuridica: true,
        phone: true,
        address: true,
      },
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // First check if user exists
    await this.findOne(id);

    await this.prisma.user.delete({
      where: { id },
    });

    return { message: `User with ID ${id} successfully deleted` };
  }
}
