import { TransactionEntity } from '@/apis'
import { formatNumber } from '@/utils'
import clss from 'classnames'
import Decimal from 'decimal.js'
import { useMemo } from 'react'

interface DataAnalysisProps {
  className?: string
  style?: React.CSSProperties
  totalList?: TransactionEntity[]
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
      className={clss('m-4 rounded-xl border border-gray-200', props.className)}
      style={props.style}
    >
      <div className="flex">
        <div className="flex-1 p-6">
          <div>收入</div>
          <div className="mt-2 text-2xl font-bold">
            ¥ {formatNumber(totalIncome)}
          </div>
        </div>
        <div className="flex-1 p-6">
          <div>支出</div>
          <div className="mt-2 text-2xl font-bold">
            ¥ {formatNumber(totalExpenditure)}
          </div>
        </div>
      </div>
    </div>
  )
}
