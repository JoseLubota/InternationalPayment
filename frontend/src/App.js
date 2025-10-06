import './App.css';
import UserLogin from "./components/userLogin";
import Home from "./components/home"
import RecoverUsername from './components/recoverUsername';
import RecoverPassword from './components/recoverPassword';
import Register from "./components/register";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
      <Route exact path='/' element={<Home/>} />
        <Route exact path='/login' element={<UserLogin/>} />
        <Route path='/register' element ={<Register/>} />
        <Route path='/recoverUsername' element ={<RecoverUsername/>} />
        <Route path='/recoverPassword' element ={<RecoverPassword/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}
export default App;