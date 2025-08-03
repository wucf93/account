import classNames from 'classnames'
import { dayjs } from '@/lib'
import { useNavigate } from 'react-router-dom'
import type { Transaction } from '@/apis'

interface TransactionViewProps {
  className?: string
  style?: React.CSSProperties
  transaction: Transaction
}

export default function TransactionView({
  transaction,
  ...props
}: TransactionViewProps) {
  const navigate = useNavigate()

  return (
    <div
      className={classNames(
        'rounded-xl bg-white shadow-lg dark:bg-gray-900 p-5 mt-5 transform transition-all duration-300 hover:shadow-xl',
        props.className
      )}
      style={props.style}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center">
          <i className="ri-shield-check-line text-blue-500 mr-1.5" />
          <span>识别结果</span>
        </h3>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-5">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800 grid grid-cols-[1fr_3fr] gap-4">
          <div className="text-gray-500 dark:text-gray-400 mb-1">金额</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white justify-self-end">
            {transaction.amount || 0}
          </div>

          <div className="text-gray-500 dark:text-gray-400 mb-1">交易类型</div>
          <div className="justify-self-end">
            <div
              className={`font-medium px-2 py-0.5 rounded-full text-xs ${(transaction.transactionType || '') === 'expenditure' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'}`}
            >
              {(transaction.transactionType || '') === 'expenditure'
                ? '支出'
                : '收入'}
            </div>
          </div>

          <div className="text-gray-500 dark:text-gray-400 mb-1">交易日期</div>
          <div className="font-medium text-gray-800 dark:text-gray-200 justify-self-end">
            {dayjs(transaction.transactionDate).format('YYYY-MM-DD')}
          </div>

          <div className="text-gray-500 dark:text-gray-400 mb-1">分类ID</div>
          <div className="font-medium text-gray-800 dark:text-gray-200 justify-self-end">
            {transaction.category?.name}
          </div>

          <div className="text-gray-500 dark:text-gray-400 mb-1">描述</div>
          <div
            className="font-medium text-gray-800 dark:text-gray-200 truncate max-w-full justify-self-end"
            title={transaction.description || ''}
          >
            {transaction.description || '无描述'}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="text-blue-500 hover:text-blue-600 hover:underline font-medium transition-colors duration-200 focus:outline-none"
          onClick={() => navigate('/transaction')}
        >
          修改账单
        </button>
      </div>
    </div>
  )
}
