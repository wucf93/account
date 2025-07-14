import classNames from 'classnames'
import './index.less'

interface MessageLoadingProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

export default function MessageLoading(props: MessageLoadingProps) {
  return (
    <div
      className={classNames(
        'p-0.5 message-loading rounded-lg overflow-hidden',
        props.className
      )}
      style={props.style}
    >
      <div className="bg-white rounded-md py-2 px-3">{props.children}</div>
    </div>
  )
}
