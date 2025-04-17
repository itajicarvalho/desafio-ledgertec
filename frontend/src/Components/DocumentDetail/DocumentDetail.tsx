import { useNavigate, useParams } from 'react-router-dom';

import './DocumentDetail.css';
import exemploPdf from '../../assets/curriculo.pdf';

const DocumentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const documento = {
    id,
    nome: 'exemplo.pdf',
    data: '2024-03-25',
    status: 'Preservado',
    metadados: {
      autor: 'João Silva',
      categoria: 'Relatório',
      tipo: 'PDF',
      tamanho: '1.2MB',
    },
    arquivo: exemploPdf,
  };

  return (
    <div className="detail-container">
      <div className='head-container'>
        <h2>📄 Detalhes do Documento</h2>

        <button className="novo-doc-btn" onClick={() => navigate('/dashboard')}>
          🏠 Dashboard
        </button>
      </div>

      <table className="tabela-documentos">
        <thead>
          <tr>
            <th>Campo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>ID</strong></td>
            <td>{documento.id}</td>
          </tr>
          <tr>
            <td><strong>Nome</strong></td>
            <td>{documento.nome}</td>
          </tr>
          <tr>
            <td><strong>Data</strong></td>
            <td>{documento.data}</td>
          </tr>
          <tr>
            <td><strong>Status</strong></td>
            <td className={`status ${documento.status.toLowerCase()}`}>{documento.status}</td>
          </tr>
          {Object.entries(documento.metadados).map(([key, value]) => (
            <tr key={key}>
              <td><strong>{key}</strong></td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem' }}>
        <a href={documento.arquivo} download>
          <button className="download-btn">⬇️ Download do Documento</button>
        </a>
      </div>

      <div className="pdf-viewer" style={{ height: '80vh', marginTop: '2rem' }}>
        <iframe
          src={documento.arquivo}
          width="100%"
          height="100%"
          title="Visualização do Documento"
          style={{ border: '1px solid #ccc', borderRadius: '8px' }}
        ></iframe>
      </div>
    </div>
  );
};

export default DocumentDetail;
