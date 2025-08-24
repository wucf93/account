import { ReactNode, useCallback, useRef } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import classnames from 'classnames'

export interface MonthPickerProps {
  value?: Dayjs
  onChange?: (value: Dayjs) => void
  children?: ReactNode
  max?: Dayjs
  min?: Dayjs
  type: 'month' | 'datetime'
  className?: string
  style?: React.CSSProperties
}

export default function MonthPicker(props: MonthPickerProps) {
  const ref = useRef<HTMLInputElement>(null)

  const format = props.type === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD HH:mm'

  const showPicker = useCallback(() => {
    ref.current?.showPicker()
  }, [])

  console.log(props.value)

  return (
    <div
      className={classnames('relative', props.className)}
      style={props.style}
      onClick={showPicker}
    >
      {props.children}
      <input
        value={props.value?.local().format(format)}
        onChange={(e) => {
          props.onChange?.(
            dayjs.tz(new Date(e.target.value) || new Date(), 'utc')
          )
        }}
        type={props.type === 'datetime' ? 'datetime-local' : props.type}
        ref={ref}
        max={props.max?.format(format)}
        min={props.min?.format(format)}
        className="absolute h-0 left-0 right-0 bottom-0 opacity-0"
      />
    </div>
  )
}
