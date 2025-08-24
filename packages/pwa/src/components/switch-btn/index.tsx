import cls from 'classnames'

interface SwitchProps<T = string> {
  value?: T
  onChange?: (value: T) => void
  options?: Array<{ label: React.ReactNode; value: T }>
}

export default function Switch<T>({
  value,
  onChange,
  options,
}: SwitchProps<T>) {
  return (
    <div className="global-bg-soft-color p-0.5 rounded-lg flex w-38 mx-auto">
      {options?.map((item) => (
        <button
          key={item.value as string}
          className={cls(
            'flex-1',
            'py-1',
            'rounded-md',
            'text-sm',
            value === item.value ? ['global-bg-color'] : ['text-zinc-400']
          )}
          onClick={() => onChange?.(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
