import './App.css';
import { makeStyles } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import Homepage from './pages/Homepage';
import Coinpage from './pages/Coinpage';


function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "black",
      color: "lightgrey",
      minHeight: "100vh"
    }

  }));

  const classes = useStyles()

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/coins/:id" element={<Coinpage />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
