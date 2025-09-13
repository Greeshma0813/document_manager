import { useEffect, useState } from 'react';
import { getFileTypes, getDocuments } from '../api/api';

export default function RecordsList() {
  const [fileTypes, setFileTypes] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const ft = await getFileTypes();
    const docs = await getDocuments();
    setFileTypes(ft.data);
    setDocuments(docs.data);
  };

  return (
    <div>
      <h2>File Types</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>File Type Name</th>
          </tr>
        </thead>
        <tbody>
          {fileTypes.map(ft => (
            <tr key={ft.id}>
              <td>{ft.id}</td>
              <td>{ft.typeName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: '30px' }}>Documents</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Document Name</th>
            <th>File Name</th>
            <th>File Size</th>
            <th>File Type</th>
          </tr>
        </thead>
        <tbody>
          {documents.map(doc => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.name}</td>
              <td>{doc.fileName}</td>
              <td>{doc.fileSize}</td>
              <td>{fileTypes.find(ft => ft.id === doc.fileType.id)?.typeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
