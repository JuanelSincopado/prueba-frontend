import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginView from './pages/auth/Login_view'
import RegisterView from './pages/auth/Register_view'
import HomeView from './pages/home/Home_view'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginView />} />
        <Route path='/register' element={<RegisterView />} />
        <Route path='/home' element={<HomeView />} />
        <Route path='*' element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
