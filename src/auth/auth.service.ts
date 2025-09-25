import { User } from '@prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { TokenAuth } from './dto/token-auth';
import { UserEntity, UserFisicaEntity, UserJuridicaEntity } from '../user/entities/user';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private tokenService: TokenService, private prisma: PrismaService) { }

  async loginLocally(email: string, password: string): Promise<TokenAuth> {
    const user: User = await this.userService.findByEmail(email);
    if (await bcrypt.compare(password, user!.password)) {
      const accessToken: string = await this.tokenService.generateAccessToken(user.id, user.username, user.email);
      const refreshToken: string = await this.tokenService.generateRefreshToken(user.id, user.username, user.email);
      return new TokenAuth(accessToken, refreshToken);
    }
    throw new BadRequestException();
  }

  async registerUserPF(userEntity: UserFisicaEntity): Promise<void> {
    const salt = await bcrypt.genSalt();
    await this.prisma.user.create({
      data: {
        email: userEntity.email,
        password: await bcrypt.hash(userEntity.password, salt),
        username: userEntity.username,
        address: {
          create: {
            addressBurgh: userEntity.address.addressBurgh,
            addressCep: userEntity.address.addressCep,
            addressCity: userEntity.address.addressCity,
            addressComplement: userEntity.address.addressComplement,
            addressName: userEntity.address.addressName,
            addressNumber: userEntity.address.addressNumber,
            addressState: userEntity.address.addressState
          }
        },
        phone: {
          create: {
            countryCode: userEntity.phone.countryCode,
            phoneDDD: userEntity.phone.phoneDDD,
            phoneNumber: userEntity.phone.phoneNumber
          }
        },
        pessoaFisica: {
          create: {
            cpf: userEntity.pessoaFisica.cpf,
            dateOfBirth: userEntity.pessoaFisica.dateOfBirth,
            gender: userEntity.pessoaFisica.gender
          }
        }
      }
    });
  }

  async registerUserPJ(userEntity: UserJuridicaEntity): Promise<void> {
    const salt = await bcrypt.genSalt();
    await this.prisma.user.create({
      data: {
        email: userEntity.email,
        password: await bcrypt.hash(userEntity.password, salt),
        username: userEntity.username,
        address: {
          create: {
            addressBurgh: userEntity.address.addressBurgh,
            addressCep: userEntity.address.addressCep,
            addressCity: userEntity.address.addressCity,
            addressComplement: userEntity.address.addressComplement,
            addressName: userEntity.address.addressName,
            addressNumber: userEntity.address.addressNumber,
            addressState: userEntity.address.addressState
          }
        },
        phone: {
          create: {
            countryCode: userEntity.phone.countryCode,
            phoneDDD: userEntity.phone.phoneDDD,
            phoneNumber: userEntity.phone.phoneNumber
          }
        },
        pessoaJuridica: {
          create: {
            cnpj: userEntity.pessoaJuridica.cnpj,
            corporateReason: userEntity.pessoaJuridica.corporateReason
          }
        }
      }
    });
  }
}
