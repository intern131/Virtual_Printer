
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import AuthProvider, { Authcontext } from './Pages/LoginPage/AuthProvider.jsx';



createRoot(document.getElementById('root')).render(
    <BrowserRouter>

        <AuthProvider> <App /></AuthProvider>


    </BrowserRouter>
)
