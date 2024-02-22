import './App.css';
import AuthPage from './Pages/AuthPage';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
 import Router from './Routes/routes.js';

function App() {
  return (
   <div>
   <ToastContainer/>
      <Router/>

   </div>
  );
}

export default App;
