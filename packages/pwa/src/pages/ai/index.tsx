import { useState } from 'react'
import classNames from 'classnames'
import { TextArea } from 'antd-mobile'

export default function AiPage() {
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

      <div className="flex-auto overflow-x-auto">333</div>

      <div
        className={`group flex-none w-full py-1 px-2 shadow-sm rounded-lg bg-white flex items-center focus-within:ring-2 focus-within:ring-indigo-500 gap-2`}
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

        <div className="flex h-full items-end ">
          <i
            className={classNames(
              'ri-arrow-up-circle-fill text-3xl transition-colors',
              inputValue?.trim() ? 'text-indigo-500' : 'text-indigo-300'
            )}
          ></i>
        </div>
      </div>
    </div>
  )
}
