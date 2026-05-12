import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProjectEditor from './pages/ProjectEditor'
import ExportPage from './pages/ExportPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:projectId" element={<ProjectEditor />} />
      <Route path="/export/:projectId" element={<ExportPage />} />
    </Routes>
  )
}

export default App