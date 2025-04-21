import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

import './Dashboard.css';
import PreserveModal from '../PreserveModal/PreserveModal';
import { downloadDocument, getDocuments } from '../../services/api';

interface Document {
  id: string;
  nome: string;
  data: string;
  status: 'Iniciada' | 'Preservado' | 'Falha';
}

const Dashboard: React.FC = () => {
  const [busca, setBusca] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [documentos, setDocumentos] = useState<Document[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getDocuments().then(
      (data) => {
        const adaptados = data.map((doc: any) => ({
          id: doc.id.toString(),
          nome: doc.filename,
          data: new Date(doc.createdAt).toISOString().split('T')[0],
          status: 'Preservado',
        }));
        setDocumentos(adaptados);
      }
    ).catch(console.error);
  }, []);

  const filtrarDocumentos = documentos.filter((doc) => {
    const dentroDoIntervalo =
      (!dataInicio || new Date(doc.data) >= new Date(dataInicio)) &&
      (!dataFim || new Date(doc.data) <= new Date(dataFim));
    const contemBusca = doc.nome.toLowerCase().includes(busca.toLowerCase());
    return dentroDoIntervalo && contemBusca;
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h1>🏠 Dashboard</h1>

      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar por nome ou metadado..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <label>
          Início:
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </label>

        <label>
          Fim:
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </label>

        <div className='top-btns'>
          <button className="novo-doc-btn" onClick={() => setShowModal(true)}>
            + Preservar novo documento
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
        {showModal && <PreserveModal onClose={() => setShowModal(false)} />}

      </div>

      <table className="tabela-documentos">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Data de Preservação</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtrarDocumentos.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.nome}</td>
              <td>{doc.data}</td>
              <td className={`status ${doc.status.toLowerCase()}`}>{doc.status}</td>
              <td>
                <button className='download-btn' onClick={() => downloadDocument(doc.nome)}>⬇️</button>

                <button className='details-btn' onClick={() => navigate(`/document/${doc.nome}`)}>🔍 Ver mais</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
