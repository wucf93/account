import { getTransactionList } from '@/apis'
import { dayjs } from '@/lib'
import { useMemo, useState } from 'react'
import useSWR from 'swr'

export const useFilter = (dateValue: dayjs.Dayjs) => {
  const [keyword] = useState('')
  const [dateVisible, setDateVisible] = useState(false)
  // 月第一天
  const transactionDate = useMemo(() => {
    return dateValue.clone().tz('utc').startOf('month').valueOf()
  }, [dateValue])

  const {
    data: list = [],
    mutate,
    isLoading,
  } = useSWR(['/api/transaction/list', transactionDate], () =>
    getTransactionList({
      query: { transactionDate: transactionDate.toString() },
    })
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
      <div className="flex items-center justify-between text-white">
        <div className="text-lg font-bold" onClick={() => setDateVisible(true)}>
          <span>{dateValue.get('month') + 1}月账单</span>
          <i className="ri-arrow-down-s-fill ml-0.5"></i>
        </div>
      </div>
    ),
    [keyword, dateValue, dateVisible]
  )

  return { filterRender, list, isLoading, filterList, reflush: mutate }
}
