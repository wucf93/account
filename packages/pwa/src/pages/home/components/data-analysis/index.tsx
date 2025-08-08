import { Transaction } from '@/apis/types.gen'
import { formatNumber } from '@/utils'
import clss from 'classnames'
import Decimal from 'decimal.js'
import { useMemo } from 'react'

interface DataAnalysisProps {
  className?: string
  style?: React.CSSProperties
  totalList?: Transaction[]
}

export default function DataAnalysis(props: DataAnalysisProps) {
  // 月统计数据
  const [totalIncome, totalExpenditure] = useMemo(
    () =>
      props.totalList?.reduce(
        ([income, expenditure], cur) => {
          if (cur.transactionType === 'income') {
            income = Decimal(income).add(cur.amount).toNumber()
          } else {
            expenditure = Decimal(expenditure).add(cur.amount).toNumber()
          }
          return [income, expenditure]
        },
        [0, 0]
      ) || [0, 0],
    [props.totalList]
  )

  return (
    <div
      className={clss(
        'rounded-lg global-bg-soft-color shadow-lg overflow-hidden',
        props.className
      )}
      style={props.style}
    >
      <div className="grid grid-cols-2">
        <div className="p-5 flex flex-col items-center justify-center">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            收入
          </div>
          <div className="mt-2 text-xl font-bold text-green-500">
            ¥ {formatNumber(totalIncome)}
          </div>
        </div>
        <div className="p-5 flex flex-col items-center justify-center">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            支出
          </div>
          <div className="mt-2 text-xl font-bold text-red-500">
            ¥ {formatNumber(totalExpenditure)}
          </div>
        </div>
      </div>
    </div>
  )
}
