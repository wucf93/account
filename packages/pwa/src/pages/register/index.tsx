import { authClient } from '@/lib'
import { Button, Form, Input, Toast } from 'antd-mobile'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onSubmitHander = useCallback(async () => {
    const userInfo = await form.validateFields()
    authClient.signUp.email(
      {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
      },
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
  }, [navigate, form])

  return (
    <div className="h-screen bg-gray-100 overflow-hidden p-6 pt-20">
      <div className="text-center text-2xl font-bold">注册之后享精彩</div>
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
            type="submit"
          >
            提交
          </Button>
        }
        className="mt-20"
      >
        <Form.Item
          name="name"
          label="姓名"
          rules={[
            { required: true, message: '请输入姓名' },
            { max: 20, message: '姓名不能超过20个字符' },
          ]}
          style={{ '--prefix-width': '88px' }}
        >
          <Input placeholder="请输入姓名" type="text" />
        </Form.Item>

        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            { required: true, message: '请输入邮箱地址' },
            { type: 'email', message: '请输入正确的邮箱地址' },
          ]}
          style={{ '--prefix-width': '88px' }}
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
          style={{ '--prefix-width': '88px' }}
        >
          <Input placeholder="请输入密码" type="password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="确认密码"
          rules={[
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.reject('请输入确认密码')
                }
                if (
                  !!form.getFieldValue('password') &&
                  value !== form.getFieldValue('password')
                ) {
                  return Promise.reject('两次输入密码不一致')
                }
                return Promise.resolve()
              },
            },
          ]}
          style={{ '--prefix-width': '88px' }}
        >
          <Input placeholder="请输入确认密码" type="password" />
        </Form.Item>
      </Form>
    </div>
  )
}
