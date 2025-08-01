import { useNavigate } from 'react-router-dom'
import classnames from 'classnames'
import { type ReactNode } from 'react'

interface PageProps {
  title?: ReactNode
  titleExtra?: ReactNode
  showBack?: boolean
  children?: ReactNode
  footer?: ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function Page(props: PageProps) {
  const navigate = useNavigate()

  return (
    <div
      className={classnames(
        'h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white font-semibold',
        props.className
      )}
      style={props.style}
    >
      {props.title && (
        <div className="flex-none px-4 h-16 flex items-center justify-between">
          <div className="w-12 overflow-hidden" onClick={() => navigate(-1)}>
            {props.showBack && <i className="ri-arrow-left-line text-2xl" />}
          </div>
          <div className="font-bold text-lg">{props.title}</div>
          <div className="w-12 overflow-hidden flex justify-end">
            {props.titleExtra}
          </div>
        </div>
      )}

      <div className="flex-auto overflow-y-auto overflow-x-hidden p-4 pt-0">
        {props.children}
      </div>

      {props.footer && <div className="flex-none">{props.footer}</div>}
    </div>
  )
}
