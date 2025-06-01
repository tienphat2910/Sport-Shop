import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import publicRoutes from './routes/routes'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {publicRoutes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </AuthProvider>
  )
}

export default App
