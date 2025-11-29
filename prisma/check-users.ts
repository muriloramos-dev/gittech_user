import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Verificando usuários existentes...\n');

  const users = await prisma.user.findMany();
  
  if (users.length > 0) {
    console.log(`✅ Encontrados ${users.length} usuário(s):\n`);
    users.forEach((user, index) => {
      console.log(`${index + 1}. Email: ${user.email}`);
      console.log(`   Username: ${user.username}`);
      console.log(`   ID: ${user.id}\n`);
    });
  } else {
    console.log('❌ Nenhum usuário encontrado. Criando usuário de teste...\n');
    
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    const testUser = await prisma.user.create({
      data: {
        username: 'teste',
        email: 'teste@gittech.com',
        password: hashedPassword,
      },
    });
    
    console.log('✅ Usuário de teste criado com sucesso!\n');
    console.log('📧 Email: teste@gittech.com');
    console.log('👤 Username: teste');
    console.log('🔑 Senha: 123456');
    console.log(`🆔 ID: ${testUser.id}\n`);
  }
  
  console.log('📝 Use estas credenciais para fazer login no sistema.');
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
