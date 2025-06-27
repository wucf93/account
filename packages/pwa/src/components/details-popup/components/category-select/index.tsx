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

  const color = useMemo(
    () => (type === DetailsType.Income ? 'yellow' : 'green'),
    [type]
  )

  return (
    <div className="grid grid-cols-5 gap-1">
      {options.map((item) => (
        <div
          key={item.name}
          className="category-item p-2 flex flex-col items-center cursor-pointer"
          onClick={() => onCategoryChange(item.category_id)}
        >
          <div
            className={`w-11 h-11 rounded-full bg-${item.category_id === categoryId ? color : 'gray'}-100 flex items-center justify-center mb-1`}
          >
            <i
              className={clxs(
                `${item.icon} text-${item.category_id === categoryId ? color : 'gray'}-500 ri-lg`
              )}
            ></i>
          </div>
          <div
            className={clxs(
              `text-xs text-${item.category_id === categoryId ? color : 'gray'}-500 whitespace-nowrap overflow-hidden text-overflow-ellipsis`
            )}
          >
            {item.name}
          </div>
        </div>
      ))}
      {/* <div className="category-item flex flex-col items-center cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                            <i className="ri-more-line text-gray-500 ri-lg"></i>
                        </div>
                        <div className="text-xs whitespace-nowrap overflow-hidden text-overflow-ellipsis">
                            其他
                        </div>
                    </div> */}
    </div>
  )
}
