import clsx from 'classnames'
import ImageTool from './components/image-tool'

interface QuickToolsProps {
  className?: string
  style?: React.CSSProperties
  onReflush?: () => void
}

export default function QuickTools(porps: QuickToolsProps) {
  return (
    <div
      className={clsx('flex items-center gap-5', porps.className)}
      style={porps.style}
    >
      {/* 图片识别工具 */}
      <ImageTool onSaveHander={porps.onReflush} />

      <div className="flex flex-col justify-center">
        <div className="w-12 h-12 flex items-center justify-center bg-indigo-200 rounded-xl shadow-2xl">
          <i className="ri-robot-3-fill text-3xl text-indigo-500" />
        </div>
        <span className="text-xs mt-1.5 text-gray-500">定时记账</span>
      </div>
    </div>
  )
}
