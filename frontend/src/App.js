import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

// Auth Views
import LoginView from './views/auth/LoginView';
import RegisterView from './views/auth/RegisterView';
import AccountRegisteredView from './views/auth/AccountRegisteredView';
import RecoverPasswordView from './views/auth/RecoverPasswordView';
import RecoverUsernameView from './views/auth/RecoverUsernameView';

// Transaction Views
import SendMoneyView from './views/transactions/SendMoneyView';
import MoneySentView from './views/transactions/MoneySentView';
import MoneyReceivedView from './views/transactions/MoneyReceivedView';
import VerifyTransactionsView from './views/transactions/VerifyTransactionsView';

// Dashboard Views
import HomeView from './views/dashboard/HomeView';
import DashboardView from './views/dashboard/DashboardView';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    {/* Dashboard Routes */}
                    <Route exact path='/' element={<HomeView />} />
                    <Route path='/dashboard' element={<DashboardView />} />

                    {/* Auth Routes */}
                    <Route exact path='/login' element={<LoginView />} />
                    <Route path='/register' element={<RegisterView />} />
                    <Route path='/account-registered' element={<AccountRegisteredView />} />
                    <Route path='/recoverUsername' element={<RecoverUsernameView />} />
                    <Route path='/recoverPassword' element={<RecoverPasswordView />} />
                    <Route path='/recover-password' element={<RecoverPasswordView />} />

                    {/* Transaction Routes */}
                    <Route path='/send-money' element={<SendMoneyView />} />
                    <Route path='/money-sent' element={<MoneySentView />} />
                    <Route path='/money-received' element={<MoneyReceivedView />} />
                    <Route path='/verify-transactions' element={<VerifyTransactionsView />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;