import classnames from 'classnames'

interface KeyPressProps {
  value: string
  transactionType: 'expenditure' | 'income'
  onChange?: (value: string) => void
  onDone?: () => void
  loading?: boolean
  style?: React.CSSProperties
  className?: string
}

export default function KeyPress({ value, loading, ...props }: KeyPressProps) {
  // 键盘组件的点击处理
  const handleKeyPress = (key: string) => {
    if (key === 'del') {
      props.onChange?.(value.slice(0, -1))
      return
    }

    if (key === '.') {
      // 确保只有一个小数点
      if (!value.includes('.')) {
        props.onChange?.(value ? value + '.' : '0.')
      }
      return
    }

    if (key >= '0' && key <= '9') {
      // 检查是否已经有小数点，并且小数点后已有两位数字
      const decimalIndex = value.indexOf('.')
      if (decimalIndex !== -1 && value.length - decimalIndex > 2) {
        // 已经有两位小数，不添加新数字
        return
      }
      props.onChange?.(value === '0' ? key : value + key)
    }
  }

  return (
    <div
      className={classnames(
        'grid grid-cols-4 grid-rows-4 gap-2',
        props.className
      )}
      style={props.style}
    >
      {/* 第一行 */}
      <button
        onClick={() => handleKeyPress('1')}
        className="w-full h-10 rounded-lg global-bg-soft-color flex items-center justify-center text-xl font-semibold"
      >
        1
      </button>
      <button
        onClick={() => handleKeyPress('2')}
        className="w-full h-10 rounded-lg global-bg-soft-color flex items-center justify-center text-xl font-semibold"
      >
        2
      </button>
      <button
        onClick={() => handleKeyPress('3')}
        className="w-full h-10 rounded-lg global-bg-soft-color flex items-center justify-center text-xl font-semibold"
      >
        3
      </button>
      <button
        onClick={() => handleKeyPress('del')}
        className="w-full h-10 rounded-lg global-bg-soft-color flex items-center justify-center text-lg font-semibold"
      >
        <i className="ri-delete-back-2-line" />
      </button>

      {/* 第二行 */}
      <button
        onClick={() => handleKeyPress('4')}
        className="w-full h-10 rounded-lg global-bg-soft-color flex items-center justify-center text-xl font-semibold"
      >
        4
      </button>
      <button
        onClick={() => handleKeyPress('5')}
        className="w-full h-10 rounded-lg global-bg-soft-color flex items-center justify-center text-xl font-semibold"
      >
        5
      </button>
      <button
        onClick={() => handleKeyPress('6')}
        className="w-full h-10 rounded-lg global-bg-soft-color flex items-center justify-center text-xl font-semibold"
      >
        6
      </button>
      <button
        onClick={props.onDone}
        disabled={!value || value === '0' || loading}
        className={classnames(
          'w-full h-full row-span-3 rounded-lg flex items-center justify-center text-lg font-semibold',
          props.transactionType === 'expenditure'
            ? 'bg-rose-500 text-white'
            : 'bg-green-500 text-white',
          {
            'opacity-50 cursor-not-allowed': !value || value === '0' || loading,
          }
        )}
      >
        {loading ? <i className="ri-loader-4-line animate-spin" /> : '完成'}
      </button>

      {/* 第三行 */}
      <button
        onClick={() => handleKeyPress('7')}
        className="w-full h-10 rounded-lg global-bg-soft-color flex items-center justify-center text-xl font-semibold"
      >
        7
      </button>
      <button
        onClick={() => handleKeyPress('8')}
        className="w-full h-10 rounded-lg global-bg-soft-color flex items-center justify-center text-xl font-semibold"
      >
        8
      </button>
      <button
        onClick={() => handleKeyPress('9')}
        className="w-full h-10 rounded-lg global-bg-soft-color flex items-center justify-center text-xl font-semibold"
      >
        9
      </button>

      {/* 第四行 */}
      <button
        onClick={() => handleKeyPress('0')}
        className="col-span-2 w-full h-10 rounded-lg global-bg-soft-color flex items-center justify-center text-xl font-semibold"
      >
        0
      </button>
      <button
        onClick={() => handleKeyPress('.')}
        className="w-full h-10 rounded-lg global-bg-soft-color flex items-center justify-center text-xl font-semibold"
      >
        .
      </button>
    </div>
  )
}
