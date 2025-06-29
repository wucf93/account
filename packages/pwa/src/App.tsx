import Navbar from './components/navbar'
import ModifyDetailsModal from './components/details-popup'
import { GlobalProvider } from './store'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <GlobalProvider>
      <div className="h-screen overflow-hidden flex flex-col">
        {/* 导航栏 */}
        <Navbar className="flex-none" />

        {/* 路由页面 */}
        <div className="grow overflow-y-auto">
          <Outlet />
        </div>

        {/* 一些全局的弹窗 */}
        <ModifyDetailsModal />
      </div>
    </GlobalProvider>
  )
}
