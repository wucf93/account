import { DetailsType, DetailsPopupInfo } from '../../atom'
import { useGlobalStore } from '@/store'
import { useMemo } from 'react'
import clxs from 'classnames'

interface CategorySelectProps {
  type: DetailsType
  categoryId: DetailsPopupInfo['categoryId']
  onCategoryChange: (categoryId: DetailsPopupInfo['categoryId']) => void
}

export default function CategorySelect({
  type,
  categoryId,
  onCategoryChange,
}: CategorySelectProps) {
  const { categoryConfigs } = useGlobalStore()

  const options = useMemo(
    () =>
      type === DetailsType.Income
        ? categoryConfigs.income
        : categoryConfigs.expenditure,
    [categoryConfigs, type]
  )

  return (
    <div
      className="grid grid-cols-5 gap-1 overflow-y-auto px-4"
      style={{ height: 164 }}
    >
      {options.map((item) => (
        <div
          key={item.name}
          className={clxs('p-2 flex flex-col items-center cursor-pointer', [
            ...(item.id === categoryId
              ? ['text-indigo-500']
              : ['text-gray-500']),
          ])}
          onClick={() => onCategoryChange(item.id)}
        >
          <div
            className={clxs(
              'w-11 h-11 rounded-full flex items-center justify-center mb-1',
              [
                ...(item.id === categoryId
                  ? ['bg-indigo-100', 'text-indigo-500']
                  : ['bg-gray-100', 'text-gray-500']),
              ]
            )}
          >
            <i className={`${item.icon} ri-lg`}></i>
          </div>
          <div className="text-xs whitespace-nowrap overflow-hidden text-overflow-ellipsis">
            {item.name}
          </div>
        </div>
      ))}
    </div>
  )
}
