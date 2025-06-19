import { Navigate, } from 'react-router-dom'
// 首页
import Home from './pages/index.tsx'
import HomeIndex from './pages/home'
import HomeStatistics from "./pages/statistics"
import HomeSetting from "./pages/setting"
// 分类
import CategoryPage from './pages/category'


export const routeConfig = [
    {
        path: '/',
        element: <Home />,
        children: [
            {
                index: true,
                element: <Navigate to="/home" replace />,
            },
            {
                path: 'home',
                element: <HomeIndex />,
            },
            {
                path: 'statistics',
                element: <HomeStatistics />,
            },
            {
                path: 'setting',
                element: <HomeSetting />,
            },
        ],
    },
    {
        path: '/category',
        name: "分类管理",
        element: <CategoryPage />,
    }
]