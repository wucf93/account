import { useState } from 'react'
import classNames from 'classnames'
import { TextArea } from 'antd-mobile'
import Bubble from './components/bubble'
import { useMessage } from './hooks'

export default function AiPage() {
  const { messageList, sendMessage, loading, resumeMessage } = useMessage()
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col px-4 pb-4">
      <div className="text-lg font-bold text-white py-4 flex items-center gap-2">
        <i
          className="ri-arrow-go-back-line"
          onClick={() => window.history.back()}
        />
        <span>智能记账</span>
      </div>

      <div className="flex-auto overflow-x-auto">
        <Bubble.List
          dataSource={messageList}
          itemRender={(item) => <Bubble {...item} />}
        />
      </div>

      <div
        className={classNames(
          'group flex-none w-full py-1 px-2 shadow-sm rounded-lg flex items-center focus-within:ring-2 focus-within:ring-indigo-500 gap-2'
        )}
      >
        <TextArea
          placeholder="请输入内容"
          rows={1}
          autoSize={{ minRows: 1, maxRows: 3 }}
          style={{ '--font-size': '14px' }}
          className="my-1"
          value={inputValue}
          onChange={setInputValue}
        />

        <div
          className="flex h-full items-end"
          onClick={() => {
            if (!inputValue?.trim()) return
            sendMessage(inputValue)
            setInputValue('')
          }}
        >
          {loading ? (
            <i
              className="ri-stop-circle-line text-3xl text-indigo-500"
              onClick={resumeMessage}
            />
          ) : (
            <i
              className={classNames(
                'ri-arrow-up-circle-fill text-3xl transition-colors',
                inputValue?.trim() ? 'text-indigo-500' : 'text-indigo-300'
              )}
            />
          )}
        </div>
      </div>
    </div>
  )
}
