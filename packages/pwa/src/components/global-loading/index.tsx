import classnames from 'classnames'

export default function GlobalLoading() {
  return (
    <div
      className={classnames(
        'fixed inset-0 z-50 flex items-center justify-center'
      )}
    >
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium text-gray-800 dark:text-white">
          加载中...
        </p>
      </div>
    </div>
  )
}
