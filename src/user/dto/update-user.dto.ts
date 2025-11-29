import { PartialType } from '@nestjs/swagger';
import { RegisterUserFisicaDto, RegisterUserJuridicaDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(RegisterUserFisicaDto) {}

export class UpdateUserJuridicaDto extends PartialType(RegisterUserJuridicaDto) {}
