import { Navigate } from 'react-router-dom'
import App from './App.tsx'
// 首页
import Home from './pages/index.tsx'
import HomeIndex from './pages/home'
import HomeStatistics from './pages/statistics'
import HomeSetting from './pages/setting'
// 分类
import CategoryPage from './pages/category'
// 登录&注册
import LoginPage from './pages/login'
import RegisterPage from './pages/register'

export const routeConfig = [
  {
    path: '/',
    element: <App />,
    children: [
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
        name: '分类管理',
        element: <CategoryPage />,
      },
    ],
  },
  {
    path: '/login',
    name: '登录',
    element: <LoginPage />,
  },
  {
    path: '/register',
    name: '注册',
    element: <RegisterPage />,
  },
]
