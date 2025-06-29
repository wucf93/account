import { DownFill } from 'antd-mobile-icons'
import { useMemo, useState } from 'react'
import Decimal from 'decimal.js'
import { DatePicker } from 'antd-mobile'
import dayjs from 'dayjs'

interface DataAnalysisProps {
  className?: string
  style?: React.CSSProperties
  totalIncome: number
  totalExpenditure: number
  dateValue: number
  onDataValueChange: (value: DataAnalysisProps['dateValue']) => void
}

export default function DataAnalysis({
  className,
  style,
  totalIncome,
  totalExpenditure,
  dateValue,
  onDataValueChange,
}: DataAnalysisProps) {
  const [visible, setVisible] = useState(false)
  const minus = useMemo(
    () => Decimal(totalIncome).minus(totalExpenditure).toNumber(),
    [totalExpenditure, totalIncome]
  )

  return (
    <div className={className} style={style}>
      <div className="mb-3">
        <div className="flex items-center" onClick={() => setVisible(true)}>
          <div className="text-sm text-gray-500 mr-1">
            {dayjs(dateValue).format('YYYY年MM月')}
          </div>
          <DownFill className="text-gray-500" fontSize={9} />
        </div>
        <DatePicker
          visible={visible}
          onClose={() => setVisible(false)}
          max={dayjs().toDate()}
          value={new Date(dateValue)}
          precision="month"
          onConfirm={(val) =>
            onDataValueChange(dayjs(val).startOf('month').valueOf())
          }
        />
      </div>
      <div className="flex justify-between">
        <div>
          <div className="text-xs text-gray-500 mb-1">收入</div>
          <div className="text-lg font-medium income">¥ {totalIncome}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">支出</div>
          <div className="text-lg font-medium expense">
            ¥ {totalExpenditure}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">结余</div>
          <div className="text-lg font-medium">¥ {minus}</div>
        </div>
      </div>
    </div>
  )
}
