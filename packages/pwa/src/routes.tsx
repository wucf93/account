import { Navigate } from 'react-router-dom'
import App from './App.tsx'
// 首页
import HomePage from './pages/home'
// import HomeStatistics from './pages/statistics'
// import HomeSetting from './pages/setting'
// 分类
// import CategoryPage from './pages/category'
// 登录&注册
import LoginPage from './pages/login'
import RegisterPage from './pages/register'

export const routeConfig = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'home',
        element: <HomePage />,
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
