import { ApiProperty } from '@nestjs/swagger';
import { PessoaFisicaEntity } from '../entities/pessoa-fisica';
import { PhoneEntity } from '../entities/phone';
import { AddressEntity } from '../entities/address';
import { PessoaJuridicaEntity } from '../entities/pessoa-juridica';

export class RegisterUserFisicaDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty({ type: PessoaFisicaEntity })
    pessoaFisica: PessoaFisicaEntity;

    @ApiProperty({ type: PhoneEntity })
    phone: PhoneEntity;

    @ApiProperty({ type: AddressEntity })
    address: AddressEntity;
}

export class RegisterUserJuridicaDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty({ type: PessoaJuridicaEntity })
    pessoaJuridica: PessoaJuridicaEntity;

    @ApiProperty({ type: PhoneEntity })
    phone: PhoneEntity;

    @ApiProperty({ type: AddressEntity })
    address: AddressEntity;
}
