import { ApiProperty } from "@nestjs/swagger";

export class AddressEntity {
    @ApiProperty()
    addressName: string;
    @ApiProperty()
    addressCep: string;
    @ApiProperty()
    addressNumber: string;
    @ApiProperty()
    addressComplement?: string;
    @ApiProperty()
    addressBurgh: string;
    @ApiProperty()
    addressState: string;
    @ApiProperty()
    addressCity: string;
}

// model Address {
//   id String @id @default(uuid())
//   addressName String
//   addressCep String
//   addressNumber String
//   addressComplement String
//   addressBurgh String
//   addressState String
//   addressCity String
//   user User @relation(fields: [userId], references: [id])
//   userId String @unique
// }