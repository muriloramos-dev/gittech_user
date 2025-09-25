import { ApiProperty } from "@nestjs/swagger";
import { AddressEntity } from "./address";
import { PessoaFisicaEntity } from "./pessoa-fisica";
import { PessoaJuridicaEntity } from "./pessoa-juridica";
import { PhoneEntity } from "./phone";

export class UserFisicaEntity {
    @ApiProperty()
    username: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    pessoaFisica: PessoaFisicaEntity;
    @ApiProperty()
    phone: PhoneEntity;
    @ApiProperty()
    address: AddressEntity;
}

export class UserJuridicaEntity {
    @ApiProperty()
    username: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    pessoaJuridica: PessoaJuridicaEntity;
    @ApiProperty()
    phone: PhoneEntity;
    @ApiProperty()
    address: AddressEntity;
}

export type UserEntity = UserFisicaEntity | UserJuridicaEntity;

// model User {
//   id String @id @default(uuid())
//   username String
//   email String @unique
//   password String
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   pessoaFisica PessoaFisica?
//   pessoaJuridica PessoaJuridica?
//   federatedIdentity FederatedIdentity?
//   phone Phone?
//   address Address?
// }