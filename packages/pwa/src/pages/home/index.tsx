import { useMemo } from 'react'
import DataAnalysis from './components/data-analysis'
import { useFilter } from './hooks'
import { globalStore } from '@/store'
import { Decimal } from 'decimal.js'
import { useSetAtom } from 'jotai'
import TransactionRecord from './components/transaction-record'
import { detailsPopupInfo } from '@/components/details-popup/atom'

export default function HomePage() {
  const setInfo = useSetAtom(detailsPopupInfo)
  const { filterList, list, filterRender, reflush } = useFilter()

  // 月统计数据
  const total = useMemo(
    () =>
      list?.reduce(
        ([income, expenditure], cur) => {
          if (cur.transactionType === 'income') {
            income = Decimal(income).add(cur.amount).toNumber()
          } else {
            expenditure = Decimal(expenditure).add(cur.amount).toNumber()
          }
          return [income, expenditure]
        },
        [0, 0]
      ),
    [list]
  )

  return (
    <div>
      {/* top */}
      <div className="p-4 bg-gradient-to-b from-indigo-500 to-gray-100">
        {filterRender}
        <DataAnalysis
          className="mt-4"
          totalIncome={total[0]}
          totalExpenditure={total[1]}
        />
      </div>

      <TransactionRecord
        list={filterList}
        className="px-4"
        onAdd={() =>
          setInfo((prev) => ({
            ...prev,
            visible: true,
            categoryId: globalStore.categoryConfigs?.[prev.type]?.[0]?.id,
            onSuccess: () => reflush(),
          }))
        }
        onReflush={reflush}
      />
    </div>
  )
}
