import { ApiProperty } from "@nestjs/swagger";

export class PessoaJuridicaEntity {
    @ApiProperty()
    cnpj: string;
    @ApiProperty()
    corporateReason: string;
}