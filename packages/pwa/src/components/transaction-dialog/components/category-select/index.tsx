import { useMemo } from 'react'
import { useGlobalStore } from '@/store'
import classnames from 'classnames'

interface CategorySelectProps {
  value: number
  onChange: (value: number) => void
  transactionType: 'expenditure' | 'income'
  className?: string
  style?: React.CSSProperties
}

export default function CategorySelect(props: CategorySelectProps) {
  const { categoryConfigs } = useGlobalStore()

  // 根据交易类型筛选分类
  const filteredCategories = useMemo(
    () =>
      props.transactionType === 'expenditure'
        ? categoryConfigs.expenditure
        : categoryConfigs.income,
    [categoryConfigs, props.transactionType]
  )

  return (
    <div
      className={classnames(
        'grid grid-cols-5 gap-y-4 max-h-[30vh] overscroll-y-auto overflow-x-hidden px-4',
        props.className
      )}
      style={props.style}
    >
      {filteredCategories.map((category) => (
        <div
          key={category.id}
          className="flex flex-col items-center"
          onClick={() => props.onChange(category.id)}
        >
          <div
            className={classnames(
              'w-10 h-10 rounded-full flex items-center justify-center text-lg',
              props.value === category.id
                ? props.transactionType === 'expenditure'
                  ? 'bg-rose-500 text-white'
                  : 'bg-green-500 text-white'
                : 'global-bg-soft-color'
            )}
          >
            <i className={category.icon} />
          </div>
          <span className="mt-2 text-xs">{category.name}</span>
        </div>
      ))}
    </div>
  )
}
