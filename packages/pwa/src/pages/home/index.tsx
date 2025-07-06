import { useMemo } from 'react'
import { FloatingBubble } from 'antd-mobile'
import { EditSFill } from 'antd-mobile-icons'
import { useSetAtom } from 'jotai'
import { detailsPopupInfo } from '../../components/details-popup/atom'
import DataAnalysis from './components/data-analysis'
import { globalStore } from '@/store'
import TransactionRecord from './components/transaction-record'
import Decimal from 'decimal.js'
import { useFilter, useShareImage } from './hooks'

export default function Home() {
  const setInfo = useSetAtom(detailsPopupInfo)
  const [file] = useShareImage()
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
    <div className="flex flex-col h-full overflow-hidden">
      <img
        className="m-4 relative flex-none"
        src={file ? URL.createObjectURL(file) : ''}
      />

      {/* 搜索项 */}
      <div className="m-4 relative flex-none">{filterRender}</div>

      {/* 本月统计 */}
      <DataAnalysis
        totalIncome={total[0]}
        totalExpenditure={total[1]}
        className="bg-white rounded-lg shadow-sm p-4 m-4 mt-0 flex-none"
      />

      {/* 交易记录 */}
      <TransactionRecord
        list={filterList}
        className="p-4 pt-0 grow overflow-y-auto"
        onReflush={() => reflush()}
      />

      {/* 详情弹窗 */}
      <FloatingBubble
        style={{
          '--initial-position-bottom': '108px',
          '--initial-position-right': '38px',
          '--edge-distance': '38px',
          '--z-index': '60',
        }}
      >
        <EditSFill
          fontSize={32}
          onClick={() =>
            setInfo((prev) => ({
              ...prev,
              visible: true,
              categoryId: globalStore.categoryConfigs?.[prev.type]?.[0]?.id,
              onSuccess: () => reflush(),
            }))
          }
        />
      </FloatingBubble>
    </div>
  )
}
