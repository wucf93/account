import { useCallback, useMemo, useRef, useState } from 'react'
import { aiControllerGenTransaction } from '@/apis'
import { ContentTypeEnum, MessageType } from './type'
import { renderMessageContent } from './components/cards'

const DEFAULT_MESSAGE: MessageType[] = [
  {
    id: 1,
    content:
      'Hi,我是智能记账小助手，请发送收支内容，我会帮你自动归类记账,如：今天买菜花了30元',
    role: 'assistant',
    timestamp: Date.now(),
    contentType: ContentTypeEnum.STRING,
  },
]

export function useMessage() {
  const [messages, setMessages] = useState<MessageType[]>(DEFAULT_MESSAGE)
  const [loading, setLoading] = useState(false)
  const controllerRef = useRef<AbortController>()

  // 获取智能助手回复
  const genAIText = useCallback(async (content: string) => {
    controllerRef.current = new AbortController()
    const res = await aiControllerGenTransaction({
      body: { message: content },
      signal: controllerRef.current.signal,
    })
    // 有可能是取消了
    if (res.data) {
      setMessages((pre) => {
        const cloneList = [...pre]
        cloneList.pop()

        if (res.data?.success === true && res.data?.data) {
          cloneList.push({
            id: Date.now(),
            content: JSON.stringify(res.data.data),
            role: 'assistant',
            timestamp: Date.now(),
            contentType: ContentTypeEnum.TRANSACTION,
            extra: JSON.stringify({ save: true, remove: true, edit: true }),
          })
        } else {
          cloneList.push({
            id: Date.now(),
            content: res.data?.message,
            role: 'assistant',
            timestamp: Date.now(),
            contentType: ContentTypeEnum.STRING,
          })
        }
        return cloneList
      })
    }
  }, [])

  // 发送消息
  const sendMessage = useCallback(
    async (content: string) => {
      setLoading(true)
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content,
          role: 'user',
          timestamp: Date.now(),
          contentType: ContentTypeEnum.STRING,
        },
        {
          id: prev.length + 2,
          role: 'assistant',
          timestamp: Date.now(),
          content,
          contentType: ContentTypeEnum.LOADING,
        },
      ])
      try {
        await genAIText(content)
      } catch (error) {
        console.log(error)
      }
      setTimeout(() => setLoading(false), 1000)
    },
    [setMessages]
  )

  // 取消上次的消息
  const resumeMessage = useCallback(() => {
    controllerRef.current?.abort()
    setMessages((prev) => {
      const cloneList = [...prev]
      cloneList.pop()
      return cloneList
    })
  }, [controllerRef.current])

  // 处理后的消息
  const messageList = useMemo(
    () =>
      messages.map((message) => ({
        ...message,
        content: renderMessageContent(
          message.contentType,
          message,
          setMessages
        ),
      })),
    [messages]
  )

  return {
    loading,
    messageList,
    sendMessage,
    resumeMessage,
  }
}
