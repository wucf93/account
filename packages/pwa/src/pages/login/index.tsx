import { authClient } from '@/lib'
import { Button, Form, Input, Toast } from 'antd-mobile'
import { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onSubmitHander = useCallback(async () => {
    const userInfo = await form.validateFields()
    authClient.signIn.email(
      { email: userInfo.email, password: userInfo.password },
      {
        onSuccess() {
          Toast.show('注册成功')
          navigate('/home', { replace: true })
        },
        onError({ error }) {
          Toast.show(error.message)
        },
      }
    )
  }, [])

  return (
    <div className="h-screen bg-gray-100 overflow-hidden p-6 pt-20">
      <div className="text-center text-2xl font-bold">登录一下吧</div>

      <Form
        form={form}
        layout="horizontal"
        mode="card"
        requiredMarkStyle="none"
        footer={
          <Button
            block
            color="primary"
            onClick={onSubmitHander}
            size="large"
            shape="rounded"
          >
            提交
          </Button>
        }
        className="mt-20"
      >
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            { required: true, message: '请输入邮箱地址' },
            { type: 'email', message: '请输入正确的邮箱地址' },
          ]}
          style={{ '--prefix-width': '68px' }}
        >
          <Input placeholder="请输入邮箱地址" type="email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            { required: true, message: '请输入密码' },
            { max: 20, message: '密码不能超过20个字符' },
          ]}
          style={{ '--prefix-width': '68px' }}
        >
          <Input placeholder="请输入密码" type="password" />
        </Form.Item>
      </Form>

      <div className="text-center">
        没有账号？点击<Link to="/register">注册</Link>
      </div>
    </div>
  )
}
