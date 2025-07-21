import clsx from 'classnames'
import { useNavigate } from 'react-router-dom'
import classnames from 'classnames'
import { QUICK_TOOLS } from './config'

interface QuickToolsProps {
  className?: string
  style?: React.CSSProperties
}

export default function QuickTools(porps: QuickToolsProps) {
  const navigate = useNavigate()

  return (
    <div
      className={clsx('px-4 py-3 grid grid-cols-3 gap-3', porps.className)}
      style={porps.style}
    >
      {QUICK_TOOLS.map((item) => (
        <div
          key={item.name}
          className={clsx(
            'h-8 flex items-center justify-center gap-2 rounded-full p-2 bg-gray-100'
          )}
        >
          <i className={classnames(item.icon, 'text-xl')} />
          <span className="text-sm">{item.name}</span>
        </div>
      ))}
    </div>
  )
}
