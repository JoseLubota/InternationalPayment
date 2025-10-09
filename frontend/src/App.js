import './App.css';
import UserLogin from "./components/userLogin";
import Home from "./components/home";
import {Helmet} from "react-helmet";
import RecoverUsername from './components/recoverUsername';
import RecoveredUsername from './components/recoveredUsername';
import RecoverPassword from './components/recoverPassword';
import ResetPassword from "./components/resetPassword";
import Register from "./components/register";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>

    <Helmet>
      <meta charSet='utf-8'/>
      <title>Secure App</title>
      <meta
      httpEquiv="Content-Security-Policy"
      content="
        default-src 'self';
        script-src 'self';
        style-src 'self' 'unsafe-inline';
        img-src 'self' data:;
        connect-src 'self' http://localhost:4000;
        frame-ancestors 'none';
        "
      />

    </Helmet>

    <div>
      <Routes>
      <Route exact path='/' element={<Home/>} />
        <Route exact path='/login' element={<UserLogin/>} />
        <Route path='/register' element ={<Register/>} />
        <Route path='/recoverUsername' element ={<RecoverUsername/>} />
        <Route path='/recovered-username' element = {<RecoveredUsername/>} />
        <Route path='/recoverPassword' element ={<RecoverPassword/>} />
        <Route path='/reset-password' element ={<ResetPassword/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}
export default App;