import React, { useState } from 'react';
import './StudentPayment.css';
import { auth, storage, db } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const StudentPayment: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setMessage('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Selecione um arquivo antes de enviar.');
      return;
    }

    if (!auth.currentUser) {
      setMessage('Usuário não autenticado.');
      return;
    }

    setUploading(true);
    try {
      const userId = auth.currentUser.uid;
      const timestamp = Date.now();
      const fileName = `${timestamp}_${selectedFile.name}`;
      const filePath = `comprovantes/${userId}/${fileName}`;

      // Upload do arquivo para Cloud Storage
      const storageRef = ref(storage, filePath);
      await uploadBytes(storageRef, selectedFile);

      // Obter a URL de download
      const downloadURL = await getDownloadURL(storageRef);

      // Salvar metadados no Firestore
      await addDoc(collection(db, 'comprovantes'), {
        userId,
        fileName: selectedFile.name,
        filePath,
        downloadUrl: downloadURL,
        fileType: selectedFile.type,
        uploadedAt: serverTimestamp(),
        status: 'pending', // pending, approved, rejected
      });

      setMessage(`Boleto "${selectedFile.name}" enviado com sucesso! Aguarde aprovação do administrador.`);
      setSelectedFile(null);
    } catch (error: any) {
      console.error(error);
      setMessage(`Erro ao enviar boleto: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="student-payment">
      <h1>Anexar Comprovante de Pagamento</h1>
      <div className="payment-form">
        <p>Selecione o arquivo do seu boleto ou comprovante de pagamento (PDF, JPG ou PNG).</p>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="file-input"
          disabled={uploading}
        />
        {selectedFile && (
          <p className="file-info">Arquivo selecionado: <strong>{selectedFile.name}</strong></p>
        )}
        <button onClick={handleUpload} className="upload-button" disabled={uploading}>
          {uploading ? 'Enviando...' : 'Enviar Boleto'}
        </button>
        {message && (
          <p className={`message ${message.includes('sucesso') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentPayment;
