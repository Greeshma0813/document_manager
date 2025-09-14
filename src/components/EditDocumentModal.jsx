import { useState, useEffect } from "react";
import { updateDocument, getFileTypes } from "../api/api";

export default function EditDocumentModal({ doc, onClose, onUpdated }) {
  const [name, setName] = useState(doc.name);
  const [fileName, setFileName] = useState(doc.fileName);
  const [fileSize, setFileSize] = useState(doc.fileSize);
  const [fileType, setFileType] = useState(doc.fileType?.id || "");
  const [fileTypes, setFileTypes] = useState([]);

  useEffect(() => {
    getFileTypes().then((res) => setFileTypes(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDocument(doc.id, {
      name,
      fileName,
      fileSize,
      fileType: { id: fileType }, // backend expects FileType object
    });
    onUpdated();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Document</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>ID (read-only):</label>
            <input type="text" value={doc.id} readOnly />
          </div>
          <div>
            <label>Document Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>File Name:</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>File Size:</label>
            <input
              type="number"
              value={fileSize}
              onChange={(e) => setFileSize(e.target.value)}
              required
            />
          </div>
          <div>
            <label>File Type:</label>
            <select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              required
            >
              <option value="">Select File Type</option>
              {fileTypes.map((ft) => (
                <option key={ft.id} value={ft.id}>
                  {ft.typeName}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-actions">
            <button type="submit" className="edit-btn">Save</button>
            <button type="button" className="delete-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
