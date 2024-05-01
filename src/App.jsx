import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ProductPage from './pages/product.jsx'
import HomePage from './pages/home.jsx'
import UmkmPage from './pages/umkm.jsx'
import ErrorPage from './pages/404.jsx'
import ProfileUmkmPage from './pages/profileumkm.jsx'
import ResourcePage from './pages/resource.jsx'
import ImpactPage from './pages/impact.jsx'
import EditProductPage from './pages/editproduct.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/umkm/:id' element={<UmkmPage />} />
        <Route path='/umkm/profile' element={<ProfileUmkmPage />} />
        <Route path='/umkm/resource' element={<ResourcePage />} />
        <Route path='/umkm/impact' element={<ImpactPage />} />
        <Route path='/product/edit/:id' element={<EditProductPage />} />
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;