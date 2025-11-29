import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('👤 Criando usuário de teste...\n');
  
  const hashedPassword = await bcrypt.hash('123456', 10);
  
  try {
    const testUser = await prisma.user.create({
      data: {
        username: 'teste',
        email: 'teste@gittech.com',
        password: hashedPassword,
      },
    });
    
    console.log('✅ Usuário de teste criado com sucesso!\n');
    console.log('═══════════════════════════════════════');
    console.log('📧 Email: teste@gittech.com');
    console.log('👤 Username: teste');
    console.log('🔑 Senha: 123456');
    console.log(`🆔 ID: ${testUser.id}`);
    console.log('═══════════════════════════════════════\n');
    console.log('💡 Use estas credenciais para fazer login!');
  } catch (error: any) {
    if (error.code === 'P2002') {
      console.log('⚠️  Usuário teste@gittech.com já existe!\n');
      console.log('Use as credenciais:');
      console.log('📧 Email: teste@gittech.com');
      console.log('🔑 Senha: 123456');
    } else {
      throw error;
    }
  }
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
