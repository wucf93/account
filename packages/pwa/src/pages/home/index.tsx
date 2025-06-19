import { FloatingBubble } from "antd-mobile";
import { EditSFill, SearchOutline } from "antd-mobile-icons";
import { useSetAtom } from "jotai";
import { detailsPopupInfo } from "../../components/details-popup/atom";
import DataAnalysis from "./components/data-analysis";


export default function Home() {
    const setInfo = useSetAtom(detailsPopupInfo)

    return <div className="flex flex-col h-full overflow-hidden">
        {/* 搜索栏 */}
        <div className="m-4 relative flex-none">
            <div className="relative">
                <input
                    type="text"
                    placeholder="搜索交易记录"
                    className="w-full h-10 pl-10 pr-3 rounded-full bg-gray-100 border-none text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <div
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400"
                >
                    <SearchOutline fontSize={18} />
                </div>
            </div>
        </div>

        {/* 本月统计 */}
        <DataAnalysis className="bg-white rounded-lg shadow-sm p-4 m-4 mt-0 flex-none" />

        {/* 交易记录 */}
        <div className="p-4 pt-0 grow overflow-y-auto">
            {/* 今天 */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium">今天</div>
                    <div className="text-xs text-gray-500">支出 ¥328.50 收入 ¥0.00</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {/* <!-- 记录项 --> */}
                    <div className="flex items-center p-4 border-b border-gray-100">
                        <div
                            className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3"
                        >
                            <i className="ri-restaurant-line text-primary ri-lg"></i>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <div className="font-medium">午餐</div>
                                <div className="expense">-45.00</div>
                            </div>
                            <div className="flex justify-between mt-1">
                                <div className="text-xs text-gray-500">公司附近的小餐馆</div>
                                <div className="text-xs text-gray-500">12:30</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center p-4 border-b border-gray-100">
                        <div
                            className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3"
                        >
                            <i className="ri-taxi-line text-purple-500 ri-lg"></i>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <div className="font-medium">打车</div>
                                <div className="expense">-38.50</div>
                            </div>
                            <div className="flex justify-between mt-1">
                                <div className="text-xs text-gray-500">去客户公司</div>
                                <div className="text-xs text-gray-500">09:15</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center p-4">
                        <div
                            className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3"
                        >
                            <i className="ri-shopping-bag-line text-red-500 ri-lg"></i>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <div className="font-medium">超市购物</div>
                                <div className="expense">-245.00</div>
                            </div>
                            <div className="flex justify-between mt-1">
                                <div className="text-xs text-gray-500">周末采购生活用品</div>
                                <div className="text-xs text-gray-500">18:45</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 昨天 */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium">昨天</div>
                    <div className="text-xs text-gray-500">
                        支出 ¥156.00 收入 ¥5,000.00
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="flex items-center p-4 border-b border-gray-100">
                        <div
                            className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3"
                        >
                            <i className="ri-bank-card-line text-green-500 ri-lg"></i>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <div className="font-medium">工资</div>
                                <div className="income">+5,000.00</div>
                            </div>
                            <div className="flex justify-between mt-1">
                                <div className="text-xs text-gray-500">6月工资</div>
                                <div className="text-xs text-gray-500">09:00</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center p-4">
                        <div
                            className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3"
                        >
                            <i className="ri-movie-line text-yellow-500 ri-lg"></i>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <div className="font-medium">电影票</div>
                                <div className="expense">-156.00</div>
                            </div>
                            <div className="flex justify-between mt-1">
                                <div className="text-xs text-gray-500">周末看电影</div>
                                <div className="text-xs text-gray-500">19:30</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- 6月14日 --> */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium">6月14日</div>
                    <div className="text-xs text-gray-500">支出 ¥389.00 收入 ¥0.00</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="flex items-center p-4 border-b border-gray-100">
                        <div
                            className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3"
                        >
                            <i className="ri-t-shirt-line text-blue-500 ri-lg"></i>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <div className="font-medium">服装</div>
                                <div className="expense">-289.00</div>
                            </div>
                            <div className="flex justify-between mt-1">
                                <div className="text-xs text-gray-500">购买夏季衣服</div>
                                <div className="text-xs text-gray-500">14:20</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center p-4">
                        <div
                            className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3"
                        >
                            <i className="ri-book-line text-orange-500 ri-lg"></i>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <div className="font-medium">书籍</div>
                                <div className="expense">-100.00</div>
                            </div>
                            <div className="flex justify-between mt-1">
                                <div className="text-xs text-gray-500">购买专业书籍</div>
                                <div className="text-xs text-gray-500">16:45</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 详情弹窗 */}
        <FloatingBubble
            style={{
                '--initial-position-bottom': '108px',
                '--initial-position-right': '38px',
                '--edge-distance': '38px',
                "--z-index": "60",
            }}
        >
            <EditSFill fontSize={32} onClick={() => setInfo((prev) => ({ ...prev, visible: true }))} />
        </FloatingBubble>
    </div>
}