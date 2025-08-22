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
        'rounded-lg global-bg-soft-color overflow-hidden',
        props.className
      )}
      style={props.style}
    >
      <div className="grid grid-cols-2">
        <div className="p-5 flex flex-col">
          <div className="text-zinc-500 text-left">收入</div>
          <div className="mt-1 text-xl font-bold text-lime-400 font-mono text-left">
            {formatNumber(totalIncome)}
          </div>
        </div>

        <div className="p-5 flex flex-col">
          <div className="text-zinc-500 text-left">支出</div>
          <div className="mt-1 text-xl font-bold text-red-400 font-mono text-left">
            {formatNumber(totalExpenditure)}
          </div>
        </div>
      </div>
    </div>
  )
}
