import { useCallback } from 'react'
import { Toast, Dialog, List } from 'antd-mobile'
import useOCR from './useOCR'
import {
  aiControllerGenTransaction,
  transactionControllerCreate,
  type GenTransactionEntity,
} from '@/apis'
import omit from 'lodash/omit'
import dayjs from 'dayjs'

const Config: Array<{
  key: keyof GenTransactionEntity
  name: string
  render?: (value: any) => string
}> = [
  {
    key: 'amount',
    name: '账单金额',
    render: (value: any) => Number(value).toFixed(2),
  },
  {
    key: 'transactionDate',
    name: '账单日期',
    render: (value: any) => dayjs(value).format('YYYY-MM-DD'),
  },
  {
    key: 'transactionType',
    name: '账单类型',
    render: (value: any) => (value === 'income' ? '收入' : '支出'),
  },
  {
    key: 'categoryName',
    name: '账单分类',
  },
  { key: 'description', name: '账单描述' },
]

export default function useImageTool() {
  const { recognizeText } = useOCR()

  const submitHander = useCallback(
    (info: GenTransactionEntity, cb?: () => void) => {
      Dialog.confirm({
        title: <div className="relative">账单信息</div>,
        content: (
          <List
            mode="card"
            style={{
              margin: 0,
              padding: '0 10px 0 10px',
              width: '70vw',
              marginBottom: -12,
            }}
          >
            {Config.map(({ key, name, render }) => (
              <List.Item
                key={key}
                extra={render?.(info[key]) || info[key]}
                style={{ paddingLeft: 0, fontSize: 15 }}
              >
                {name}
              </List.Item>
            ))}
          </List>
        ),
        closeOnMaskClick: true,
        confirmText: '保存',
        onConfirm: () => {
          transactionControllerCreate({
            body: omit(info, 'categoryName'),
          }).then((res) => {
            if (res.data?.success) {
              Toast.show('保存成功')
              cb?.()
            } else {
              Toast.show(res.data?.message || '保存失败')
            }
          })
        },
        cancelText: '修改',
      })
    },
    []
  )

  const genText = useCallback(async (message: string, cb?: () => void) => {
    const toast = Toast.show({
      content: (
        <div className="text-center mt-4 w-36 text-sm">AI解析中，请稍后...</div>
      ),
      icon: 'loading',
      duration: 0,
    })
    const res = await aiControllerGenTransaction({ body: { message } })
    toast.close()
    if (res.data?.success) {
      submitHander(res.data.data, cb)
    } else {
      Toast.show(res.data?.message || '解析失败')
    }
  }, [])

  const imageScan = useCallback(
    async (image: File | Blob, cb?: () => void) => {
      const toast = Toast.show({
        content: (
          <div className="text-center mt-4 w-36 text-sm">
            图片识别中，可能需要等待一段时间...
          </div>
        ),
        icon: 'loading',
        duration: 0,
        maskClickable: false,
      })
      const message = await recognizeText(image)
      toast.close()
      if (message) {
        await genText(message, cb)
      } else {
        Toast.show('图片失败失败，请稍后重试或手动填写')
      }
    },
    [recognizeText]
  )

  return {
    imageScan,
  }
}
