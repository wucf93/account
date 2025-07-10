import { TabBar } from 'antd-mobile'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import { AppOutline, PieOutline, SetOutline } from 'antd-mobile-icons'

export default function Index() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="flex flex-col h-full">
      {/* 导航栏 */}
      <div className="flex-grow overflow-y-auto">
        <Outlet />
      </div>

      {/* 悬浮按钮 */}
      <div className="flex-none bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
        <TabBar activeKey={location.pathname}>
          <TabBar.Item
            key={'/home'}
            icon={<AppOutline />}
            title="明细"
            onClick={() => navigate('home', { replace: true })}
          />
          <TabBar.Item
            key={'/statistics'}
            icon={<PieOutline />}
            title="统计"
            onClick={() => navigate('statistics', { replace: true })}
          />
          <TabBar.Item
            key={'/setting'}
            icon={<SetOutline />}
            title="设置"
            onClick={() => navigate('setting', { replace: true })}
          />
        </TabBar>
      </div>
    </div>
  )
}
