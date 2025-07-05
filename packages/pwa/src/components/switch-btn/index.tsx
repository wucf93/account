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
    <div className="bg-gray-100 p-1 rounded-full flex w-48 mx-auto">
      {options?.map((item) => (
        <button
          key={item.value as string}
          className={cls(
            'flex-1',
            'py-1.5',
            'px-3',
            'rounded-full',
            'text-sm',
            value === item.value ? ['bg-white', 'shadow-sm'] : ['text-gray-500']
          )}
          onClick={() => onChange?.(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
