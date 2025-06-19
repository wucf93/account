
import Navbar from './components/navbar'
import ModifyDetailsModal from './components/details-popup';
import { BrowserRouter, useRoutes } from 'react-router-dom'
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

      {/* 一些全局的弹窗 */}
      <ModifyDetailsModal />
    </BrowserRouter>
  )
}
