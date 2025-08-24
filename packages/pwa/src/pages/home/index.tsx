import { useState } from 'react'
import Page from '@/components/page'
import { useFilter } from './hooks'
import DataAnalysis from './components/data-analysis'
import TransactionRecord from './components/transaction-record'
import DatePicker from '@/components/date-picker'
import { dayjs } from '@/lib'
import Button from '@/components/button'
import TransactionDialog from '@/components/transaction-dialog'

export default function HomePage() {
  const [transactionDialogOpen, setTransactionDialogOpen] = useState(false)
  const [dateValue, setDateValue] = useState(dayjs.tz(dayjs(), 'utc'))
  const { filterList, list, isLoading, reflush } = useFilter(dateValue)

  return (
    <Page
      title={
        <div className="flex items-center justify-between">
          <DatePicker type="month" value={dateValue} onChange={setDateValue}>
            {dateValue.format('YY年MM月')}
          </DatePicker>
          <div className="flex space-x-0.5 ml-1.5 font-normal text-zinc-500">
            <button
              onClick={() => setDateValue(dateValue.subtract(1, 'month'))}
            >
              <i className="ri-arrow-left-s-line" />
            </button>
            <button onClick={() => setDateValue(dateValue.add(1, 'month'))}>
              <i className="ri-arrow-right-s-line" />
            </button>
          </div>
        </div>
      }
      titleExtra={
        <button className="global-bg-soft-color px-1.5 py-1 rounded-md text-xs">
          收支日历
        </button>
      }
    >
      {/* 数据统计 */}
      <DataAnalysis totalList={list} />

      {/* 快捷工具 */}
      {/* <QuickTools /> */}

      {/* 交易记录 */}
      <TransactionRecord
        list={filterList}
        isLoading={isLoading}
        className="mt-6"
      />

      {/* 使用useTransactionDialog的添加按钮 */}
      <div className="fixed right-6 bottom-10">
        <Button rounded onClick={() => setTransactionDialogOpen(true)}>
          <i className="ri-add-line text-2xl" />
        </Button>
      </div>

      {/* 交易弹窗 */}
      <TransactionDialog
        open={transactionDialogOpen}
        onClose={(status) => {
          setTransactionDialogOpen(false)
          status && reflush()
        }}
      />
    </Page>
  )
}
