export default function Statistics() {
    console.log("object");

    return <div className="px-4">
        {/* <!-- 时间筛选 --> */}
        <div className="mt-2 mb-4">
            <div className="bg-gray-100 p-1 rounded-full flex">
                <button
                    className="flex-1 py-1.5 px-3 rounded-full text-sm text-gray-500"
                >
                    日
                </button>
                <button
                    className="flex-1 py-1.5 px-3 rounded-full text-sm bg-white shadow-sm"
                >
                    周
                </button>
                <button
                    className="flex-1 py-1.5 px-3 rounded-full text-sm text-gray-500"
                >
                    月
                </button>
                <button
                    className="flex-1 py-1.5 px-3 rounded-full text-sm text-gray-500"
                >
                    年
                </button>
            </div>
        </div>

        {/* <!-- 收支总览 --> */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
                <div className="text-sm text-gray-500">2025年6月16日</div>
                <div className="flex items-center text-xs text-primary cursor-pointer">
                    <span>导出数据</span>
                    <i className="ri-download-line ml-1"></i>
                </div>
            </div>
            <div className="flex justify-between">
                <div>
                    <div className="text-xs text-gray-500 mb-1">收入</div>
                    <div className="text-lg font-medium income">¥ 0.00</div>
                </div>
                <div>
                    <div className="text-xs text-gray-500 mb-1">支出</div>
                    <div className="text-lg font-medium expense">¥ 328.50</div>
                </div>
                <div>
                    <div className="text-xs text-gray-500 mb-1">结余</div>
                    <div className="text-lg font-medium expense">¥ -328.50</div>
                </div>
            </div>
        </div>

        {/* <!-- 饼图 --> */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
                <div className="text-sm font-medium">支出分类占比</div>
                <div className="flex items-center space-x-2">
                    <div
                        className="w-6 h-6 flex items-center justify-center cursor-pointer"
                    >
                        <i className="ri-fullscreen-line text-gray-400"></i>
                    </div>
                </div>
            </div>
            <div id="pie-chart" className="w-full h-64"></div>
        </div>

        {/* <!-- 分类排行 --> */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="text-sm font-medium mb-3">支出排行</div>
            <div className="space-y-3">
                {/* <!-- 超市购物 --> */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                            <div
                                className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-2"
                            >
                                <i className="ri-shopping-bag-line text-red-500 ri-sm"></i>
                            </div>
                            <div className="text-sm">超市购物</div>
                        </div>
                        <div className="text-sm expense">¥245.00</div>
                    </div>
                    <div
                        className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden"
                    >
                        <div
                            className="h-full bg-red-500 rounded-full"
                            style={{ width: "75%" }}
                        ></div>
                    </div>
                </div>
                {/* <!-- 午餐 --> */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                            <div
                                className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2"
                            >
                                <i className="ri-restaurant-line text-primary ri-sm"></i>
                            </div>
                            <div className="text-sm">午餐</div>
                        </div>
                        <div className="text-sm expense">¥45.00</div>
                    </div>
                    <div
                        className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden"
                    >
                        <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: "14%" }}
                        ></div>
                    </div>
                </div>
                {/* <!-- 打车 --> */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                            <div
                                className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2"
                            >
                                <i className="ri-taxi-line text-purple-500 ri-sm"></i>
                            </div>
                            <div className="text-sm">打车</div>
                        </div>
                        <div className="text-sm expense">¥38.50</div>
                    </div>
                    <div
                        className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden"
                    >
                        <div
                            className="h-full bg-purple-500 rounded-full"
                            style={{ width: "11%" }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- 收入排行 --> */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="text-sm font-medium mb-3">收入排行</div>
            <div className="text-center py-6 text-gray-400">
                <div
                    className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-gray-100 rounded-full"
                >
                    <i className="ri-inbox-archive-line ri-xl"></i>
                </div>
                <div className="text-sm">今日暂无收入记录</div>
            </div>
        </div>
    </div>
}