import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Page from '@/components/page'
import { useFilter } from './hooks'
import DataAnalysis from './components/data-analysis'
import QuickTools from './components/quick-tools'
import TransactionRecord from './components/transaction-record'
import MonthPicker from '@/components/month-picker'
import { dayjs } from '@/lib'
import Button from '@/components/button'

export default function HomePage() {
  const [dateValue, setDateValue] = useState(dayjs.tz(dayjs(), 'utc'))
  const { filterList, list, isLoading } = useFilter(dateValue)
  const navigate = useNavigate()

  return (
    <Page
      title={
        <div className="flex items-center justify-between">
          <MonthPicker value={dateValue} onChange={setDateValue}>
            {dateValue.format('YY年MM月')}
          </MonthPicker>
          <div className="flex space-x-0.5 ml-1.5 font-normal">
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
      <QuickTools />

      {/* 交易记录 */}
      <TransactionRecord list={filterList} isLoading={isLoading} />

      {/* 固定在右下角的添加按钮 */}
      <Button
        rounded
        className="fixed right-6 bottom-10"
        onClick={() => navigate('/transaction')}
      >
        <i className="ri-add-line text-xl" />
      </Button>
    </Page>
  )
}
