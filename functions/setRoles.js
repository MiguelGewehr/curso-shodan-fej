const admin = require('firebase-admin');

// IMPORTANTE: Baixe a chave de serviço do Firebase Console (Project Settings > Service Accounts > Generate new private key)
// e coloque o arquivo JSON em functions/serviceAccountKey.json
// Em seguida, descomente a linha abaixo e substitua pelo caminho correto se necessário.
admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json')),
  // projectId: 'your-project-id' // Opcional, se não estiver no JSON
});

const auth = admin.auth();

// Função para definir papel
async function setUserRole(email, role) {
  try {
    console.log(`Tentando obter UID para ${email}...`);
    // Obter UID pelo email
    const userRecord = await auth.getUserByEmail(email);
    const uid = userRecord.uid;
    console.log(`UID encontrado: ${uid} para ${email}`);

    // Definir claims
    const claims = {};
    claims[role] = true;
    console.log(`Definindo claims: ${JSON.stringify(claims)} para UID ${uid}`);

    await auth.setCustomUserClaims(uid, claims);
    console.log(`Papel ${role} definido com sucesso para ${email} (UID: ${uid})`);
  } catch (error) {
    console.error(`Erro ao definir papel para ${email}:`, error.message);
  }
}

// Executar para os usuários (sequencialmente)
async function run() {
  await setUserRole('adm@teste.com', 'admin');
  await setUserRole('aluno@teste.com', 'student');
  console.log('Script concluído.');
}

run();