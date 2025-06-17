import { useAtom } from 'jotai';
import { Popup, } from "antd-mobile";
import { detailsPopupInfo } from '../../store';

export default function ModifyDetailsModal() {
    const [info, setInfo] = useAtom(detailsPopupInfo);

    return <Popup
        visible={info.visible}
        bodyStyle={{
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            maxHeight: '100vh',
        }}
        onClose={() => setInfo({ visible: false })}
        onMaskClick={() => setInfo({ visible: false })}
    >
        <div id="add-page" className="h-full flex flex-col">
            {/* 输入区域 */}
            <div className="flex-1 px-4">
                {/* 金额输入 */}
                <div className="mt-4 mb-6 text-center">
                    <div className="text-sm text-gray-500 mb-2">金额</div>
                    <div className="text-3xl font-medium">
                        ¥ <span id="amount-display">0.00</span>
                    </div>
                </div>
                {/* 类型切换 */}
                <div className="mb-6">
                    <div className="bg-gray-100 p-1 rounded-full flex w-48 mx-auto">
                        <button
                            id="expense-btn"
                            className="flex-1 py-1.5 px-3 rounded-full bg-white text-sm shadow-sm"
                        >
                            支出
                        </button>
                        <button
                            id="income-btn"
                            className="flex-1 py-1.5 px-3 rounded-full text-sm text-gray-500"
                        >
                            收入
                        </button>
                    </div>
                </div>
                {/* 分类选择 */}
                <div className="mb-6">
                    <div className="text-sm text-gray-500 mb-3">分类</div>
                    {/* 支出分类 */}
                    <div id="expense-categories" className="grid grid-cols-5 gap-3">
                        <div
                            className="category-item flex flex-col items-center cursor-pointer"
                        >
                            <div
                                className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-1"
                            >
                                <i className="ri-restaurant-line text-primary ri-lg"></i>
                            </div>
                            <div
                                className="text-xs whitespace-nowrap overflow-hidden text-overflow-ellipsis"
                            >
                                餐饮
                            </div>
                        </div>
                        <div
                            className="category-item flex flex-col items-center cursor-pointer"
                        >
                            <div
                                className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-1"
                            >
                                <i className="ri-shopping-bag-line text-red-500 ri-lg"></i>
                            </div>
                            <div
                                className="text-xs whitespace-nowrap overflow-hidden text-overflow-ellipsis"
                            >
                                购物
                            </div>
                        </div>
                        <div
                            className="category-item flex flex-col items-center cursor-pointer"
                        >
                            <div
                                className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-1"
                            >
                                <i className="ri-taxi-line text-purple-500 ri-lg"></i>
                            </div>
                            <div
                                className="text-xs whitespace-nowrap overflow-hidden text-overflow-ellipsis"
                            >
                                交通
                            </div>
                        </div>
                        <div
                            className="category-item flex flex-col items-center cursor-pointer"
                        >
                            <div
                                className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-1"
                            >
                                <i className="ri-home-line text-yellow-500 ri-lg"></i>
                            </div>
                            <div
                                className="text-xs whitespace-nowrap overflow-hidden text-overflow-ellipsis"
                            >
                                住房
                            </div>
                        </div>
                        <div
                            className="category-item flex flex-col items-center cursor-pointer"
                        >
                            <div
                                className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-1"
                            >
                                <i className="ri-heart-pulse-line text-green-500 ri-lg"></i>
                            </div>
                            <div
                                className="text-xs whitespace-nowrap overflow-hidden text-overflow-ellipsis"
                            >
                                医疗
                            </div>
                        </div>
                        <div
                            className="category-item flex flex-col items-center cursor-pointer"
                        >
                            <div
                                className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-1"
                            >
                                <i className="ri-book-line text-orange-500 ri-lg"></i>
                            </div>
                            <div
                                className="text-xs whitespace-nowrap overflow-hidden text-overflow-ellipsis"
                            >
                                教育
                            </div>
                        </div>
                        <div
                            className="category-item flex flex-col items-center cursor-pointer"
                        >
                            <div
                                className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-1"
                            >
                                <i className="ri-movie-line text-blue-500 ri-lg"></i>
                            </div>
                            <div
                                className="text-xs whitespace-nowrap overflow-hidden text-overflow-ellipsis"
                            >
                                娱乐
                            </div>
                        </div>
                        <div
                            className="category-item flex flex-col items-center cursor-pointer"
                        >
                            <div
                                className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-1"
                            >
                                <i className="ri-t-shirt-line text-pink-500 ri-lg"></i>
                            </div>
                            <div
                                className="text-xs whitespace-nowrap overflow-hidden text-overflow-ellipsis"
                            >
                                服饰
                            </div>
                        </div>
                        <div
                            className="category-item flex flex-col items-center cursor-pointer"
                        >
                            <div
                                className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-1"
                            >
                                <i className="ri-phone-line text-indigo-500 ri-lg"></i>
                            </div>
                            <div
                                className="text-xs whitespace-nowrap overflow-hidden text-overflow-ellipsis"
                            >
                                通讯
                            </div>
                        </div>
                        <div
                            className="category-item flex flex-col items-center cursor-pointer"
                        >
                            <div
                                className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-1"
                            >
                                <i className="ri-more-line text-gray-500 ri-lg"></i>
                            </div>
                            <div
                                className="text-xs whitespace-nowrap overflow-hidden text-overflow-ellipsis"
                            >
                                其他
                            </div>
                        </div>
                    </div>
                    {/* 收入分类 */}
                    <div id="income-categories" className="grid grid-cols-5 gap-3 hidden">
                        <div
                            className="category-item flex flex-col items-center cursor-pointer"
                        >
                            <div
                                className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-1"
                            >
                                <i className="ri-bank-card-line text-green-500 ri-lg"></i>
                            </div>
                            <div
                                className="text-xs whitespace-nowrap overflow-hidden text-overflow-ellipsis"
                            >
                                工资
                            </div>
                        </div>
                        <div
                            className="category-item flex flex-col items-center cursor-pointer"
                        >
                            <div
                                className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-1"
                            >
                                <i className="ri-red-packet-line text-primary ri-lg"></i>
                            </div>
                            <div
                                className="text-xs whitespace-nowrap overflow-hidden text-overflow-ellipsis"
                            >
                                奖金
                            </div>
                        </div>
                        <div
                            className="category-item flex flex-col items-center cursor-pointer"
                        >
                            <div
                                className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-1"
                            >
                                <i className="ri-refund-2-line text-yellow-500 ri-lg"></i>
                            </div>
                            <div
                                className="text-xs whitespace-nowrap overflow-hidden text-overflow-ellipsis"
                            >
                                报销
                            </div>
                        </div>
                        <div
                            className="category-item flex flex-col items-center cursor-pointer"
                        >
                            <div
                                className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-1"
                            >
                                <i className="ri-gift-line text-purple-500 ri-lg"></i>
                            </div>
                            <div
                                className="text-xs whitespace-nowrap overflow-hidden text-overflow-ellipsis"
                            >
                                礼金
                            </div>
                        </div>
                        <div
                            className="category-item flex flex-col items-center cursor-pointer"
                        >
                            <div
                                className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-1"
                            >
                                <i className="ri-more-line text-gray-500 ri-lg"></i>
                            </div>
                            <div
                                className="text-xs whitespace-nowrap overflow-hidden text-overflow-ellipsis"
                            >
                                其他
                            </div>
                        </div>
                    </div>
                </div>
                {/* 日期和备注 */}
                <div className="mb-4">
                    <div className="flex space-x-3 mb-3">
                        <div className="flex-1">
                            <div className="text-sm text-gray-500 mb-2">日期</div>
                            <div
                                className="bg-white rounded-lg shadow-sm p-3 flex items-center cursor-pointer"
                            >
                                <i className="ri-calendar-line text-gray-400 mr-2"></i>
                                <div className="text-sm">2025-06-16</div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="text-sm text-gray-500 mb-2">时间</div>
                            <div
                                className="bg-white rounded-lg shadow-sm p-3 flex items-center cursor-pointer"
                            >
                                <i className="ri-time-line text-gray-400 mr-2"></i>
                                <div className="text-sm">现在</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500 mb-2">备注</div>
                        <input
                            type="text"
                            placeholder="添加备注..."
                            className="w-full h-12 px-3 rounded-lg bg-white border-none shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>
            </div>
            {/* 数字键盘 */}
            <div className="bg-gray-100 py-2">
                <div className="grid grid-cols-4 gap-1 px-1">
                    <div
                        className="keyboard-key bg-white h-12 flex items-center justify-center rounded cursor-pointer text-lg"
                    >
                        1
                    </div>
                    <div
                        className="keyboard-key bg-white h-12 flex items-center justify-center rounded cursor-pointer text-lg"
                    >
                        2
                    </div>
                    <div
                        className="keyboard-key bg-white h-12 flex items-center justify-center rounded cursor-pointer text-lg"
                    >
                        3
                    </div>
                    <div
                        className="keyboard-key bg-white h-12 flex items-center justify-center rounded cursor-pointer text-lg"
                    >
                        <i className="ri-delete-back-2-line ri-lg"></i>
                    </div>
                    <div
                        className="keyboard-key bg-white h-12 flex items-center justify-center rounded cursor-pointer text-lg"
                    >
                        4
                    </div>
                    <div
                        className="keyboard-key bg-white h-12 flex items-center justify-center rounded cursor-pointer text-lg"
                    >
                        5
                    </div>
                    <div
                        className="keyboard-key bg-white h-12 flex items-center justify-center rounded cursor-pointer text-lg"
                    >
                        6
                    </div>
                    <div
                        className="keyboard-key bg-white h-12 flex items-center justify-center rounded cursor-pointer text-lg"
                    >
                        +
                    </div>
                    <div
                        className="keyboard-key bg-white h-12 flex items-center justify-center rounded cursor-pointer text-lg"
                    >
                        7
                    </div>
                    <div
                        className="keyboard-key bg-white h-12 flex items-center justify-center rounded cursor-pointer text-lg"
                    >
                        8
                    </div>
                    <div
                        className="keyboard-key bg-white h-12 flex items-center justify-center rounded cursor-pointer text-lg"
                    >
                        9
                    </div>
                    <div
                        className="keyboard-key bg-white h-12 flex items-center justify-center rounded cursor-pointer text-lg"
                    >
                        -
                    </div>
                    <div
                        className="keyboard-key bg-white h-12 flex items-center justify-center rounded cursor-pointer text-lg"
                    >
                        .
                    </div>
                    <div
                        className="keyboard-key bg-white h-12 flex items-center justify-center rounded cursor-pointer text-lg"
                    >
                        0
                    </div>
                    <div
                        className="keyboard-key bg-primary h-12 flex items-center justify-center rounded-button cursor-pointer text-white col-span-2"
                    >
                        保存
                    </div>
                </div>
            </div>
        </div>
    </Popup>
}