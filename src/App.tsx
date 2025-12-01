import { Suspense } from 'react';

import ChartPage from './pages/ChartPage/ChartPage';

import './App.css';

function App() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <ChartPage />
    </Suspense>
  );
}

export default App;
