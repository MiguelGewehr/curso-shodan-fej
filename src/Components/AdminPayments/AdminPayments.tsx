import React, { useState, useEffect } from 'react';
import './AdminPayments.css';
import { db } from '../../firebaseConfig';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';

type PaymentRecord = {
  month: string;
  dueDate: string;
  paid: boolean;
  paidDate?: string;
  viewed?: boolean;
  rejected?: boolean;
  receiptUrl?: string | null;
};

type Student = {
  id: string;
  name: string;
  payments: PaymentRecord[];
};

type Comprovante = {
  id: string;
  userId: string;
  fileName: string;
  downloadUrl: string;
  uploadedAt: any;
  status: 'pending' | 'approved' | 'rejected';
  fileType: string;
};

const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

// Dados mockados de alunos e pagamentos
const makeSample = (): Student[] => [
  {
    id: '1',
    name: 'Carlos Silva',
    payments: months.map((m, i) => {
      const due = new Date();
      due.setMonth(i);
      due.setDate(5);
      return {
        month: m,
        dueDate: due.toISOString(),
        paid: i <= 3,
        paidDate: i <= 3 ? new Date(2025, i, 3).toISOString() : undefined,
        viewed: false,
        rejected: false,
        receiptUrl: i <= 3 ? null : null,
      } as PaymentRecord;
    }),
  },
  {
    id: '2',
    name: 'Mariana Oliveira',
    payments: months.map((m, i) => {
      const due = new Date();
      due.setMonth(i);
      due.setDate(5);
      return {
        month: m,
        dueDate: due.toISOString(),
        paid: i === 1 || i === 2,
        paidDate: i === 1 || i === 2 ? new Date(2025, i, 2).toISOString() : undefined,
        viewed: false,
        rejected: false,
        receiptUrl: null,
      } as PaymentRecord;
    }),
  },
  {
    id: '3',
    name: 'João Pereira',
    payments: months.map((m, i) => {
      const due = new Date();
      due.setMonth(i);
      due.setDate(5);
      return {
        month: m,
        dueDate: due.toISOString(),
        paid: false,
        viewed: false,
        rejected: false,
        receiptUrl: null,
      } as PaymentRecord;
    }),
  },
];

const getStatus = (p: PaymentRecord) => {
  const today = new Date();
  const due = new Date(p.dueDate);
  if (p.rejected) return 'rejected';
  if (p.paid) return 'paid';
  if (p.viewed) return 'viewed';
  if (due < today) return 'overdue';
  return 'pending';
};

const AdminPayments: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(makeSample());
  const [comprovantes, setComprovantes] = useState<Comprovante[]>([]);
  const [loadingComprovantes, setLoadingComprovantes] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<{
    open: boolean;
    type: 'payment' | 'receipt';
    studentIndex?: number;
    monthIndex?: number;
    comprovante?: Comprovante;
  }>({ open: false, type: 'payment' });

  // Carregar comprovantes do Firebase
  useEffect(() => {
    try {
      const q = query(collection(db, 'comprovantes'), orderBy('uploadedAt', 'desc'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          } as Comprovante));
          setComprovantes(data);
          setLoadingComprovantes(false);
          setError(null);
        },
        (err) => {
          console.error('Erro ao carregar comprovantes:', err);
          setError(err.message || 'Erro ao carregar comprovantes');
          setLoadingComprovantes(false);
        }
      );
      return unsubscribe;
    } catch (err: any) {
      console.error('Erro ao configurar listener:', err);
      setError(err?.message || 'Erro ao configurar listener');
      setLoadingComprovantes(false);
    }
  }, []);

  const openPaymentModal = (sIdx: number, mIdx: number) => {
    setStudents((prev) => {
      const copy = JSON.parse(JSON.stringify(prev)) as Student[];
      copy[sIdx].payments[mIdx].viewed = true;
      return copy;
    });
    setModal({ open: true, type: 'payment', studentIndex: sIdx, monthIndex: mIdx });
  };

  const openReceiptModal = (comp: Comprovante) => {
    setModal({ open: true, type: 'receipt', comprovante: comp });
  };

  const closeModal = () => setModal({ open: false, type: 'payment' });

  const acceptPayment = () => {
    if (modal.studentIndex == null || modal.monthIndex == null) return;
    setStudents((prev) => {
      const copy = JSON.parse(JSON.stringify(prev)) as Student[];
      const p = copy[modal.studentIndex].payments[modal.monthIndex];
      p.paid = true;
      p.rejected = false;
      p.paidDate = new Date().toISOString();
      return copy;
    });
    closeModal();
  };

  const rejectPayment = () => {
    if (modal.studentIndex == null || modal.monthIndex == null) return;
    setStudents((prev) => {
      const copy = JSON.parse(JSON.stringify(prev)) as Student[];
      const p = copy[modal.studentIndex].payments[modal.monthIndex];
      p.rejected = true;
      p.paid = false;
      return copy;
    });
    closeModal();
  };

  const updateComprovantStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'comprovantes', id), { status });
      closeModal();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'approved') return 'approved';
    if (status === 'rejected') return 'rejected';
    return 'pending';
  };

  const seedTestData = async () => {
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
      ];

      for (const receipt of sampleReceipts) {
        await addDoc(collection(db, 'comprovantes'), receipt);
      }
      alert('✅ Dados de exemplo adicionados com sucesso!');
    } catch (error: any) {
      console.error('Erro ao adicionar dados de exemplo:', error);
      alert(`❌ Erro: ${error?.message || 'Erro desconhecido'}`);
    }
  };

  return (
    <div className="admin-payments dark">
      <h1>Gerenciamento de Pagamentos</h1>

      {/* SEÇÃO 1: Grade de Alunos e Parcelas */}
      <section className="payments-section">
        <h2>Pagamentos por Aluno</h2>
        <div className="payments-grid">
          <div className="grid-header">
            <div className="student-col">Aluno</div>
            <div className="months-col">
              {months.map((m) => (
                <div key={m} className="month-label">{m}</div>
              ))}
            </div>
          </div>

          {students.map((s, sIdx) => (
            <div key={s.id} className="grid-row">
              <div className="student-col">{s.name}</div>
              <div className="months-col">
                {s.payments.map((p, mIdx) => (
                  <div
                    key={p.month}
                    className={`month-box ${getStatus(p)}`}
                    title={`Vencimento: ${new Date(p.dueDate).toLocaleDateString()}${p.paid ? ' — Pago' : ''}`}
                    onClick={() => openPaymentModal(sIdx, mIdx)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="legend">
          <span className="legend-item"><span className="swatch paid"/> Pago</span>
          <span className="legend-item"><span className="swatch overdue"/> Em atraso</span>
          <span className="legend-item"><span className="swatch pending"/> Pendente</span>
          <span className="legend-item"><span className="swatch viewed"/> Visualizado</span>
          <span className="legend-item"><span className="swatch rejected"/> Rejeitado</span>
        </div>
      </section>

      {/* SEÇÃO 2: Comprovantes Enviados */}
      <section className="receipts-section">
        <h2>Comprovantes Enviados</h2>
        {error && (
          <p style={{ color: '#e74c3c' }}>Erro ao carregar comprovantes: {error}</p>
        )}
        {loadingComprovantes ? (
          <p style={{ color: '#bdbdbd' }}>Carregando comprovantes...</p>
        ) : comprovantes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <p style={{ color: '#bdbdbd' }}>Nenhum comprovante enviado ainda.</p>
            <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '20px' }}>
              Alunos podem enviar comprovantes pela página de pagamentos (/payment)
            </p>
            <button
              onClick={seedTestData}
              style={{
                padding: '10px 20px',
                background: '#2ecc71',
                color: '#000',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Adicionar Dados de Teste
            </button>
          </div>
        ) : (
          <div className="receipts-list">
            {comprovantes.map((comp) => (
              <div key={comp.id} className={`receipt-item ${getStatusColor(comp.status)}`}>
                <div className="receipt-info">
                  <p className="receipt-filename"><strong>{comp.fileName}</strong></p>
                  <p className="receipt-userId">Enviado em: {new Date(comp.uploadedAt?.seconds * 1000 || Date.now()).toLocaleString()}</p>
                  <p className={`receipt-status status-${comp.status}`}>Status: {comp.status}</p>
                </div>
                <button
                  className="view-button"
                  onClick={() => openReceiptModal(comp)}
                  disabled={comp.status !== 'pending'}
                >
                  Visualizar
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* MODAL: Pagamento */}
      {modal.open && modal.type === 'payment' && modal.studentIndex != null && modal.monthIndex != null && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Pagamento — {students[modal.studentIndex].name} — {students[modal.studentIndex].payments[modal.monthIndex].month}</h3>
            <div className="receipt-area">
              <div className="receipt-placeholder">Sem comprovante vinculado (placeholder)</div>
            </div>
            <div className="modal-actions">
              <button className="accept" onClick={acceptPayment}>Aceitar</button>
              <button className="reject" onClick={rejectPayment}>Rejeitar</button>
              <button className="close" onClick={closeModal}>Fechar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Comprovante */}
      {modal.open && modal.type === 'receipt' && modal.comprovante && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Revisar Comprovante</h3>
            <div className="receipt-preview">
              {modal.comprovante.fileType.includes('image') ? (
                <img src={modal.comprovante.downloadUrl} alt="Comprovante" className="receipt-image" />
              ) : (
                <div className="receipt-placeholder">
                  <p>PDF: {modal.comprovante.fileName}</p>
                  <a href={modal.comprovante.downloadUrl} target="_blank" rel="noopener noreferrer" className="download-link">
                    Baixar PDF
                  </a>
                </div>
              )}
            </div>
            <div className="modal-actions">
              <button
                className="accept"
                onClick={() => updateComprovantStatus(modal.comprovante!.id, 'approved')}
              >
                Aceitar
              </button>
              <button
                className="reject"
                onClick={() => updateComprovantStatus(modal.comprovante!.id, 'rejected')}
              >
                Rejeitar
              </button>
              <button className="close" onClick={closeModal}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPayments;
