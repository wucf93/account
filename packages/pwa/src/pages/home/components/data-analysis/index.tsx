import clss from 'classnames'
import { Decimal } from 'decimal.js'
import { useMemo } from 'react'

interface DataAnalysisProps {
  className?: string
  style?: React.CSSProperties
  totalIncome: number
  totalExpenditure: number
}

export default function DataAnalysis({
  totalIncome,
  totalExpenditure,
  ...props
}: DataAnalysisProps) {
  const minus = useMemo(
    () => Decimal(totalIncome).minus(totalExpenditure).toNumber(),
    [totalExpenditure, totalIncome]
  )

  const totalIncomeRatio = useMemo(
    () =>
      (
        Decimal(Math.abs(totalIncome))
          .div(Decimal.add(Math.abs(totalIncome), Math.abs(totalExpenditure)))
          .toNumber() * 10
      ).toFixed(0),
    [totalExpenditure, totalIncome]
  )

  const expenditureRatio = useMemo(
    () =>
      (
        Decimal(Math.abs(totalExpenditure))
          .div(Decimal.add(Math.abs(totalIncome), Math.abs(totalExpenditure)))
          .toNumber() * 10
      ).toFixed(0),
    [totalExpenditure, totalIncome]
  )

  console.log(totalIncomeRatio);
  console.log(expenditureRatio);


  return (
    <div
      className={clss('bg-white p-4 rounded-lg', props.className)}
      style={props.style}
    >
      <div className=" text-gray-500">本月结余(元)</div>
      <div className="text-2xl font-sans font-semibold mt-1">
        {minus.toFixed(2)}
      </div>
      <div className="flex gap-3 items-center mt-3">
        <div className="text-xs text-gray-500 flex-none">本月支出(元)</div>
        <div className="flex-auto">
          <div className="relative h-2.5 w-36 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full w-${expenditureRatio}/10 bg-indigo-400 rounded-full`}
            />
          </div>
        </div>
        <div className="flex-none font-bold">
          {(totalExpenditure * -1).toFixed(2)}
        </div>
      </div>
      <div className="flex gap-3 items-center mt-1">
        <div className="text-xs text-gray-500 flex-none">本月收入(元)</div>
        <div className="flex-auto">
          <div className="relative h-2.5 w-36 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full w-${totalIncomeRatio}/10 bg-amber-400 rounded-full`}
            />
          </div>
        </div>
        <div className="flex-none font-bold text-indigo-500">
          {totalIncome.toFixed(2)}
        </div>
      </div>
    </div>
  )
}
