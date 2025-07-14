import { useCallback, useState } from 'react'
import {
  aiControllerGenTransaction,
  GenTransactionEntity,
  transactionControllerCreate,
} from '@/apis'
import { type BubbleItemProps } from './components/bubble'
import omit from 'lodash/omit'
import { Toast } from 'antd-mobile'

const LoadingText = (props: {
  text: React.ReactNode
  originText: React.ReactNode
}) => (
  <div>
    <div>{props.text}</div>
    <div className="h-[0.5px] w-full my-2 bg-gray-300" />
    <div className="text-xs text-gray-400">{props.originText}</div>
  </div>
)

const FooterTools = (props: {
  onOperate?: (type: 'save' | 'edit' | 'delete') => void
}) => (
  <div className="flex items-center gap-2">
    <div
      onClick={() => props.onOperate?.('save')}
      className="text-xs bg-indigo-500 text-white rounded-full px-3 py-1.5 shadow-md flex items-center gap-1"
    >
      <i className="ri-save-line"></i>
      <span className="mr-1">保存</span>
    </div>
    <div
      onClick={() => props.onOperate?.('edit')}
      className="text-xs bg-white rounded-full px-3 py-1.5 shadow-md flex items-center gap-1"
    >
      <i className="ri-edit-line"></i>
      <span className="mr-1">修改</span>
    </div>
    <div
      onClick={() => props.onOperate?.('delete')}
      className="text-xs bg-red-500 text-white rounded-full px-3 py-1.5 shadow-md flex items-center gap-1"
    >
      <i className="ri-delete-bin-line"></i>
      <span className="mr-1">取消</span>
    </div>
  </div>
)

const DEFAULT_MESSAGE: BubbleItemProps[] = [
  {
    id: 1,
    content:
      'Hi,我是智能记账小助手，请发送收支内容，我会帮你自动归类记账,如：今天买菜花了30元',
    role: 'assistant',
    timestamp: Date.now(),
  },
]

export function useMessage() {
  const [messages, setMessages] = useState(DEFAULT_MESSAGE)
  const [loading, setLoading] = useState(false)

  const onOperateHandler = useCallback(
    (type: 'save' | 'edit' | 'delete', info: GenTransactionEntity) => {
      if (type === 'save') {
        transactionControllerCreate({
          body: omit(info, 'categoryName'),
        }).then((res) => {
          if (res.data?.success) {
            Toast.show('保存成功')
          } else {
            Toast.show(res.data?.message || '保存失败')
          }
        })
      }
      setMessages((pre) => {
        const cloneList = [...pre]
        const lastItem = cloneList[cloneList.length - 1]
        if (lastItem) {
          lastItem.footer = undefined
        }
        return cloneList
      })
    },
    []
  )

  const genAIText = useCallback(async (content: string) => {
    const res = await aiControllerGenTransaction({ body: { message: content } })
    setMessages((pre) => {
      const cloneList = [...pre]
      cloneList.pop()

      if (res.data?.success === true && res.data?.data) {
        cloneList.push({
          id: Date.now(),
          content: JSON.stringify(res.data.data),
          role: 'assistant',
          timestamp: Date.now(),
          footer: (
            <FooterTools
              onOperate={(type) => onOperateHandler(type, res.data.data)}
            />
          ),
        })
      } else {
        cloneList.push({
          id: Date.now(),
          content: res.data?.message,
          role: 'assistant',
          timestamp: Date.now(),
        })
      }
      return cloneList
    })
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const sendMessage = useCallback(
    (content: string) => {
      setLoading(true)
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content,
          role: 'user',
          timestamp: Date.now(),
        },
        {
          id: prev.length + 2,
          role: 'assistant',
          timestamp: Date.now(),
          loading: true,
          loadingText: (
            <LoadingText
              text="智能分析中，这需要一些时间，请耐心等待哦"
              originText={content}
            />
          ),
        },
      ])
      genAIText(content)
    },
    [setMessages]
  )

  return {
    loading,
    messages,
    sendMessage,
  }
}
