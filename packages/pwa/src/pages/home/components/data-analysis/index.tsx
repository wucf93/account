import { useMemo } from 'react'
import Decimal from 'decimal.js'

interface DataAnalysisProps {
  className?: string
  style?: React.CSSProperties
  totalIncome: number
  totalExpenditure: number
}

export default function DataAnalysis({
  className,
  style,
  totalIncome,
  totalExpenditure,
}: DataAnalysisProps) {
  const minus = useMemo(
    () => Decimal(totalIncome).minus(totalExpenditure).toNumber(),
    [totalExpenditure, totalIncome]
  )

  return (
    <div className={className} style={style}>
      <div className="mb-3">
        <div className="flex items-center">
          <div className="text-sm text-gray-500 mr-1">收支明细</div>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <div className="text-xs text-gray-500 mb-1">收入</div>
          <div className="text-lg font-medium text-green-500">
            ¥ {totalIncome.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">支出</div>
          <div className="text-lg font-medium text-red-500">
            ¥ {totalExpenditure.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">结余</div>
          <div className="text-lg font-medium">¥ {minus.toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}
