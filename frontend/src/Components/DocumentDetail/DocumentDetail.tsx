import { useNavigate, useParams } from 'react-router-dom';

import './DocumentDetail.css';
import { downloadDocument, getDocumentByFilename } from '../../services/api';
import { useEffect, useState } from 'react';

const DocumentDetail = () => {
  const { filename } = useParams();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;

  const [document, setDocument] = useState<any>();

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const data = await getDocumentByFilename(filename as string);
        const formated = {
          id: data.id,
          name: data.filename,
          data: data.createdAt,
          status: 'Preservado',
          metadados: {
            autor: data.author,
            categoria: data.category,
            tipo: data.type,
            tamanho: data.size,
          },
          arquivo: `${baseURL}/uploads/${data.filename}`,
        };
        setDocument(formated);
      } catch (error) {
        console.error('Erro ao buscar documento:', error);
      }
    };

    if (filename) fetchDocument();
  }, [filename]);

  if (!document) return <div>🔄 Carregando documento...</div>;

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
            <td>{document.id}</td>
          </tr>
          <tr>
            <td><strong>Nome</strong></td>
            <td>{document.name}</td>
          </tr>
          <tr>
            <td><strong>Data</strong></td>
            <td>{document.data}</td>
          </tr>
          <tr>
            <td><strong>Status</strong></td>
            <td className={`status ${document.status.toLowerCase()}`}>{document.status}</td>
          </tr>
          {Object.entries(document.metadados).map(([key, value]) => (
            <tr key={key}>
              <td><strong>{key}</strong></td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem' }}>
        <button className="download-btn" onClick={() => downloadDocument(document.name)}>⬇️ Download do Documento</button>
      </div>

      <div className="pdf-viewer" style={{ height: '80vh', marginTop: '2rem' }}>
        <iframe
          src={document.arquivo}
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
