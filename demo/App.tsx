import React from 'react';

import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import ScaffoldPage from './pages/ScaffoldPage.tsx';
import { AppProvider } from './pages/contexts';

const App = (): React.ReactElement => {
  return (
    <main>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/test/*" element={ <ScaffoldPage/> }/>
            <Route path="*" element={ <Navigate to={ '/test ' } replace={ true }/> }/>
          </Routes>
        </Router>
      </AppProvider>
    </main>
  );
};

export default App;
