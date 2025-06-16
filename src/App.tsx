
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/index.tsx'
import HomeIndex from './pages/home'
import HomeStatistics from "./pages/statistics"
import HomeSetting from "./pages/setting"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 首页 */}
        <Route path="/" element={<Home />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<HomeIndex />} />
          <Route path="statistics" element={<HomeStatistics />} />
          <Route path="setting" element={<HomeSetting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
