import { ApiProperty } from "@nestjs/swagger";

export class PessoaFisicaEntity {
    @ApiProperty()
    cpf: string;
    @ApiProperty()
    dateOfBirth: string;
    @ApiProperty()
    gender: string;
}