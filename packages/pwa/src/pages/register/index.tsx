import React, { useState } from 'react'
import { authClient } from '@/lib'
import Page from '@/components/page'
import { Link, useNavigate } from 'react-router-dom'

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null)
  const navigate = useNavigate()

  const validatePasswordMatch = () => {
    if (confirmPassword === '') {
      setPasswordMatch(null)
    } else {
      setPasswordMatch(password === confirmPassword)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    // 简单的表单验证
    if (!email || !password || !confirmPassword) {
      setError('请填写所有必填字段')
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('密码长度至少为6个字符')
      setIsLoading(false)
      return
    }

    authClient.signUp.email(
      { name: email, email: email, password },
      {
        onSuccess() {
          setSuccess('注册成功，请登录')
          navigate('/login', { replace: true })
        },
        onError({ error }) {
          setError(error.message || '注册失败，请稍后再试')
        },
      }
    )

    // 模拟注册API调用
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // 这里添加实际的注册逻辑
      setSuccess('注册成功，请登录')
      // 重置表单
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setPasswordMatch(null)
    } catch (err) {
      setError('注册失败，请稍后再试')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Page title="创建账户" showBack>
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md flex items-center">
                <i className="ri-alert-line text-red-500 dark:text-red-400 mr-2 flex-shrink-0 text-lg" />
                <p className="text-red-700 dark:text-red-300 text-sm">
                  {error}
                </p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md flex items-start">
                <i className="ri-check-line text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0 text-lg" />
                <p className="text-green-700 dark:text-green-300 text-sm">
                  {success}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  邮箱
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="请输入您的邮箱"
                    className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  密码
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="请设置您的密码"
                    className="block w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showPassword ? (
                      <i className="ri-eye-off-line text-lg h-5 w-5" />
                    ) : (
                      <i className="ri-eye-line text-lg h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  确认密码
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      validatePasswordMatch()
                    }}
                    onBlur={validatePasswordMatch}
                    placeholder="请再次输入密码"
                    className="block w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showConfirmPassword ? (
                      <i className="ri-eye-off-line text-lg h-5 w-5" />
                    ) : (
                      <i className="ri-eye-line text-lg h-5 w-5" />
                    )}
                  </button>
                  {passwordMatch !== null && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2">
                      {passwordMatch ? (
                        <i className="ri-check-line text-lg h-5 w-5 text-green-500" />
                      ) : (
                        <i className="ri-alert-line text-lg h-5 w-5 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {passwordMatch === false && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                    两次输入的密码不一致
                  </p>
                )}
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-600 dark:border-gray-500"
                    required
                  />
                </div>
                <label
                  htmlFor="terms"
                  className="ml-2 text-sm text-gray-600 dark:text-gray-300"
                >
                  我同意{' '}
                  <a
                    href="#"
                    className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    服务条款
                  </a>{' '}
                  和{' '}
                  <a
                    href="#"
                    className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    隐私政策
                  </a>
                </label>
              </div>

              <button
                type="submit"
                // whileHover={{ scale: 1.02 }}
                // whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition duration-150 ease-in-out ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" />
                    <span>注册中...</span>
                  </div>
                ) : (
                  '注册'
                )}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    或者
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button className="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-150 ease-in-out">
                  <i className="ri-github-fill text-xl" />
                </button>
                <button className="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-150 ease-in-out">
                  <i className="ri-chrome-fill text-xl" />
                </button>
                <button className="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-150 ease-in-out">
                  <i className="ri-wechat-fill text-xl" />
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-5 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              已有账户?{' '}
              <Link
                to="/login"
                replace
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                立即登录
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default RegisterPage
