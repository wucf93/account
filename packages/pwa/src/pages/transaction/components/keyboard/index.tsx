import { useState, Fragment, useRef } from 'react'
import dayjs, { Dayjs } from 'dayjs'

interface KeyboardProps {
  initialAccountValue?: string
  onAccountChange?: (value: string) => void
  initialDateValue?: Dayjs
  onDateChange?: (value: Dayjs) => void
  onSave?: () => void
}

export default function Keyboard({
  onSave,
  onAccountChange,
  onDateChange,
  initialAccountValue = '',
  initialDateValue = dayjs(),
}: KeyboardProps) {
  const [inputValue, setInputValue] = useState(initialAccountValue)
  const [dateValue, setDateValue] = useState<Dayjs>(initialDateValue)
  const fileRef = useRef<HTMLInputElement>(null)
  const [visible, setVisible] = useState(false)

  const handleKeyPress = (key: string | number) => {
    if (typeof key === 'number') {
      let newValue
      // 如果当前值为空或为0，则直接替换
      if (inputValue === '' || inputValue === '0') {
        newValue = key.toString()
      } else {
        newValue = inputValue + key.toString()
      }

      // 检查小数点后位数不超过2位
      const [, decimalPart] = newValue.split('.')
      if (decimalPart && decimalPart.length > 2) return

      // 检查数值不超过百万
      if (newValue.trim() && !isNaN(Number(newValue))) {
        const numValue = parseFloat(newValue)
        if (Math.abs(numValue) > 1000000) return
      }
      setInputValue(newValue)
      onAccountChange?.(newValue)
    } else if (key === '.') {
      // 处理小数点输入，确保只允许一个小数点且格式正确
      if (!inputValue.includes('.')) {
        // 如果输入为空或最后一个字符是运算符，则自动补0
        if (inputValue === '' || inputValue === '0') {
          const newValue = '0.'
          setInputValue(newValue)
          onAccountChange?.(newValue)
        } else {
          const newValue = inputValue + '.'
          setInputValue(newValue)
          onAccountChange?.(newValue)
        }
      }
    } else if (key === 'delete') {
      // 处理删除操作，为空时重置为0
      const newValue = inputValue.slice(0, -1) || '0'
      setInputValue(newValue)
      onAccountChange?.(newValue)
    } else if (key === 'save') {
      onSave?.()
    } else if (key === 'date') {
      setVisible(true)
    } else if (key === 'ai') {
      fileRef.current?.click()
    }
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-1 px-1">
        {[
          1,
          2,
          3,
          'date',
          4,
          5,
          6,
          'ai',
          7,
          8,
          9,
          'delete',
          0,
          '.',
          'save',
        ].map((item) => (
          <Fragment key={item}>
            {item === 'delete' ? (
              <div
                className="bg-white h-12 flex items-center justify-center rounded cursor-pointer text-lg hover:bg-gray-100 transition-colors"
                onClick={() => handleKeyPress(item)}
              >
                <i className="ri-delete-back-2-line ri-lg"></i>
              </div>
            ) : item === 'save' ? (
              <div
                className={
                  'h-12 flex items-center justify-center rounded cursor-pointer text-white bg-indigo-500 col-span-2 hover:bg-primary/90 transition-colors'
                }
                onClick={() => handleKeyPress(item)}
              >
                保存
              </div>
            ) : item === 'date' ? (
              <div
                className="bg-white h-12 flex items-center justify-center rounded cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleKeyPress(item)}
              >
                {dayjs().isSame(dayjs(dateValue), 'day')
                  ? '今天'
                  : dayjs(dateValue).format('YY/MM/DD')}
              </div>
            ) : item === 'ai' ? (
              <div
                className="bg-white h-12 flex items-center justify-center rounded cursor-pointer text-sm hover:bg-gray-100 transition-colors"
                onClick={() => handleKeyPress(item)}
              >
                AI
              </div>
            ) : (
              <div
                className="bg-white h-12 flex items-center justify-center rounded cursor-pointer text-lg hover:bg-gray-100 transition-colors"
                onClick={() => handleKeyPress(item)}
              >
                {item}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </>
  )
}
