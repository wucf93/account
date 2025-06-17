import { NavBar } from 'antd-mobile';
import { CloseOutline, } from 'antd-mobile-icons';
import { useMemo } from 'react';
import { useLocation, useNavigate, matchPath } from 'react-router-dom'
import { routeConfig } from '../../routes';

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    // 当前激活的一级路由
    const currentRoute = useMemo(() => routeConfig.find(item => matchPath(item.path, location.pathname)), [location.pathname])

    // 能否返回
    const backIcon = useMemo(() => !!currentRoute, [currentRoute])

    return (
        <NavBar className="fixed top-0 left-0 w-full bg-white shadow-sm z-50" backIcon={backIcon} onBack={() => navigate(-1)}>
            <div className='font-bold'>{currentRoute?.name || "快记账"}</div>
        </NavBar>
    )
}