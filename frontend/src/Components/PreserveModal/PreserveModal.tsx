import { uploadDocument } from '../../services/api';
import './PreserveModal.css';
import { useState } from 'react';

interface PreserveModalProps {
  onClose: () => void;
}

const PreserveModal = ({ onClose }: PreserveModalProps) => {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [metadados, setMetadados] = useState({
    author: '',
    category: '',
    type: '',
    size: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetadados({ ...metadados, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setArquivo(file);
      setMetadados({
        ...metadados,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        type: 'PDF',
      });
    } else {
      alert('Selecione um PDF válido.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!arquivo) return alert('Envie um arquivo PDF.');
  
    try {
      await uploadDocument(arquivo, metadados);
      alert('Documento preservado!');
      window.location.reload();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Erro ao preservar o documento.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>📤 Preservar novo documento</h3>
        <form className='modal-form' onSubmit={handleSubmit}>
          <label>
            Upload PDF:
            <input type="file" accept="application/pdf" onChange={handleFile} required />
          </label>

          <label>
            Autor:
            <input name="author" value={metadados.author} onChange={handleChange} required />
          </label>

          <label>
            Categoria:
            <input name="category" value={metadados.category} onChange={handleChange} required />
          </label>

          <label>
            Tipo:
            <input name="type" value={metadados.type} disabled />
          </label>

          <label>
            Tamanho:
            <input name="size" value={metadados.size} disabled />
          </label>

          <div className="modal-actions">
            <button type="submit">Preservar</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreserveModal;
