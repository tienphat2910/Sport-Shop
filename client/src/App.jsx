import { Routes, Route } from 'react-router-dom'
import publicRoutes from './routes/routes'

function App() {
  return (
    <Routes>
      {publicRoutes.map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  )
}

export default App
