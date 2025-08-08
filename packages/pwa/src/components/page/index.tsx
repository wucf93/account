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
        'relative',
        {
          'pb-20': props.footer,
        },
        props.className
      )}
      style={props.style}
    >
      {props.title && (
        <div className="px-4 h-14 flex items-center justify-between global-bg-color sticky top-0 z-10 border-b-1 border-gray-700">
          <div className="flex items-center gap-3 text-lg font-bold">
            {props.showBack && (
              <i className="ri-arrow-left-line" onClick={() => navigate(-1)} />
            )}
            <div>{props.title}</div>
          </div>

          <div className="w-12 overflow-hidden flex justify-end">
            {props.titleExtra}
          </div>
        </div>
      )}

      <div className="overflow-y-auto overflow-x-hidden p-4">
        {props.children}
      </div>

      {props.footer && (
        <div className="h-20 fixed bottom-0 left-0 right-0 global-bg-color border-t border-gray-200 dark:border-gray-700">
          {props.footer}
        </div>
      )}
    </div>
  )
}
