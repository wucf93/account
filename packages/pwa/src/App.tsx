
import Navbar from './components/navbar'
import ModifyDetailsModal from './components/details-popup';
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { routeConfig } from './routes'

function RoutePages() {
  const routes = useRoutes(routeConfig,);
  return <div className='grow overflow-y-auto'>{routes}</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className='h-screen overflow-hidden flex flex-col'>
        {/* 导航栏 */}
        <Navbar className='flex-none' />

        {/* 路由页面 */}
        <RoutePages />
      </div>

      {/* 一些全局的弹窗 */}
      <ModifyDetailsModal />
    </BrowserRouter>
  )
}
