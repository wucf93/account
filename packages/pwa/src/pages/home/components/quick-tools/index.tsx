import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { QUICK_TOOLS } from './config'

interface QuickToolsProps {
  className?: string
  style?: React.CSSProperties
}

export default function QuickTools(props: QuickToolsProps) {
  const navigate = useNavigate()

  return (
    <div
      className={classnames('py-4 grid grid-cols-4 gap-3', props.className)}
      style={props.style}
    >
      {QUICK_TOOLS.map((item) => (
        <button
          key={item.name}
          onClick={() => navigate(item.path)}
          className={classnames(
            'flex flex-col items-center justify-center py-3 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200',
            'hover:-translate-y-0.5',
            'border border-gray-100 dark:border-gray-700'
          )}
        >
          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center mb-2">
            <i
              className={classnames(
                item.icon,
                'text-lg text-indigo-600 dark:text-indigo-400'
              )}
            />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {item.name}
          </span>
        </button>
      ))}
    </div>
  )
}
