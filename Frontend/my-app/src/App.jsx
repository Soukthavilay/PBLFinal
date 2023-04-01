import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Page from './components/mainPages/Page';


function App() {
  return (
    <>
    <Header/>
    <div className="container">
      <Page/>
    </div>
    <Footer/>
    </>
  );
}

export default App;
