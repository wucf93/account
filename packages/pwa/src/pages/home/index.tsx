import Page from '@/components/page'
import { useFilter } from './hooks'
import DataAnalysis from './components/data-analysis'
import QuickTools from './components/quick-tools'
import TransactionRecord from './components/transaction-record'
import MonthPicker from '@/components/month-picker'
import { useState } from 'react'
import dayjs from 'dayjs'

export default function HomePage() {
  const [dateValue, setDateValue] = useState(dayjs())
  const { filterList, list } = useFilter(dateValue)

  return (
    <Page
      title={
        <MonthPicker value={dateValue} onChange={setDateValue}>
          <span>{dateValue.get('month') + 1}月账单</span>
          <i className="ri-arrow-down-s-fill ml-0.5" />
        </MonthPicker>
      }
      titleExtra={<i className="ri-add-large-line text-2xl" />}
    >
      {/* 数据统计 */}
      <DataAnalysis totalList={list} />

      {/* 快捷工具 */}
      <QuickTools />

      <TransactionRecord list={filterList} />
    </Page>
  )
}
