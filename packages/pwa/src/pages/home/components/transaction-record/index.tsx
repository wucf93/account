import { Transaction } from '@/apis/types.gen'
import { useMemo, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import groupBy from 'lodash/groupBy'
import dayjs from 'dayjs'
import classnames from 'classnames'
import { formatNumber } from '@/utils'


export interface TransactionRecordProps {
  list: Transaction[]
  className?: string
  style?: React.CSSProperties
  onReflush?: () => void
}


const TransactionRecord: FC<TransactionRecordProps> = ({
  list = [],
  ...props
}) => {
  const navigate = useNavigate()

  const groupMap = useMemo(
    () =>
      groupBy(list, (item) =>
        dayjs(item.transactionDate).startOf('day').valueOf()
      ),
    [list]
  )

  return (
    <div className={classnames('px-4', props.className)} style={props.style}>
      <div className="mt-5 mb-4 text-xl font-bold text-gray-800 dark:text-white">交易记录</div>

      {!list.length && (
        <div className={'flex flex-col items-center justify-center py-12 rounded-2xl bg-gray-50 dark:bg-gray-800/50 mt-4'}>
          <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
            <i className="ri-file-text-line text-2xl text-indigo-500 dark:text-indigo-400" />
          </div>
          <div className="font-bold text-lg text-gray-800 dark:text-white">没有交易记录</div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs px-4">
            开始记录您的收入和支出，以便更好地管理财务。
          </div>
          <button
            className="mt-6 px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow-md transition-all duration-200"
            onClick={() => navigate('/transaction')}
          >
            新增交易
          </button>
        </div>
      )}

      {Object.keys(groupMap)
        .sort((a, b) => Number(b) - Number(a))
        .map((item) => {
          const day = dayjs(Number(item))
          const isTodayOrYesterday = day.isSame(dayjs(), 'day') || day.isSame(dayjs().subtract(1, 'day'), 'day')

          return (
            <div key={item} className="mt-5">
              <div className={`text-lg font-bold ${isTodayOrYesterday ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`}>
                {day.isSame(dayjs(), 'day')
                  ? '今天'
                  : day.isSame(dayjs().subtract(1, 'day'), 'day')
                    ? '昨天'
                    : day.format('MM-DD')}
              </div>

              {groupMap[item].map((item2) => (
                <button
                  key={item2.id}
                  onClick={() => navigate(`/transaction/detail/${item2.id}`)}
                  className="w-full flex items-center py-3 px-4 gap-4 mt-2 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700"
                >
                  <div
                    className={`flex-none w-12 h-12 rounded-lg flex items-center justify-center ${item2.transactionType === 'income' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}
                  >
                    <i className={`${item2?.category?.icon} text-xl ${item2.transactionType === 'income' ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`} />
                  </div>

                  <div className="flex-auto overflow-hidden">
                    <div className="font-medium text-gray-800 dark:text-white">{item2?.category?.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {item2.description || item2?.category?.name}
                    </div>
                  </div>

                  <div className="flex-none text-right">
                    <span className={`mr-0.5 ${item2.transactionType === 'income' ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                      {item2.transactionType === 'income' ? '+' : '-'}
                    </span>
                    <span className="font-medium text-gray-800 dark:text-white">{formatNumber(Number(item2.amount))}</span>
                  </div>
                </button>
              ))}
            </div>
          )
        })}
    </div>
  )
}

export default TransactionRecord
