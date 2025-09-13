// src/App.js
import { useState } from 'react';
import FileTypeForm from './components/FileTypeForm';
import DocumentForm from './components/DocumentForm';
import RecordsList from './components/RecordsList';

function App() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Document Management</h1>

      <section style={{ marginBottom: '20px' }}>
        <h2>Add File Type</h2>
        <FileTypeForm onAdded={triggerRefresh} />
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h2>Add Document</h2>
        <DocumentForm onAdded={triggerRefresh} />
      </section>

      <section>
        <h2>Records</h2>
        <RecordsList key={refresh} />
      </section>
    </div>
  );
}

export default App;
