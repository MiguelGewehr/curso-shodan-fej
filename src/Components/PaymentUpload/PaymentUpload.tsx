import React, { useState } from 'react';
import './PaymentUpload.css';

const PaymentUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Simulação de upload (teste)
      console.log('Arquivo selecionado:', selectedFile.name);
      console.log('Tipo:', selectedFile.type);
      console.log('Tamanho:', selectedFile.size, 'bytes');
      alert(`Upload simulado para ${selectedFile.name}. Em produção, enviaria para Firebase Storage.`);
      // Aqui seria o código real para Firebase
    } else {
      alert('Selecione um arquivo primeiro.');
    }
  };

  return (
    <div className="payment-upload">
      <h2>Anexar Boleto de Pagamento</h2>
      <p>Selecione o arquivo do boleto (PDF ou imagem) e clique em "Enviar".</p>
      <input
        type="file"
        accept=".pdf,.jpg,.png"
        onChange={handleFileChange}
      />
      {selectedFile && (
        <p>Arquivo selecionado: {selectedFile.name}</p>
      )}
      <button onClick={handleUpload}>Enviar Boleto</button>
    </div>
  );
};

export default PaymentUpload;