import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Page from '@/components/page'
import { useFilter } from './hooks'
import DataAnalysis from './components/data-analysis'
import QuickTools from './components/quick-tools'
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
    >
      {/* 数据统计 */}
      <DataAnalysis totalList={list} />

      {/* 快捷工具 */}
      <QuickTools />

      {/* 交易记录 */}
      <TransactionRecord list={filterList} />
      
      {/* 固定在右下角的添加按钮 */}
      <button
        className="fixed right-6 bottom-10 w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg transition-all duration-300 z-50"
        onClick={() => navigate('/transaction')}
      >
        <i className="ri-add-line text-xl" />
      </button>
    </Page>
  )
}
