
import { BrowserRouter, useRoutes } from 'react-router-dom'
import Navbar from './components/navbar/index.tsx'
import { routeConfig } from './routes'

function RoutePages() {
  const routes = useRoutes(routeConfig);
  return routes;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* 导航栏 */}
      <Navbar />
      {/* 路由页面 */}
      <RoutePages />
    </BrowserRouter>
  )
}
