import classNames from 'classnames'
import { dayjs } from '@/lib'
import { useNavigate } from 'react-router-dom'
import type { Transaction } from '@/apis'

interface TransactionViewProps {
  className?: string
  style?: React.CSSProperties
  transaction: Transaction & { confidence?: number }
}

export default function TransactionView({
  transaction,
  ...props
}: TransactionViewProps) {
  const navigate = useNavigate()
  const confidence = transaction.confidence || 0

  // 计算置信度等级 - 与首页风格统一
  const getConfidenceClass = () => {
    if (confidence >= 90)
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
    if (confidence >= 70)
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100'
    if (confidence >= 50)
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
  }

  const getTransactionTypeClass = () => {
    return (transaction.transactionType || '') === 'expenditure'
      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
  }

  return (
    <div
      className={classNames(
        'rounded-lg global-bg-soft-color p-4 mt-4 shadow-md dark:shadow-lg transform transition-all duration-300',
        props.className
      )}
      style={props.style}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
            <i className="ri-check-circle-line text-green-600 dark:text-green-400 text-sm" />
          </div>
          <span>识别结果</span>
          <div
            className={`ml-3 px-2.5 py-1 rounded-full text-xs font-medium ${getConfidenceClass()}`}
          >
            置信度 {confidence.toFixed(1)}%
          </div>
        </h3>
      </div>

      <div className="divide-y divide-zinc-950/10 dark:divide-white/10">
        <div className="grid grid-cols-[auto_1fr] gap-4 py-3">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
            <i className="ri-money-cny-box-line mr-2 text-indigo-500" />
            金额
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ¥{transaction.amount || 0}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-4 py-3">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
            <i className="ri-arrow-up-down-line mr-2 text-indigo-500" />
            交易类型
          </div>
          <div className="text-right">
            <div
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getTransactionTypeClass()}`}
            >
              {(transaction.transactionType || '') === 'expenditure' ? (
                <>
                  <i className="ri-arrow-down-line mr-1" />
                  支出
                </>
              ) : (
                <>
                  <i className="ri-arrow-up-line mr-1" />
                  收入
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-4 py-3">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
            <i className="ri-calendar-line mr-2 text-indigo-500" />
            交易日期
          </div>
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200 text-right">
            {dayjs(transaction.transactionDate).format('YYYY-MM-DD')}
          </div>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-4 py-3">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
            <i className="ri-folder-line mr-2 text-indigo-500" />
            分类
          </div>
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200 text-right">
            {transaction.category?.name || '未分类'}
          </div>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-4 py-3">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
            <i className="ri-file-text-line mr-2 text-indigo-500" />
            描述
          </div>
          <div
            className="text-sm font-medium text-gray-800 dark:text-gray-200 text-right truncate max-w-full"
            title={transaction.description || ''}
          >
            {transaction.description || '无描述'}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow-md transition-all duration-200"
          onClick={() => navigate('/transaction')}
        >
          <i className="ri-edit-line mr-1" />
          修改账单
        </button>
      </div>
    </div>
  )
}
