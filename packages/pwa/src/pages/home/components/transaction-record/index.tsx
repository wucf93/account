import { TransactionEntity, transactionControllerRemove } from '@/apis'
import { useCallback, useMemo, useState, type FC } from 'react'
import groupBy from 'lodash/groupBy'
import dayjs from 'dayjs'
import Decimal from 'decimal.js'
import { ActionSheet, Toast } from 'antd-mobile'
import clsx from 'classnames'
import { useSetAtom } from 'jotai'
import { detailsPopupInfo, DetailsType } from '@/components/details-popup/atom'

export interface TransactionRecordProps {
  list: TransactionEntity[]
  className?: string
  style?: React.CSSProperties
  onReflush?: () => void
}

const TransactionRecord: FC<TransactionRecordProps> = ({
  list = [],
  ...props
}) => {
  const setInfo = useSetAtom(detailsPopupInfo)
  const [actionId, setActionId] = useState<TransactionEntity['id']>()
  const groupMap = useMemo(
    () =>
      groupBy(list, (item) =>
        dayjs(item.transactionDate).startOf('day').valueOf()
      ),
    [list]
  )

  const deleteHander = useCallback(() => {
    transactionControllerRemove({ path: { id: String(actionId!) } }).then(
      (res) => {
        if (res.data?.success) {
          setActionId(undefined)
          props.onReflush?.()
        } else {
          Toast.show({ content: res.data?.message || '删除失败' })
        }
      }
    )
  }, [actionId, props.onReflush])

  if (!list.length)
    return (
      <div
        className={clsx(props.className, 'text-center text-gray-400 mt-6')}
        style={props.style}
      >
        暂无数据，请选择月份查询
      </div>
    )

  return (
    <div className={props.className} style={props.style}>
      {Object.keys(groupMap)
        .sort((a, b) => Number(b) - Number(a))
        .map((item) => {
          const day = dayjs(Number(item))
          const total = groupMap[item].reduce(
            ([income, expenditure], cur) => {
              if (cur.transactionType === 'income') {
                income = Decimal(income).add(cur.amount).toNumber()
              } else {
                expenditure = Decimal(expenditure).add(cur.amount).toNumber()
              }
              return [income, expenditure]
            },
            [0, 0]
          )

          return (
            <div className="mb-4 bg-white rounded-xl shadow-xs px-3" key={item}>
              <div className="flex justify-between items-center pt-3 text-xs text-gray-600">
                <div>
                  {day.isSame(dayjs(), 'day')
                    ? '今天'
                    : day.isSame(dayjs().subtract(1, 'day'), 'day')
                      ? '昨天'
                      : day.format('MM-DD')}
                </div>
                <div>
                  {!!total[1] && <span>支出：{total[1].toFixed(2)}</span>}
                  {!!total[0] && (
                    <span className="ml-2">收入：{total[0].toFixed(2)}</span>
                  )}
                </div>
              </div>
              <div className="overflow-hidden">
                {groupMap[item].map((item2) => (
                  <div
                    key={item2.id}
                    className="flex items-center py-3 border-b border-gray-100"
                    onClick={() => setActionId(item2.id)}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg bg-${item2?.category?.color}-100 flex items-center justify-center mr-3`}
                    >
                      <i
                        className={`${item2?.category?.icon} text-${item2?.category?.color}-500 ri-lg`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div className="text-sm font-bold">
                          {item2?.category?.name}
                        </div>
                        <div
                          className={`flex items-center gap-0.5 font-bold text-${item2.transactionType === 'income' ? 'black' : 'indigo'}-500 text-sm`}
                        >
                          {(
                            Number(item2.amount) *
                            (item2.transactionType === 'income' ? 1 : -1)
                          ).toFixed(2)}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-xs text-gray-500">
                          {item2.description || item2?.category?.name}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

      <ActionSheet
        visible={!!actionId}
        cancelText="取消"
        actions={[
          {
            text: '修改',
            key: 'edit',
            onClick: () => {
              const selectInfo = list.find((item) => item.id === actionId)
              if (selectInfo) {
                setInfo((pre) => ({
                  ...pre,
                  visible: true,
                  id: selectInfo.id,
                  transactionType:
                    selectInfo.transactionType as unknown as DetailsType,
                  amount: String(selectInfo.amount),
                  transactionDate: dayjs(selectInfo.transactionDate),
                  categoryId: selectInfo.categoryId,
                  description: selectInfo.description || '',
                  onSuccess: props.onReflush,
                }))
              }
              setActionId(undefined)
            },
          },
          {
            text: '删除',
            key: 'delete',
            description: '删除后数据不可恢复',
            danger: true,
            bold: true,
            onClick: () => deleteHander(),
          },
        ]}
        onClose={() => setActionId(undefined)}
      />
    </div>
  )
}

export default TransactionRecord
