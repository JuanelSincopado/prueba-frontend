import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AuthState from './context/auth_context/Auth_state.tsx'
import UserState from './context/user_context/User_state.tsx'
import HomeState from './context/home_context/Home_state.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthState>
      <UserState>
        <HomeState>
          <App />
        </HomeState>
      </UserState>
    </AuthState>
  </React.StrictMode>
)
