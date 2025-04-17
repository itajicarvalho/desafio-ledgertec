import React, { useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import PreserveModal from '../NewDocument/PreserveModal';

interface Documento {
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

  const navigate = useNavigate();

  const documentos: Documento[] = [
    {
      id: '123',
      nome: 'relatorio-final.pdf',
      data: '2024-03-01',
      status: 'Preservado',
    },
    {
      id: '456',
      nome: 'analise.docx',
      data: '2024-04-10',
      status: 'Iniciada',
    },
  ];

  const filtrarDocumentos = documentos.filter((doc) => {
    const dentroDoIntervalo =
      (!dataInicio || new Date(doc.data) >= new Date(dataInicio)) &&
      (!dataFim || new Date(doc.data) <= new Date(dataFim));
    const contemBusca = doc.nome.toLowerCase().includes(busca.toLowerCase());
    return dentroDoIntervalo && contemBusca;
  });

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

        <button className="novo-doc-btn" onClick={() => setShowModal(true)}>
          + Preservar novo documento
        </button>
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
                <button onClick={() => alert(`Download: ${doc.nome}`)}>⬇️</button>
                <button onClick={() => navigate(`/documento/${doc.id}`)}>🔍 Ver mais</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
