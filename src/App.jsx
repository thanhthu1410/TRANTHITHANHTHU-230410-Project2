import './App.scss'
import { Routes, Route } from 'react-router-dom'
import LazyLoad from './LazyLoad'
import Navbar from '@components/Navbars/Navbar'

function App() {

  return (
    <div className="App">
      <div className="nav-container">
        <div className="nav-contents">
          <Navbar></Navbar>
        </div>
      </div>
      <div className='app_container'>
        {/* Content Router */}
        <Routes>
          <Route path="/" element={LazyLoad(() => import("@pages/Homes/Home"))()} />
          <Route path="register" element={LazyLoad(() => import("@pages/Registers/Register"))()} />
          <Route path="login" element={LazyLoad(() => import("@pages/Logins/Login"))()} />
          <Route path="shop/:type" element={LazyLoad(() => import("@pages/Shops/Shop"))()} />
          <Route path="detail/:id" element={LazyLoad(() => import("@pages/DetailItems/DetailItem"))()} />
          <Route path="checkout" element={LazyLoad(() => import("@pages/Carts/CheckOuts/CheckOut"))()} />
          <Route path="admin" element={LazyLoad(() => import("@pages/Admins/Admin"))()} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
