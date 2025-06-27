import { getListTransaction } from '@/apis/Transaction'
import {
  useCallback,
  useMemo,
  useState,
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react'
import groupBy from 'lodash/groupBy'
import dayjs from 'dayjs'
import { useGlobalStore, type CategoryType } from '@/store'

type TransactionType = Awaited<
  ReturnType<typeof getListTransaction>
>['data']['result'][number]

export interface TransactionRecordProps {
  className?: string
  style?: React.CSSProperties
}

export interface TransactionRecordRefProps {
  getData: (props: { reset: boolean }) => void
}

const TransactionRecord: ForwardRefRenderFunction<
  TransactionRecordRefProps,
  TransactionRecordProps
> = (props, ref) => {
  const [current, setCurrent] = useState(1)
  const [list, setList] = useState<TransactionType[]>([])
  const { categoryConfigs } = useGlobalStore()

  const categoryMap = useMemo(() => {
    const map = new Map<number, CategoryType>()
    categoryConfigs.income.forEach((item) => {
      map.set(item.category_id, item)
    })
    categoryConfigs.expenditure.forEach((item) => {
      map.set(item.category_id, item)
    })
    return map
  }, [categoryConfigs])

  const getData = useCallback(
    (props: { reset: boolean }) => {
      const page = props.reset ? 1 : current
      getListTransaction({ page, per_page: 30 }).then((res) => {
        setCurrent(page)
        if (props.reset) {
          setList(res.data.result || [])
        } else {
          setList((pre) => [...pre, ...(res.data.result || [])])
        }
      })
    },
    [current]
  )

  useImperativeHandle(ref, () => ({ getData }), [getData])

  const groupMap = useMemo(
    () =>
      groupBy(list, (item) =>
        dayjs(item.transaction_date).startOf('day').valueOf()
      ),
    [list]
  )

  return (
    <div className={props.className} style={props.style}>
      {Object.keys(groupMap)
        .sort((a, b) => Number(b) - Number(a))
        .map((item) => {
          const day = dayjs(Number(item))
          const total = groupMap[item].reduce(
            ([income, expenditure], cur) => {
              if (cur.transaction_type === 'income') {
                income = income + cur.amount
              } else {
                expenditure = expenditure + cur.amount
              }
              return [income, expenditure]
            },
            [0, 0]
          )

          return (
            <div className="mb-4" key={item}>
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium">
                  {day.isSame(dayjs(), 'day')
                    ? '今天'
                    : day.isSame(dayjs().subtract(1, 'day'), 'day')
                      ? '昨天'
                      : day.format('MM-DD')}
                </div>
                <div className="text-xs text-gray-500">
                  <span className="mr-2">支出 ¥{total[1]}</span>
                  <span>收入 ¥{total[0]}</span>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {groupMap[item].map((item2) => {
                  const category = categoryMap.get(item2.category_id)

                  return (
                    <div
                      key={item2.transaction_id}
                      className="flex items-center p-4 border-b border-gray-100"
                    >
                      <div
                        className={`w-10 h-10 rounded-full bg-${category?.color}-100 flex items-center justify-center mr-3`}
                      >
                        <i
                          className={`${category?.icon} text-${category?.color}-500 ri-lg`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div className="font-medium">{category?.name}</div>
                          <div>
                            {item2.transaction_type === 'income' ? '+' : '-'}
                            {item2.amount}元
                          </div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <div className="text-xs text-gray-500">
                            {item2.description || category?.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {dayjs(item2.transaction_date).format('HH:mm')}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default forwardRef(TransactionRecord)
