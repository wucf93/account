import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import App from './App.tsx'

// 登录&注册
// const LoginPage = lazy(() => import('./pages/login'))
// const RegisterPage = lazy(() => import('./pages/register'))
// 首页
const HomePage = lazy(() => import('./pages/home'))
// 智能记账
// const AiPage = lazy(() => import('./pages/ai'))

export const routeConfig = [
  // {
  //   path: '/login',
  //   name: '登录',
  //   element: <LoginPage />,
  // },
  // {
  //   path: '/register',
  //   name: '注册',
  //   element: <RegisterPage />,
  // },
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
      // {
      //   path: 'ai',
      //   element: <AiPage />,
      // },
    ],
  },
]
