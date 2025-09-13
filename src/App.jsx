import { useState } from 'react';
import FileTypeForm from './components/FileTypeForm';
import DocumentForm from './components/DocumentForm';
import RecordsList from './components/RecordsList';

function App() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div>
      <h1>Document Management</h1>
      <FileTypeForm onAdded={triggerRefresh} />
      <DocumentForm onAdded={triggerRefresh} />
      <RecordsList key={refresh} />
    </div>
  );
}

export default App;
