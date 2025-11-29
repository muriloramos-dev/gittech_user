import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding user database...');

  // Hash password
  const hashedPassword = await bcrypt.hash('senha123', 10);

  // User 1 - Pessoa Física
  const user1 = await prisma.user.create({
    data: {
      username: 'joao_silva',
      email: 'joao.silva@example.com',
      password: hashedPassword,
      pessoaFisica: {
        create: {
          cpf: '123.456.789-00',
          gender: 'M',
          dateOfBirth: new Date('1990-05-15'),
        },
      },
      phone: {
        create: {
          phoneDDD: '11',
          countryCode: '+55',
          phoneNumber: '987654321',
        },
      },
      address: {
        create: {
          addressName: 'Rua das Flores',
          addressCep: '01234-567',
          addressNumber: '123',
          addressComplement: 'Apto 45',
          addressBurgh: 'Jardim Paulista',
          addressState: 'SP',
          addressCity: 'São Paulo',
        },
      },
      federatedIdentity: {
        create: {
          sub: 'google-oauth-123456',
          providerType: 'GOOGLE',
        },
      },
    },
  });

  // User 2 - Pessoa Física
  const user2 = await prisma.user.create({
    data: {
      username: 'maria_santos',
      email: 'maria.santos@example.com',
      password: hashedPassword,
      pessoaFisica: {
        create: {
          cpf: '987.654.321-00',
          gender: 'F',
          dateOfBirth: new Date('1985-08-20'),
        },
      },
      phone: {
        create: {
          phoneDDD: '21',
          countryCode: '+55',
          phoneNumber: '912345678',
        },
      },
      address: {
        create: {
          addressName: 'Av. Atlântica',
          addressCep: '22021-001',
          addressNumber: '500',
          addressBurgh: 'Copacabana',
          addressState: 'RJ',
          addressCity: 'Rio de Janeiro',
        },
      },
      federatedIdentity: {
        create: {
          sub: 'local-user-maria',
          providerType: 'LOCAL',
        },
      },
    },
  });

  // User 3 - Pessoa Jurídica
  const user3 = await prisma.user.create({
    data: {
      username: 'tech_solutions',
      email: 'contato@techsolutions.com.br',
      password: hashedPassword,
      pessoaJuridica: {
        create: {
          cnpj: '12.345.678/0001-90',
          corporateReason: 'Tech Solutions Ltda',
        },
      },
      phone: {
        create: {
          phoneDDD: '11',
          countryCode: '+55',
          phoneNumber: '33334444',
        },
      },
      address: {
        create: {
          addressName: 'Av. Paulista',
          addressCep: '01310-100',
          addressNumber: '1000',
          addressComplement: 'Sala 1201',
          addressBurgh: 'Bela Vista',
          addressState: 'SP',
          addressCity: 'São Paulo',
        },
      },
      federatedIdentity: {
        create: {
          sub: 'local-company-tech',
          providerType: 'LOCAL',
        },
      },
    },
  });

  console.log('✅ Created users:', { user1: user1.id, user2: user2.id, user3: user3.id });
  console.log('📧 Login credentials: email / senha123');
  console.log(`   - ${user1.email}`);
  console.log(`   - ${user2.email}`);
  console.log(`   - ${user3.email}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
