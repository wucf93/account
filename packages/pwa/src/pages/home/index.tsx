import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Page from '@/components/page'
import { useFilter } from './hooks'
import DataAnalysis from './components/data-analysis'
// import QuickTools from './components/quick-tools'
import TransactionRecord from './components/transaction-record'
import MonthPicker from '@/components/month-picker'
import { dayjs } from '@/lib'

export default function HomePage() {
  const [dateValue, setDateValue] = useState(dayjs.tz(dayjs(), 'utc'))
  const { filterList, list } = useFilter(dateValue)
  const navigate = useNavigate()

  return (
    <Page
      title={
        <MonthPicker value={dateValue} onChange={setDateValue}>
          <span>{dateValue.get('month') + 1}月账单</span>
          <i className="ri-arrow-down-s-fill ml-0.5 text-gray-500 dark:text-gray-400" />
        </MonthPicker>
      }
      titleExtra={
        <button
          className="w-8 h-8 rounded-sm bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-md transition-all duration-200"
          onClick={() => navigate('/transaction')}
        >
          <i className="ri-add-line" />
        </button>
      }
    >
      {/* 数据统计 */}
      <DataAnalysis totalList={list} />

      {/* 快捷工具 */}
      {/* <QuickTools /> */}

      <TransactionRecord list={filterList} />
    </Page>
  )
}
