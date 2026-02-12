import './App.css'
import { Routes, Route } from 'react-router-dom';
import JudoModules from './Components/JudoModules/JudoModules'
import Login from './Components/Login/Login'
import ModulePage from './Components/ModulePage/ModulePage';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'; // Importe o componente
import PaymentUpload from './Components/PaymentUpload/PaymentUpload';
import AdminPayments from './Components/AdminPayments/AdminPayments';
import StudentPayment from './Components/StudentPayment/StudentPayment';
import AdminPresence from './Components/AdminPresence/AdminPresence';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import AddUser from './Components/AddUser/AddUser';

function App() {
  return (

    <div>
      <Routes>
        {/* Rota de Login é pública */}
        <Route path="/" element={<Login />} />

        {/* Rotas de Módulos para alunos */}
        <Route 
          path="/modules" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <JudoModules />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/modules/:moduleId" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <ModulePage />
            </ProtectedRoute>
          } 
        />
        {/* Rota de Dashboard para administradores */}
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        {/* Rota de Adicionar Usuário para administradores */}
        <Route 
          path="/add-user" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AddUser />
            </ProtectedRoute>
          } 
        />
        {/* Rota de Pagamento para alunos */}
        <Route 
          path="/payment" 
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentPayment />
            </ProtectedRoute>
          } 
        />
        {/* Rota de Pagamento para administradores (visão completa) */}
        <Route 
          path="/admin-payments" 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPayments />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/presence" 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPresence />
            </ProtectedRoute>
          } 
        />
        {/* Rota para acesso negado */}
        <Route path="/unauthorized" element={<div>Acesso negado. Você não tem permissão para acessar esta página.</div>} />
      </Routes>
    </div>
  );
}

export default App;