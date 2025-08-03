import classNames from 'classnames'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  loadingText?: string
}

export default function Button({
  children,
  loading,
  loadingText,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        'w-full py-3 rounded-lg font-medium transition-all duration-300 text-white',
        disabled || loading
          ? 'bg-indigo-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <i className="ri-loader-2-line animate-spin" />
          <span>识别中...</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}
