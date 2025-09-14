import { useEffect, useState } from "react";
import {
  getFileTypes,
  getDocuments,
  deleteFileType,
  deleteDocument,
} from "../api/api";
import EditDocumentModal from "./EditDocumentModal";

export default function RecordsList() {
  const [fileTypes, setFileTypes] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [editingDoc, setEditingDoc] = useState(null);

  const fetchData = async () => {
    const ft = await getFileTypes();
    const docs = await getDocuments();
    setFileTypes(ft.data);
    setDocuments(docs.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (type, id) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === "fileType") {
        await deleteFileType(id);
      } else {
        await deleteDocument(id);
      }
      fetchData();
    }
  };

  return (
    <div>
      <h2>Documents</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Document Name</th>
            <th>File Name</th>
            <th>File Size</th>
            <th>File Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.name}</td>
              <td>{doc.fileName}</td>
              <td>{doc.fileSize}</td>
              <td>
                {fileTypes.find((ft) => ft.id === doc.fileType.id)?.typeName}
              </td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => setEditingDoc(doc)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete("document", doc.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show modal if editingDoc is set */}
      {editingDoc && (
        <EditDocumentModal
          doc={editingDoc}
          onClose={() => setEditingDoc(null)}
          onUpdated={fetchData}
        />
      )}
    </div>
  );
}
