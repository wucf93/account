import { DownFill } from "antd-mobile-icons";

interface DataAnalysisProps {
    className?: string;
    style?: React.CSSProperties;
}

// clsx("bg-white rounded-lg shadow-sm p-4 mb-4", className)

export default function DataAnalysis({ className, style }: DataAnalysisProps) {
    return (
        <div className={className} style={style}>
            <div className="flex items-center mb-3">
                <div className="text-sm text-gray-500 mr-1">2025年6月 </div>
                <DownFill className="text-gray-500" fontSize={9} />
            </div>
            <div className="flex justify-between">
                <div>
                    <div className="text-xs text-gray-500 mb-1">收入</div>
                    <div className="text-lg font-medium income">¥ 8,756.00</div>
                </div>
                <div>
                    <div className="text-xs text-gray-500 mb-1">支出</div>
                    <div className="text-lg font-medium expense">¥ 5,342.50</div>
                </div>
                <div>
                    <div className="text-xs text-gray-500 mb-1">结余</div>
                    <div className="text-lg font-medium">¥ 3,413.50</div>
                </div>
            </div>
        </div>
    )
}