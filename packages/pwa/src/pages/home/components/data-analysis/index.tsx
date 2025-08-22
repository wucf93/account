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
  const balance = Decimal(totalIncome).sub(totalExpenditure).toNumber()

  return (
    <div
      className={clss(
        'rounded-lg global-bg-soft-color p-4 overflow-hidden',
        props.className
      )}
      style={props.style}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <i className="ri-wallet-3-fill text-red-400 mr-2"></i>
          <span className="text-zinc-500 text-sm">总支出</span>
          {/* <i className="ri-refresh-cw-line text-zinc-500 ml-2 text-xs cursor-pointer" /> */}
        </div>
        {/* <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-amber-400"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
        </div> */}
      </div>

      <div className="flex items-baseline justify-between mb-3">
        <div className="text-3xl font-bold font-mono">
          {formatNumber(totalExpenditure)}
        </div>
      </div>

      <div className="flex justify-between text-sm">
        <div className="flex items-center">
          <i className="ri-arrow-down-right-line text-gray-400 mr-1"></i>
          <span className="text-zinc-500">总收入</span>
          <span className="text-lime-600 font-mono ml-1 font-semibold">
            {formatNumber(totalIncome)}
          </span>
        </div>
        <div className="flex items-center">
          <i className="ri-arrow-down-up-line text-gray-400 mr-1"></i>
          <span className="text-zinc-500">月结余</span>
          <span className={clss('font-mono ml-1 text-red-500 font-semibold')}>
            {formatNumber(balance)}
          </span>
        </div>
      </div>
    </div>
  )
}
