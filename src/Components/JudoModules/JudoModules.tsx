import React from 'react';
import { Link } from 'react-router-dom';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { judoModules } from '../../data/modulesData';
import './JudoModules.css';

const JudoModules: React.FC = () => {
  // Exemplo de notificações (em produção, buscar do Firebase)
  const paymentAlerts = [
    { id: 1, text: 'Parcela de Fevereiro está em atraso!', type: 'overdue' },
    { id: 2, text: 'Parcela de Março foi marcada como inválida pelo administrador.', type: 'invalid' },
  ];

  return (
    <div className="page-container">
      {/* Sessão de Pagamento */}
      <section className="payment-section">
        <h2 className="payment-title">Pagamento</h2>
        <div className="payment-actions">
          <Link to="/payment" className="payment-link">
            <button className="payment-button">Anexar Boleto de Pagamento</button>
          </Link>
        </div>
      </section>

      {/* Cabeçalho de Módulos */}
      <div className="modules-header">
        <h1 className="section-title">Módulos do Curso</h1>
      </div>

      {/* Sessão de Módulos */}
      <section className="modules-section">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1400: { slidesPerView: 4, spaceBetween: 40 },
          }}
          className="mySwiper"
        >
          {judoModules.map((module) => (
            <SwiperSlide key={module.id}>
              <Link to={`/modules/${module.id}`} className="module-link">
                <div
                  className="module-card"
                  style={{ backgroundImage: `url(${module.imageUrl})` }}
                >
                  <div className="module-content">
                    <span className="module-tag">{module.tag}</span>
                    <h2 className="module-title">{module.title}</h2>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Sessão de Avisos */}
      <section className="alerts-section">
        <h2 className="section-title">Avisos</h2>
        <ul className="alerts-list">
          {paymentAlerts.length === 0 ? (
            <li className="alert-item">Nenhum aviso de pagamento.</li>
          ) : (
            paymentAlerts.map((alert) => (
              <li key={alert.id} className={`alert-item ${alert.type}`}>
                {alert.text}
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
};

export default JudoModules;