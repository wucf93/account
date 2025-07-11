import { useMemo } from 'react'
import DataAnalysis from './components/data-analysis'
import { useFilter } from './hooks'
import { globalStore } from '@/store'
import { Decimal } from 'decimal.js'
import { useSetAtom } from 'jotai'
import TransactionRecord from './components/transaction-record'
import { detailsPopupInfo } from '@/components/details-popup/atom'
import QuickTools from './components/quick-tools'

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
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-none bg-gradient-to-b p-4 from-indigo-500 via-gray-100 to-gray-100">
        {/* 各种筛选 */}
        {filterRender}

        {/* 数据分析 */}
        <DataAnalysis
          totalIncome={total[0]}
          totalExpenditure={total[1]}
          className="mt-4"
        />

        {/* 工具 */}
        <QuickTools className="mt-4" />

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm font-bold">收支记录</div>
          <div
            onClick={() =>
              setInfo((prev) => ({
                ...prev,
                visible: true,
                categoryId: globalStore.categoryConfigs?.[prev.type]?.[0]?.id,
                onSuccess: () => reflush(),
              }))
            }
            className="h-7 flex items-center gap-1 text-xs rounded-full bg-indigo-500 px-3 text-white"
          >
            <i className="ri-pencil-line text-base" />
            <span>记一笔</span>
          </div>
        </div>
      </div>

      {/* 记录 */}
      <TransactionRecord
        list={filterList}
        className="px-4 flex-auto overflow-y-auto"
        onReflush={reflush}
      />
    </div>
  )
}
