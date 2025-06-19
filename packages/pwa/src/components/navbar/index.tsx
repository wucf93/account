import { NavBar } from 'antd-mobile';
import { useMemo } from 'react';
import { useLocation, useNavigate, matchPath } from 'react-router-dom'
import { routeConfig } from '../../routes';
import cls from 'classnames'

interface NavbarPorps {
    className?: string
    style?: React.CSSProperties
}

export default function Navbar(props: NavbarPorps) {
    const location = useLocation();
    const navigate = useNavigate();

    // 当前激活的一级路由
    const currentRoute = useMemo(() => routeConfig.find(item => matchPath(item.path, location.pathname)), [location.pathname])

    // 能否返回
    const backIcon = useMemo(() => !!currentRoute, [currentRoute])

    return (
        <NavBar
            style={props.style}
            className={cls(props.className, "w-full", "bg-white", "shadow-sm")}
            onBack={() => navigate(-1)}
            backIcon={backIcon}
        >
            <div className='font-bold'>{currentRoute?.name || "快记账"}</div>
        </NavBar>
    )
}