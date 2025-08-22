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
        <MonthPicker value={dateValue} onChange={setDateValue}>
          <span>{dateValue.get('month') + 1}月账单</span>
          <i className="ri-arrow-down-s-fill ml-0.5 text-gray-500 dark:text-gray-400" />
        </MonthPicker>
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
        className="fixed right-6 bottom-10"
        rounded
        onClick={() => navigate('/transaction')}
      >
        <i className="ri-add-line text-xl" />
      </Button>
    </Page>
  )
}
