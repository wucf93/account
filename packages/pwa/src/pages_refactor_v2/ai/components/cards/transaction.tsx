import { useCallback, useMemo } from 'react'
import { GenTransactionEntity, transactionControllerCreate } from '@/apis'
import omit from 'lodash/omit'
import { Toast } from 'antd-mobile'
import { CardRenderType } from './type'
import classNames from 'classnames'
import dayjs from 'dayjs'

export function TransactionContentRender(props: CardRenderType) {
  const extraJSON = useMemo(() => {
    let data = { save: false, remove: false, edit: false }
    try {
      data = { ...data, ...JSON.parse(props.message.extra || '{}') }
    } catch (error) {
      console.log(error)
    }
    return data
  }, [props.message.extra])

  const onOperateHandler = useCallback(
    (type: 'save' | 'edit' | 'remove') => {
      if (type === 'save') {
        try {
          const info: GenTransactionEntity = JSON.parse(props.message.content)
          transactionControllerCreate({
            body: omit(info, 'categoryName'),
          }).then((res) => {
            if (res.data?.success) {
              props.modifyMessages((pre) => {
                const cloneList = [...pre]
                const last = cloneList.pop()
                if (last) {
                  last.extra = JSON.stringify({
                    ...JSON.parse(last?.extra || '{}'),
                    save: false,
                  })
                }
                console.log(3333)
                return last ? [...cloneList, last] : pre
              })
              Toast.show('保存成功')
            } else {
              Toast.show(res.data?.message || '保存失败')
            }
          })
        } catch (error) {
          console.log(error)
        }
      } else if (type === 'remove') {
        props.modifyMessages((pre) =>
          pre.filter((item) => item.id !== props.message.id)
        )
      }
    },
    [props.message, props.modifyMessages]
  )

  const transaction = useMemo<GenTransactionEntity>(() => {
    try {
      return JSON.parse(props.message.content) || {}
    } catch (error) {
      return {}
    }
  }, [props.message.content])

  return (
    <>
      <div
        className={classNames(
          'rounded-lg inline-block py-3 px-4 text-sm max-w-full overflow-hidden break-all w-full',
          props.message.role === 'user'
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-black'
        )}
      >
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-600">
            识别到一笔
            {transaction.transactionType === 'income' ? '收入' : '支出'}
          </div>
          <div className="text-xs text-gray-500">
            {dayjs(transaction.transactionDate).format('YYYY-MM-DD')}
          </div>
        </div>
        <div className="h-[0.5px] w-full my-2 bg-gray-300" />
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs">{transaction.categoryName}</div>
            <div className="text-xs text-gray-400 mt-1">
              {transaction.description || transaction.categoryName}
            </div>
          </div>
          <div className="text-indigo-500">
            {(
              transaction.amount *
              (transaction.transactionType === 'income' ? 1 : -1)
            ).toFixed(2)}
            <span className="ml-0.5">元</span>
          </div>
        </div>
      </div>

      {(extraJSON.edit || extraJSON.save || extraJSON.remove) && (
        <div className="flex items-center gap-2 mt-2">
          {extraJSON.save && (
            <div
              onClick={() => onOperateHandler('save')}
              className="text-xs bg-indigo-500 text-white rounded-full px-3 py-1.5 flex items-center gap-1"
            >
              <i className="ri-save-line"></i>
              <span className="mr-1">保存</span>
            </div>
          )}

          {extraJSON.edit && (
            <div
              onClick={() => onOperateHandler('edit')}
              className="text-xs bg-white rounded-full px-3 py-1.5 flex items-center gap-1"
            >
              <i className="ri-edit-line"></i>
              <span className="mr-1">修改</span>
            </div>
          )}

          {extraJSON.remove && (
            <div
              onClick={() => onOperateHandler('remove')}
              className="text-xs bg-white text-black rounded-full px-3 py-1.5 flex items-center gap-1"
            >
              <i className="ri-delete-bin-line"></i>
              <span className="mr-1">取消</span>
            </div>
          )}
        </div>
      )}
    </>
  )
}
