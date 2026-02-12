import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1>Painel de Administração</h1>
      <div className="dashboard-cards">
        <div className="card" onClick={() => navigate('/add-user')}>
          <h2>Gerenciar Usuários</h2>
          <p>Adicione, edite ou remova usuários do sistema.</p>
          <button>Ir para Usuários</button>
        </div>
        <div className="card" onClick={() => navigate('/admin-payments')}>
          <h2>Pagamentos</h2>
          <p>Visualize e gerencie uploads de pagamentos.</p>
          <button>Ir para Pagamentos</button>
        </div>
        <div className="card">
          <h2>Módulos</h2>
          <p>Gerencie os módulos de judô disponíveis.</p>
          <button>Ir para Módulos</button>
        </div>
        <div className="card" onClick={() => navigate('/presence')}>
          <h2>Presença</h2>
          <p>Registre e visualize presenças dos alunos.</p>
          <button>Ir para Presença</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;