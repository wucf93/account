import classNames from 'classnames'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rounded?: boolean
  loading?: boolean
  loadingText?: string
}

export default function Button({
  children,
  loading,
  loadingText,
  disabled,
  className,
  rounded,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        'p-3 text-white flex items-center justify-center',
        disabled || loading
          ? 'bg-indigo-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
        rounded ? 'rounded-full w-12 h-12' : 'rounded-lg w-full',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-1">
          <i className="ri-loader-4-line animate-spin text-lg" />
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}
