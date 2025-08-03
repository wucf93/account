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

  // 计算结余
  // const balance = totalIncome - totalExpenditure

  return (
    <div
      className={clss(
        'rounded-xl bg-white dark:bg-gray-800 shadow-lg overflow-hidden',
        props.className
      )}
      style={props.style}
    >
      <div className="grid grid-cols-2 divide-x divide-gray-100 dark:divide-gray-700">
        <div className="p-5 flex flex-col items-center justify-center bg-gradient-to-br from-green-200 to-transparent dark:from-green-900 dark:to-transparent">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            收入
          </div>
          <div className="mt-2 text-xl font-bold text-green-500">
            ¥ {formatNumber(totalIncome)}
          </div>
        </div>
        <div className="p-5 flex flex-col items-center justify-center bg-gradient-to-br from-red-200 to-transparent dark:from-red-900 dark:to-transparent">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            支出
          </div>
          <div className="mt-2 text-xl font-bold text-red-500">
            ¥ {formatNumber(totalExpenditure)}
          </div>
        </div>
        {/* <div className="p-6 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            结余
          </div>
          <div
            className={`mt-2 text-xl font-bold ${balance >= 0 ? 'text-blue-500' : 'text-orange-500'}`}
          >
            ¥ {formatNumber(balance)}
          </div>
        </div> */}
      </div>
    </div>
  )
}
