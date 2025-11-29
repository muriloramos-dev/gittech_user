import { ApiProperty } from "@nestjs/swagger";

export class PhoneEntity {
    @ApiProperty()
    phoneDDD: string;
    @ApiProperty()
    countryCode: string;
    @ApiProperty()
    phoneNumber: string;
}



// model Phone {
//   id String @id @default(uuid())
//   phoneDDD String
//   countryCode String
//   phoneNumber String
//   user User @relation(fields: [userId], references: [id])
//   userId String @unique
// }