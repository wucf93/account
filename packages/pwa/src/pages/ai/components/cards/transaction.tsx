import { StringContentRender } from './string'
import { useCallback, useMemo } from 'react'
import { GenTransactionEntity, transactionControllerCreate } from '@/apis'
import omit from 'lodash/omit'
import { Toast } from 'antd-mobile'
import { CardRenderType } from './type'

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

  return (
    <>
      <StringContentRender {...props} />

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
