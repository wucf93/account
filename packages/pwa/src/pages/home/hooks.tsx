import { transactionControllerFindAll } from '@/apis'
import { DatePicker } from 'antd-mobile'
import { SearchOutline } from 'antd-mobile-icons'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import useSWR from 'swr'

export const useFilter = () => {
  const [keyword, setKeyword] = useState('')
  const [dateValue, setDateValue] = useState(dayjs())
  const [dateVisible, setDateVisible] = useState(false)
  // 月第一天
  const transactionDate = useMemo(
    () => dateValue.startOf('month').startOf('month').valueOf(),
    [dateValue]
  )

  const { data: list = [], mutate } = useSWR(
    ['/api/transaction/list', transactionDate],
    () =>
      transactionControllerFindAll({ query: { transactionDate } })
        .then((res) => res.data?.data || [])
        .catch(() => [])
  )

  const filterList = useMemo(
    () =>
      list.filter(
        (item) =>
          !keyword ||
          item.category?.name?.includes(keyword) ||
          item.description?.includes(keyword)
      ),
    [list, keyword]
  )

  const filterRender = useMemo(
    () => (
      <div className="flex font items-center justify-between text-white">
        <div className="text-base">{dateValue.get('month') + 1}月账单</div>
        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20">
          <i className="ri-calendar-line"></i>
        </div>
      </div>
    ),
    [keyword, dateValue, dateVisible]
  )

  return { filterRender, list, filterList, reflush: mutate }
}
