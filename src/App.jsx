import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import QRPage from './page/QrPage'
import AdminPage from './page/AdminPage'
import RegisterForm from './Form/RegistrationForm'
import EditModal from './Editmodel'
import CustomizeForm from './page/CustmizeForm'
import Payment from './page/Payment'
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QRPage/>} />
        <Route path="/register" element={<RegisterForm/>}/>
        <Route path="/edit" element={<EditModal/>}/>
         <Route path="/form" element={<CustomizeForm/>}/>
        <Route path="/admin" element={<AdminPage />} />
          <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App