import { SpinLoading } from 'antd-mobile'

export default function GlobalLoading() {
  return (
    <div
      className={
        'h-screen w-screen flex items-center justify-center overflow-hidden'
      }
    >
      <SpinLoading color="primary" />
    </div>
  )
}
