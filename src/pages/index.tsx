import { TabBar } from 'antd-mobile'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import { AppOutline, PieOutline, SetOutline } from 'antd-mobile-icons';

export default function Index() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div>
      {/* 导航栏 */}
      {/* <div className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="text-xl font-['Pacifico'] text-primary">logo</div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center cursor-pointer">
              <i className="ri-notification-3-line ri-lg"></i>
            </div>
            <div className="w-8 h-8 flex items-center justify-center">
              <i className="ri-notification-3-line ri-lg"></i>
            </div>
          </div>
        </div>
      </div> */}

      <div className='pt-[60px] pb-[70px]'>
        <Outlet />
      </div>

      {/* 悬浮按钮 */}
      <div
        className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50"
      >
        <TabBar activeKey={location.pathname}>
          <TabBar.Item key={"/home"} icon={<AppOutline />} title="明细" onClick={() => navigate("home", { replace: true })} />
          <TabBar.Item key={"/statistics"} icon={<PieOutline />} title="统计" onClick={() => navigate("statistics", { replace: true })} />
          <TabBar.Item key={"/setting"} icon={<SetOutline />} title="设置" onClick={() => navigate("setting", { replace: true })} />
        </TabBar>
      </div>
    </div>
  );
}
