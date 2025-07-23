import { TransactionEntity } from '@/apis'
import { useMemo, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import groupBy from 'lodash/groupBy'
import dayjs from 'dayjs'
import classnames from 'classnames'
import { formatNumber } from '@/utils'

export interface TransactionRecordProps {
  list: TransactionEntity[]
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
      <div className="mt-5 mb-3 text-xl font-bold">交易记录</div>

      {!list.length && (
        <div className={'px-2 flex flex-col items-center mt-12'}>
          <div className="font-bold text-lg mt-6">没有交易记录</div>
          <div className="mt-2 text-sm">
            开始记录您的收入和支出，以便更好地管理财务。
          </div>
          <div
            className="m-auto mt-6 inline-block px-4 py-2.5 rounded-full bg-gray-100 text-sm font-bold"
            onClick={() => navigate('/transaction')}
          >
            新增交易
          </div>
        </div>
      )}

      {Object.keys(groupMap)
        .sort((a, b) => Number(b) - Number(a))
        .map((item) => {
          const day = dayjs(Number(item))

          return (
            <div key={item}>
              <div className="mt-4 mb-2 font-bold text-lg">
                {day.isSame(dayjs(), 'day')
                  ? '今天'
                  : day.isSame(dayjs().subtract(1, 'day'), 'day')
                    ? '昨天'
                    : day.format('MM-DD')}
              </div>

              {groupMap[item].map((item2) => (
                <div key={item2.id} className="flex items-center py-3 gap-4">
                  <div
                    className={`flex-none w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center`}
                  >
                    <i className={`${item2?.category?.icon} text-2xl`} />
                  </div>

                  <div className="flex-auto overflow-hidden">
                    <div className="font-medium">{item2?.category?.name}</div>
                    <div className="text-sm text-gray-500 truncate">
                      {item2.description || item2?.category?.name}
                    </div>
                  </div>

                  <div className="flex-none">
                    <span className="mr-0.5">
                      {item2.transactionType === 'income' ? '+' : '-'}
                    </span>
                    <span>{formatNumber(Number(item2.amount))}</span>
                  </div>
                </div>
              ))}
            </div>
          )
        })}
    </div>
  )
}

export default TransactionRecord
