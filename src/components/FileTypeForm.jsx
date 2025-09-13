import { useState } from 'react';
import { createFileType } from '../api/api';

export default function FileTypeForm({ onAdded }) {
  const [typeName, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createFileType({ typeName: typeName });
    setName('');
    onAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={typeName}
        onChange={(e) => setName(e.target.value)}
        placeholder="File Type Name"
        required
      />
      <button type="submit">Add File Type</button>
    </form>
  );
}
