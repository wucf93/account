import classNames from 'classnames'

export interface BubbleItemProps {
  className?: string
  style?: React.CSSProperties
  id: string | number
  /** 内容 */
  content?: React.ReactNode
  /** 角色 */
  role: 'user' | 'assistant'
  /** 时间戳 */
  timestamp?: number
  /** 隐藏角色 */
  hiddenRole?: boolean
  /** 底部工具栏 */
  footer?: React.ReactNode
}

export default function BubbleItem(props: BubbleItemProps) {
  return (
    <div
      className={classNames(
        'flex flex-col mt-4',
        props.role === 'user' ? 'items-end' : 'items-start',
        props.className
      )}
      style={props.style}
    >
      <div className={classNames('flex gap-3 w-full')}>
        <div className="w-10 h-10 flex-none">
          {props.role === 'assistant' && (
            <div className="rounded-full w-full h-full flex-none flex items-center justify-center bg-white">
              <i className="ri-robot-3-fill text-2xl text-indigo-500" />
            </div>
          )}
        </div>

        <div
          className={classNames(
            'flex-auto overflow-hidden flex flex-col',
            props.role === 'user' ? 'items-end' : 'items-start'
          )}
        >
          {props.content}
          {props.footer}
        </div>

        <div className="w-10 h-10 flex-none">
          {props.role === 'user' && (
            <div className="rounded-full w-full h-full flex-none flex items-center justify-center bg-indigo-600">
              <i className="ri-shield-user-fill text-2xl text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
