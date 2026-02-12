import React, { useState } from 'react';
import './AdminPresence.css';
import { judoModules } from '../../data/modulesData';

type AttendanceRecord = {
  moduleId: number;
  status: 'present' | 'absent' | 'unknown';
  note?: string | null;
};

type Student = {
  id: string;
  name: string;
  attendance: AttendanceRecord[];
};

const makeSample = (): Student[] => {
  const modules = judoModules;
  const mapAttendance = () => modules.map((m, i) => ({ moduleId: m.id, status: i <= 1 ? 'present' : (i === 3 ? 'absent' : 'unknown') }));
  return [
    { id: '1', name: 'Carlos Silva', attendance: mapAttendance() },
    { id: '2', name: 'Mariana Oliveira', attendance: modules.map((m, i) => ({ moduleId: m.id, status: i === 1 ? 'present' : 'unknown' })) },
    { id: '3', name: 'João Pereira', attendance: modules.map((m) => ({ moduleId: m.id, status: 'unknown' })) },
  ];
};

const AdminPresence: React.FC = () => {
  const modules = judoModules;
  const [students, setStudents] = useState<Student[]>(makeSample());
  const [modal, setModal] = useState<{ open: boolean; sIdx: number | null; mIdx: number | null }>({ open: false, sIdx: null, mIdx: null });

  const openModal = (sIdx: number, mIdx: number) => setModal({ open: true, sIdx, mIdx });
  const closeModal = () => setModal({ open: false, sIdx: null, mIdx: null });

  const setStatus = (status: AttendanceRecord['status']) => {
    if (modal.sIdx == null || modal.mIdx == null) return;
    setStudents((prev) => {
      const copy = JSON.parse(JSON.stringify(prev)) as Student[];
      copy[modal.sIdx].attendance[modal.mIdx].status = status;
      return copy;
    });
    closeModal();
  };

  const getClass = (a: AttendanceRecord) => {
    if (a.status === 'present') return 'present';
    if (a.status === 'absent') return 'absent';
    return 'unknown';
  };

  return (
    <div className="admin-presence dark">
      <h1>Registro de Presenças por Módulo</h1>
      <div className="presence-grid">
        <div className="grid-header">
          <div className="student-col">Aluno</div>
          <div className="months-col">
            {modules.map((mod) => (
              <div key={mod.id} className="module-label" title={mod.title}>{mod.tag}</div>
            ))}
          </div>
        </div>

        {students.map((s, sIdx) => (
          <div key={s.id} className="grid-row">
            <div className="student-col">{s.name}</div>
            <div className="months-col">
              {s.attendance.map((a, mIdx) => (
                <div
                  key={a.moduleId}
                  className={`att-box ${getClass(a)}`}
                  onClick={() => openModal(sIdx, mIdx)}
                  title={`Status: ${a.status}`}
                />
              ))}
            </div>
          </div>
        ))}

      </div>

      {modal.open && modal.sIdx != null && modal.mIdx != null && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Presença — {students[modal.sIdx].name} — {modules[students[modal.sIdx].attendance[modal.mIdx].moduleId - 1].tag}</h3>
            <div className="modal-actions">
              <button className="present" onClick={() => setStatus('present')}>Marcar Presente</button>
              <button className="absent" onClick={() => setStatus('absent')}>Marcar Ausente</button>
              <button className="unknown" onClick={() => setStatus('unknown')}>Limpar</button>
              <button className="close" onClick={closeModal}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPresence;
