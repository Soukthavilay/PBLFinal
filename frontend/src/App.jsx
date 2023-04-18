import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import Header from './components/headers/Header';
import Footer from './components/footer/Footer';
import MainPages from './components/mainpages/Pages';
import { TopHeader } from './components/top-header/TopHeader';


function App() {
  const isShow2 = false;
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <TopHeader />
          <Header isShown={true} />
          <MainPages />
          <Footer />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
