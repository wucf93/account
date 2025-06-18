import { useAtomValue } from "jotai";
import { DetailsType } from "../../atom";
import { expenditureCategoryConfigs, incomeCategoryConfigs } from "../../../../store";

interface CategorySelectProps {
    type: DetailsType
}

export default function CategorySelect({ type }: CategorySelectProps) {
    const incomeConfigs = useAtomValue(incomeCategoryConfigs)
    const expenditureConfigs = useAtomValue(expenditureCategoryConfigs)

    return (
        <>
            {/* 支出分类 */}
            {type === DetailsType.Expenditure &&
                <div className="grid grid-cols-5 gap-3">
                    {expenditureConfigs.map(item => (
                        <div key={item.name} className="category-item flex flex-col items-center cursor-pointer">
                            <div className={`w-12 h-12 rounded-full bg-${item.color}-100 flex items-center justify-center mb-1`}>
                                <i className={`${item.icon} text-${item.color}-500 ri-lg`}></i>
                            </div>
                            <div className="text-xs whitespace-nowrap overflow-hidden text-overflow-ellipsis">
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
            }

            {/* 收入分类 */}
            {type === DetailsType.Income &&
                <div className="grid grid-cols-5 gap-3">
                    {incomeConfigs.map(item => (
                        <div key={item.name} className="category-item flex flex-col items-center cursor-pointer">
                            <div className={`w-12 h-12 rounded-full bg-${item.color}-100 flex items-center justify-center mb-1`}>
                                <i className={`${item.icon} text-${item.color}-500 ri-lg`}></i>
                            </div>
                            <div className="text-xs whitespace-nowrap overflow-hidden text-overflow-ellipsis">
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
            }
        </>
    )
}