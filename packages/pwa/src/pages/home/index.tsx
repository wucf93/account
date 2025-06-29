import { useMemo, useState } from 'react'
import { FloatingBubble } from 'antd-mobile'
import { EditSFill, SearchOutline } from 'antd-mobile-icons'
import { useSetAtom } from 'jotai'
import { detailsPopupInfo } from '../../components/details-popup/atom'
import DataAnalysis from './components/data-analysis'
import { globalStore } from '@/store'
import TransactionRecord from './components/transaction-record'
import { getTransactionListRoute } from '@/apis/Transaction'
import useSWR from 'swr'
import Decimal from 'decimal.js'
import dayjs from 'dayjs'

export default function Home() {
  const [keyword, setKeyword] = useState('')
  const setInfo = useSetAtom(detailsPopupInfo)
  const [dateValue, setDateValue] = useState(dayjs().startOf('month').valueOf())

  const { data: list = [], mutate } = useSWR(
    ['/api/transaction/list', dateValue],
    () =>
      getTransactionListRoute({ transactionDate: dateValue })
        .then((res) => res.data.result || [])
        .catch(() => [])
  )

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

  const resultList = useMemo(
    () =>
      list.filter(
        (item) =>
          !keyword ||
          item.category?.name?.includes(keyword) ||
          item.description?.includes(keyword)
      ),
    [list, keyword]
  )

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* 搜索栏 */}
      <div className="m-4 relative flex-none">
        <div className="relative">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="搜索交易记录"
            className="w-full h-10 pl-10 pr-3 rounded-full bg-gray-100 border-none text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
            <SearchOutline fontSize={18} />
          </div>
        </div>
      </div>

      {/* 本月统计 */}
      <DataAnalysis
        dateValue={dateValue}
        onDataValueChange={setDateValue}
        totalIncome={total[0]}
        totalExpenditure={total[1]}
        className="bg-white rounded-lg shadow-sm p-4 m-4 mt-0 flex-none"
      />

      {/* 交易记录 */}
      <TransactionRecord
        list={resultList}
        className="p-4 pt-0 grow overflow-y-auto"
        onReflush={() => mutate()}
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
              onSuccess: () => mutate(),
            }))
          }
        />
      </FloatingBubble>
    </div>
  )
}
