import { useState, useEffect } from 'react';
import { createDocument, getFileTypes } from '../api/api';

export default function DocumentForm({ onAdded }) {
  const [name, setName] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [fileType, setFileType] = useState('');
  const [fileTypes, setFileTypes] = useState([]);

  useEffect(() => {
    getFileTypes().then(res => setFileTypes(res.data));
  }, []);

  useEffect(() => {
    getFileTypes().then(res => setFileTypes(res.data));
  }, [onAdded]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createDocument({ name: name, fileName: fileName, fileSize: fileSize, fileTypeId: fileType });
    setName(''); setFileName(''); setFileSize(''); setFileType('');
    onAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Document Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="text" placeholder="File Name" value={fileName} onChange={e => setFileName(e.target.value)} required />
      <input type="number" placeholder="File Size" value={fileSize} onChange={e => setFileSize(e.target.value)} required />
      <select value={fileType} onChange={e => setFileType(e.target.value)} required>
        <option value="">Select File Type</option>
        {fileTypes.map(ft => <option key={ft.id} value={ft.id}>{ft.typeName}</option>)}
      </select>
      <button type="submit">Add Document</button>
    </form>
  );
}
