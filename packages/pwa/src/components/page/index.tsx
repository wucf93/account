import { type ReactNode } from 'react'

interface PageProps {
  title?: ReactNode
  titleExtra?: ReactNode
  showBack?: boolean
  children?: ReactNode
}

export default function Page(props: PageProps) {
  return (
    <div className="max-h-screen flex flex-col">
      <div className="flex-none h-18 flex items-center justify-between px-4">
        <div className="w-12 overflow-hidden">
          {props.showBack && <i className="ri-arrow-left-line text-2xl" />}
        </div>
        <div className="font-bold text-lg">{props.title}</div>
        <div className="w-12 overflow-hidden flex justify-end">
          {props.titleExtra}
        </div>
      </div>
      <div className="flex-auto overflow-y-auto">{props.children}</div>
    </div>
  )
}
