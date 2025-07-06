import { transactionControllerFindAll } from '@/apis'
import { DatePicker } from 'antd-mobile'
import { SearchOutline } from 'antd-mobile-icons'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
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
      <>
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
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">2025年6月</div>
          <div className="flex items-center space-x-2">
            <div
              className="px-3 py-1 bg-white rounded-full text-xs shadow-sm flex items-center cursor-pointer"
              onClick={() => setDateVisible(true)}
            >
              <span>
                {dateValue.isSame(dayjs(), 'month')
                  ? '本'
                  : dateValue.get('month') + 1}
                月
              </span>
              <i className="ri-arrow-down-s-line ml-1"></i>
            </div>

            {/* <div
              onClick={() => setDateVisible(true)}
              className="w-7 h-7 flex items-center justify-center bg-white rounded-full shadow-sm cursor-pointer"
            >
              <i className="ri-calendar-line"></i>
            </div> */}
          </div>
          <DatePicker
            title="查询日期"
            visible={dateVisible}
            onClose={() => setDateVisible(false)}
            max={dayjs().toDate()}
            value={dateValue.toDate()}
            precision="month"
            onConfirm={(val) => setDateValue(dayjs(val))}
            renderLabel={(type: string, data: number) => {
              switch (type) {
                case 'year':
                  return data + '年'
                case 'month':
                  return data + '月'
                case 'day':
                  return data + '日'
                default:
                  return data
              }
            }}
          />
          {/* <CalendarPicker
            visible={visible1}
            selectionMode="single"
            defaultValue={singleDate}
            onClose={() => setVisible1(false)}
            onMaskClick={() => setVisible1(false)}
          /> */}
        </div>
      </>
    ),
    [keyword, dateValue, dateVisible]
  )

  return { filterRender, list, filterList, reflush: mutate }
}

export const useShareImage = () => {
  const [file, setFile] = useState<File>()

  useEffect(() => {
    const onmessage = (event: MessageEvent) => {
      if (event.data.action !== 'load-image') return
      setFile(event.data.file)
    }
    navigator.serviceWorker.addEventListener('message', onmessage)

    return () => {
      navigator.serviceWorker.removeEventListener('message', onmessage)
    }
  }, [])

  return [file]
}
