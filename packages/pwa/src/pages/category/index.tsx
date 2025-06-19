export default function CategoryPage() {
    return <div>
        <div className="pt-[60px] pb-[20px]">
            {/* 类型切换选项卡 */}
            <div className="px-4 pt-2">
                <div className="relative bg-gray-100 rounded-full p-1 flex">
                    <button
                        id="expense-tab"
                        className="flex-1 py-2.5 px-4 rounded-full bg-white text-primary font-medium text-sm shadow-sm"
                    >
                        支出
                    </button>
                    <button
                        id="income-tab"
                        className="flex-1 py-2.5 px-4 rounded-full text-gray-500 text-sm"
                    >
                        收入
                    </button>
                    <div
                        className="tab-indicator absolute h-full w-1/2 bg-transparent top-0 left-0 pointer-events-none"
                    ></div>
                </div>
            </div>

            {/* 支出类型列表 */}
            <div id="expense-list" className="px-4 mt-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-500">长按可拖动排序</div>
                    <div
                        className="text-sm text-primary cursor-pointer"
                        id="edit-mode-toggle"
                    >
                        编辑
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="category-list">
                        {/* 餐饮 */}
                        <div
                            className="category-item flex items-center p-4 border-b border-gray-100 cursor-pointer"
                            draggable="true"
                            data-id="1"
                        >
                            <div
                                className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3"
                            >
                                <i className="ri-restaurant-line text-primary ri-lg"></i>
                            </div>
                            <div className="flex-1 font-medium">餐饮</div>
                            <div
                                className="delete-btn w-8 h-8 flex items-center justify-center text-gray-400 cursor-pointer"
                            >
                                <i className="ri-delete-bin-line"></i>
                            </div>
                            <div
                                className="drag-handle w-8 h-8 flex items-center justify-center text-gray-400 cursor-grab"
                            >
                                <i className="ri-drag-move-line"></i>
                            </div>
                        </div>

                        {/* 购物 */}
                        <div
                            className="category-item flex items-center p-4 border-b border-gray-100 cursor-pointer"
                            draggable="true"
                            data-id="2"
                        >
                            <div
                                className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3"
                            >
                                <i className="ri-shopping-bag-line text-red-500 ri-lg"></i>
                            </div>
                            <div className="flex-1 font-medium">购物</div>
                            <div
                                className="delete-btn w-8 h-8 flex items-center justify-center text-gray-400 cursor-pointer"
                            >
                                <i className="ri-delete-bin-line"></i>
                            </div>
                            <div
                                className="drag-handle w-8 h-8 flex items-center justify-center text-gray-400 cursor-grab"
                            >
                                <i className="ri-drag-move-line"></i>
                            </div>
                        </div>

                        {/* 交通 */}
                        <div
                            className="category-item flex items-center p-4 border-b border-gray-100 cursor-pointer"
                            draggable="true"
                            data-id="3"
                        >
                            <div
                                className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3"
                            >
                                <i className="ri-taxi-line text-purple-500 ri-lg"></i>
                            </div>
                            <div className="flex-1 font-medium">交通</div>
                            <div
                                className="delete-btn w-8 h-8 flex items-center justify-center text-gray-400 cursor-pointer"
                            >
                                <i className="ri-delete-bin-line"></i>
                            </div>
                            <div
                                className="drag-handle w-8 h-8 flex items-center justify-center text-gray-400 cursor-grab"
                            >
                                <i className="ri-drag-move-line"></i>
                            </div>
                        </div>

                        {/* 住房 */}
                        <div
                            className="category-item flex items-center p-4 border-b border-gray-100 cursor-pointer"
                            draggable="true"
                            data-id="4"
                        >
                            <div
                                className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3"
                            >
                                <i className="ri-home-line text-yellow-500 ri-lg"></i>
                            </div>
                            <div className="flex-1 font-medium">住房</div>
                            <div
                                className="delete-btn w-8 h-8 flex items-center justify-center text-gray-400 cursor-pointer"
                            >
                                <i className="ri-delete-bin-line"></i>
                            </div>
                            <div
                                className="drag-handle w-8 h-8 flex items-center justify-center text-gray-400 cursor-grab"
                            >
                                <i className="ri-drag-move-line"></i>
                            </div>
                        </div>

                        {/* 医疗 */}
                        <div
                            className="category-item flex items-center p-4 border-b border-gray-100 cursor-pointer"
                            draggable="true"
                            data-id="5"
                        >
                            <div
                                className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3"
                            >
                                <i className="ri-heart-pulse-line text-green-500 ri-lg"></i>
                            </div>
                            <div className="flex-1 font-medium">医疗</div>
                            <div
                                className="delete-btn w-8 h-8 flex items-center justify-center text-gray-400 cursor-pointer"
                            >
                                <i className="ri-delete-bin-line"></i>
                            </div>
                            <div
                                className="drag-handle w-8 h-8 flex items-center justify-center text-gray-400 cursor-grab"
                            >
                                <i className="ri-drag-move-line"></i>
                            </div>
                        </div>

                        {/* 教育 */}
                        <div
                            className="category-item flex items-center p-4 border-b border-gray-100 cursor-pointer"
                            draggable="true"
                            data-id="6"
                        >
                            <div
                                className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3"
                            >
                                <i className="ri-book-line text-orange-500 ri-lg"></i>
                            </div>
                            <div className="flex-1 font-medium">教育</div>
                            <div
                                className="delete-btn w-8 h-8 flex items-center justify-center text-gray-400 cursor-pointer"
                            >
                                <i className="ri-delete-bin-line"></i>
                            </div>
                            <div
                                className="drag-handle w-8 h-8 flex items-center justify-center text-gray-400 cursor-grab"
                            >
                                <i className="ri-drag-move-line"></i>
                            </div>
                        </div>

                        {/* 娱乐 */}
                        <div
                            className="category-item flex items-center p-4 border-b border-gray-100 cursor-pointer"
                            draggable="true"
                            data-id="7"
                        >
                            <div
                                className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3"
                            >
                                <i className="ri-movie-line text-blue-500 ri-lg"></i>
                            </div>
                            <div className="flex-1 font-medium">娱乐</div>
                            <div
                                className="delete-btn w-8 h-8 flex items-center justify-center text-gray-400 cursor-pointer"
                            >
                                <i className="ri-delete-bin-line"></i>
                            </div>
                            <div
                                className="drag-handle w-8 h-8 flex items-center justify-center text-gray-400 cursor-grab"
                            >
                                <i className="ri-drag-move-line"></i>
                            </div>
                        </div>

                        {/* 服饰 */}
                        <div
                            className="category-item flex items-center p-4 cursor-pointer"
                            draggable="true"
                            data-id="8"
                        >
                            <div
                                className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3"
                            >
                                <i className="ri-t-shirt-line text-pink-500 ri-lg"></i>
                            </div>
                            <div className="flex-1 font-medium">服饰</div>
                            <div
                                className="delete-btn w-8 h-8 flex items-center justify-center text-gray-400 cursor-pointer"
                            >
                                <i className="ri-delete-bin-line"></i>
                            </div>
                            <div
                                className="drag-handle w-8 h-8 flex items-center justify-center text-gray-400 cursor-grab"
                            >
                                <i className="ri-drag-move-line"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 收入类型列表 */}
            <div id="income-list" className="px-4 mt-6 hidden">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-500">长按可拖动排序</div>
                    <div
                        className="text-sm text-primary cursor-pointer"
                        id="income-edit-mode-toggle"
                    >
                        编辑
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="category-list">
                        {/* 工资 */}
                        <div
                            className="category-item flex items-center p-4 border-b border-gray-100 cursor-pointer"
                            draggable="true"
                            data-id="101"
                        >
                            <div
                                className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3"
                            >
                                <i className="ri-bank-card-line text-green-500 ri-lg"></i>
                            </div>
                            <div className="flex-1 font-medium">工资</div>
                            <div
                                className="delete-btn w-8 h-8 flex items-center justify-center text-gray-400 cursor-pointer"
                            >
                                <i className="ri-delete-bin-line"></i>
                            </div>
                            <div
                                className="drag-handle w-8 h-8 flex items-center justify-center text-gray-400 cursor-grab"
                            >
                                <i className="ri-drag-move-line"></i>
                            </div>
                        </div>

                        {/* 奖金 */}
                        <div
                            className="category-item flex items-center p-4 border-b border-gray-100 cursor-pointer"
                            draggable="true"
                            data-id="102"
                        >
                            <div
                                className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3"
                            >
                                <i className="ri-red-packet-line text-primary ri-lg"></i>
                            </div>
                            <div className="flex-1 font-medium">奖金</div>
                            <div
                                className="delete-btn w-8 h-8 flex items-center justify-center text-gray-400 cursor-pointer"
                            >
                                <i className="ri-delete-bin-line"></i>
                            </div>
                            <div
                                className="drag-handle w-8 h-8 flex items-center justify-center text-gray-400 cursor-grab"
                            >
                                <i className="ri-drag-move-line"></i>
                            </div>
                        </div>

                        {/* 报销 */}
                        <div
                            className="category-item flex items-center p-4 border-b border-gray-100 cursor-pointer"
                            draggable="true"
                            data-id="103"
                        >
                            <div
                                className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3"
                            >
                                <i className="ri-refund-2-line text-yellow-500 ri-lg"></i>
                            </div>
                            <div className="flex-1 font-medium">报销</div>
                            <div
                                className="delete-btn w-8 h-8 flex items-center justify-center text-gray-400 cursor-pointer"
                            >
                                <i className="ri-delete-bin-line"></i>
                            </div>
                            <div
                                className="drag-handle w-8 h-8 flex items-center justify-center text-gray-400 cursor-grab"
                            >
                                <i className="ri-drag-move-line"></i>
                            </div>
                        </div>

                        {/* 礼金 */}
                        <div
                            className="category-item flex items-center p-4 cursor-pointer"
                            draggable="true"
                            data-id="104"
                        >
                            <div
                                className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3"
                            >
                                <i className="ri-gift-line text-purple-500 ri-lg"></i>
                            </div>
                            <div className="flex-1 font-medium">礼金</div>
                            <div
                                className="delete-btn w-8 h-8 flex items-center justify-center text-gray-400 cursor-pointer"
                            >
                                <i className="ri-delete-bin-line"></i>
                            </div>
                            <div
                                className="drag-handle w-8 h-8 flex items-center justify-center text-gray-400 cursor-grab"
                            >
                                <i className="ri-drag-move-line"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 添加按钮 */}
            <div className="px-4 mt-8">
                <button
                    id="add-category-btn"
                    className="w-full h-12 bg-primary text-white rounded-button flex items-center justify-center font-medium"
                >
                    <i className="ri-add-line mr-2"></i>添加类型
                </button>
            </div>
        </div>
    </div>
}