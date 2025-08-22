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
    <div className={classnames(props.className)} style={props.style}>
      <div className="mt-0 mb-4 text-xl font-bold">交易记录</div>

      {!list.length && (
        <div
          className={
            'flex flex-col items-center justify-center py-12 rounded-lg global-bg-soft-color mt-4'
          }
        >
          <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
            <i className="ri-file-text-line text-2xl text-indigo-500 dark:text-indigo-400" />
          </div>
          <div className="font-bold text-lg">没有交易记录</div>
          <div className="mt-2 text-sm text-zinc-500 text-center max-w-xs px-4">
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

          return (
            <div
              key={item}
              className="mt-4 px-4 py-2 overflow-hidden rounded-lg global-bg-soft-color"
            >
              <div
                className={
                  'flex justify-between items-center pt-1 mb-1 font-mono'
                }
              >
                <div className={'text-lg font-bold'}>
                  {day.isSame(dayjs(), 'day')
                    ? '今天'
                    : day.isSame(dayjs().subtract(1, 'day'), 'day')
                      ? '昨天'
                      : day.format('MM-DD')}
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                  <span>
                    收入：
                    {formatNumber(
                      groupMap[item].reduce(
                        (pre, cur) =>
                          pre +
                          (cur.transactionType === 'income'
                            ? Number(cur.amount)
                            : 0),
                        0
                      )
                    )}
                  </span>
                  <span>
                    支出：
                    {formatNumber(
                      groupMap[item].reduce(
                        (pre, cur) =>
                          pre +
                          (cur.transactionType === 'expenditure'
                            ? Number(cur.amount)
                            : 0),
                        0
                      )
                    )}
                  </span>
                </div>
              </div>

              <div className="divide-y divide-zinc-950/10 dark:divide-white/10">
                {groupMap[item].map((item2) => (
                  <div
                    key={item2.id}
                    onClick={() => navigate(`/transaction/detail/${item2.id}`)}
                    className="w-full flex items-center py-3 gap-3"
                  >
                    <div
                      className={`flex-none w-10 h-10 rounded-md flex items-center justify-center ${item2.transactionType === 'income' ? 'bg-lime-400/10 dark:bg-lime-400/10' : 'bg-red-400/10 dark:bg-red-400/10'}`}
                    >
                      <i
                        className={`${item2?.category?.icon} text-xl ${item2.transactionType === 'income' ? 'text-lime-700 dark:text-lime-400' : 'text-red-700 dark:text-red-400'}`}
                      />
                    </div>

                    <div className="flex-auto overflow-hidden">
                      <div className="font-medium truncate">
                        {item2?.category?.name}
                      </div>
                      <div className="text-sm mt-1 text-zinc-500 truncate">
                        {item2.description || item2?.category?.name}
                      </div>
                    </div>

                    <div className="flex-none text-right font-mono text-sm font-semibold">
                      <span
                        className={`mr-0.5 ${item2.transactionType === 'income' ? 'text-green-500 dark:text-lime-400' : 'text-red-500 dark:text-red-400'}`}
                      >
                        {item2.transactionType === 'income' ? '+' : '-'}
                      </span>
                      <span>{formatNumber(Number(item2.amount))}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

      <div className="text-center text-zinc-500 text-xs mt-4">没有更多了</div>
    </div>
  )
}

export default TransactionRecord
