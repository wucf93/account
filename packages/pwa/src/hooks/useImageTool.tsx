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
import { ImageLike } from 'tesseract.js'

export default function useImageTool() {
  const { recognizeText } = useOCR()

  const submitHander = useCallback(
    (info: GenTransactionEntity, cb?: () => void) => {
      Dialog.confirm({
        title: '账单信息',
        content: (
          <List mode="card" style={{ margin: 0, padding: 0 }}>
            <List.Item extra={Number(info.amount).toFixed(2) + '元'}>
              金额
            </List.Item>
            <List.Item extra={dayjs(info.transactionDate).format('YYYY-MM-DD')}>
              账单日期
            </List.Item>
            <List.Item
              extra={info.transactionType === 'income' ? '收入' : '支出'}
            >
              账单类型
            </List.Item>
            <List.Item extra={info.categoryName}>账单分类</List.Item>
            <List.Item extra={info.description}>账单描述</List.Item>
          </List>
        ),
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
      })
    },
    []
  )

  const genText = useCallback(async (message: string, cb?: () => void) => {
    const toast = Toast.show({
      content: (
        <div className="text-center mt-4 w-40">ai 解析中，请稍后...</div>
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
    async (image: ImageLike, cb?: () => void) => {
      const toast = Toast.show({
        content: (
          <div className="text-center mt-4 w-40">
            图片识别中，可能需要等待一段时间
          </div>
        ),
        icon: 'loading',
        duration: 0,
      })
      const message = await recognizeText(image)
      toast.close()
      console.log(message)
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
