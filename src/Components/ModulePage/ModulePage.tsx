import React, { useState } from 'react';
// 1. Importe o hook "useParams" para ler o parâmetro da URL
import { useParams, Link } from 'react-router-dom';
// 2. Importe nossos dados
import { judoModules } from '../../data/modulesData';
import './ModulePage.css';

const ModulePage: React.FC = () => {
  // 3. Pegue o parâmetro "moduleId" da URL. O nome deve ser o mesmo que definimos na Rota.
  const { moduleId } = useParams<{ moduleId: string }>();

  // 4. Encontre o módulo correspondente no nosso array de dados.
  //    O `moduleId` da URL vem como string, então convertemos para número.
  const moduleData = judoModules.find(
    (m) => m.id === Number(moduleId)
  );

  // 5. Estado para controlar qual aba está ativa
  const [activeTab, setActiveTab] = useState('instructor');

  // 6. Se o módulo não for encontrado (ex: URL com ID inválido), mostre uma mensagem.
  if (!moduleData) {
    return (
      <div className="module-page-container">
        <h1>Módulo não encontrado</h1>
        <Link to="/modules">Voltar para a lista de módulos</Link>
      </div>
    );
  }

  // 7. Se encontrou, renderize a página
  return (
    <div className="module-page-container">
      <div className="module-header">
        <span className="module-tag-header">{moduleData.tag}</span>
        <h1>{moduleData.title}</h1>
        <Link to="/modules" className="back-link">← Voltar para todos os módulos</Link>
      </div>

      {/* Navegação das Abas */}
      <div className="tabs-nav">
        <button 
          onClick={() => setActiveTab('instructor')} 
          className={activeTab === 'instructor' ? 'active' : ''}
        >
          Instrutor
        </button>
        <button 
          onClick={() => setActiveTab('content')}
          className={activeTab === 'content' ? 'active' : ''}
        >
          Conteúdos
        </button>
        <button 
          onClick={() => setActiveTab('presence')}
          className={activeTab === 'presence' ? 'active' : ''}
        >
          Presença
        </button>
        <button 
          onClick={() => setActiveTab('evaluation')}
          className={activeTab === 'evaluation' ? 'active' : ''}
        >
          Avaliação
        </button>
      </div>

      {/* Conteúdo das Abas (renderização condicional) */}
      <div className="tabs-content">
        {activeTab === 'instructor' && (
          <div className="tab-pane">
            <h2>Sobre o Instrutor</h2>
            <div className="instructor-info">
              <img src={moduleData.instructor.avatarUrl} alt={moduleData.instructor.name} />
              <div>
                <h3>{moduleData.instructor.name}</h3>
                <p><strong>Graduação:</strong> {moduleData.instructor.graduation}</p>
                <details>
                  <summary>Saiba Mais</summary>
                  <p>{moduleData.instructor.description}</p>
                </details>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="tab-pane">
            <h2>Conteúdos Complementares</h2>
            <h4>Vídeos</h4>
            <ul>
              {moduleData.complementaryContent.videos.map(video => (
                <li key={video.title}><a href={video.url} target="_blank" rel="noopener noreferrer">{video.title}</a></li>
              ))}
            </ul>
            <h4>Documentos</h4>
             <ul>
              {moduleData.complementaryContent.documents.map(doc => (
                <li key={doc.title}><a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.title}</a></li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'presence' && (
           <div className="tab-pane">
            <h2>Controle de Presença</h2>
            <p>Funcionalidade de presença a ser implementada aqui.</p>
          </div>
        )}

        {activeTab === 'evaluation' && (
           <div className="tab-pane">
            <h2>Avaliação do Módulo</h2>
            <p>Sistema de avaliação a ser implementado aqui.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModulePage;