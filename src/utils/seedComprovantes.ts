/**
 * Script para popular a collection "comprovantes" com dados de exemplo
 * Execute isto uma vez para testar a página de admin de pagamentos
 * 
 * Use no console do browser:
 * import { seedComprovantes } from './seedComprovantes'
 * await seedComprovantes()
 */

import { db } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const seedComprovantes = async () => {
  try {
    const sampleReceipts = [
      {
        userId: 'user-1',
        fileName: 'boleto-fevereiro.pdf',
        downloadUrl: 'https://via.placeholder.com/400x600?text=PDF+Boleto',
        fileType: 'application/pdf',
        status: 'pending',
        uploadedAt: serverTimestamp(),
      },
      {
        userId: 'user-1',
        fileName: 'comprovante-marco.jpg',
        downloadUrl: 'https://via.placeholder.com/400x600?text=Comprovante+Março',
        fileType: 'image/jpeg',
        status: 'approved',
        uploadedAt: serverTimestamp(),
      },
      {
        userId: 'user-2',
        fileName: 'boleto-janeiro.png',
        downloadUrl: 'https://via.placeholder.com/400x600?text=Boleto+Janeiro',
        fileType: 'image/png',
        status: 'pending',
        uploadedAt: serverTimestamp(),
      },
      {
        userId: 'user-3',
        fileName: 'comprovante-fevereiro.pdf',
        downloadUrl: 'https://via.placeholder.com/400x600?text=PDF+Comprovante',
        fileType: 'application/pdf',
        status: 'rejected',
        uploadedAt: serverTimestamp(),
      },
    ];

    for (const receipt of sampleReceipts) {
      await addDoc(collection(db, 'comprovantes'), receipt);
    }

    console.log('✅ Dados de exemplo adicionados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao adicionar dados de exemplo:', error);
  }
};
