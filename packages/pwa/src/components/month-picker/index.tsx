import { ReactNode, useCallback, useRef } from 'react'
import dayjs, { Dayjs } from 'dayjs'

export interface MonthPickerProps {
  value?: Dayjs
  onChange?: (value: Dayjs) => void
  children?: ReactNode
  max?: Dayjs
  min?: Dayjs
}

export default function MonthPicker(props: MonthPickerProps) {
  const ref = useRef<HTMLInputElement>(null)

  const showPicker = useCallback(() => {
    ref.current?.showPicker()
  }, [])

  return (
    <div className="relative" onClick={showPicker}>
      {props.children}
      <input
        value={props.value?.local().format('YYYY-MM')}
        onChange={(e) =>
          props.onChange?.(dayjs.tz(e.target.value || new Date(), 'utc'))
        }
        type="month"
        ref={ref}
        max={props.max?.format('YYYY-MM')}
        min={props.min?.format('YYYY-MM')}
        className="absolute h-0 left-0 right-0 bottom-0 opacity-0"
      />
    </div>
  )
}
