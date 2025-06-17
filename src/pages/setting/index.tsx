import { Link } from 'react-router-dom'

export default function Statistics() {
    return <div className="px-4">
        {/* <!-- 用户信息 --> */}
        <div className="mt-4 mb-6">
            <div className="flex items-center">
                <div
                    className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mr-4"
                >
                    <i className="ri-user-3-line ri-2x text-gray-400"></i>
                </div>
                <div className="flex-1">
                    <div className="text-lg font-medium mb-1">未设置昵称</div>
                    <div className="text-sm text-gray-500">点击设置个人信息</div>
                </div>
                <div className="w-8 h-8 flex items-center justify-center">
                    <i className="ri-arrow-right-s-line text-gray-400"></i>
                </div>
            </div>
        </div>
        {/* 功能列表 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <Link
                to="/category"
                className="flex items-center p-4 border-b border-gray-100 cursor-pointer"
            >
                <div
                    className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3"
                >
                    <i className="ri-wallet-3-line text-primary"></i>
                </div>
                <div className="flex-1">
                    <div className="text-base text-gray-700">收支类型管理</div>
                </div>
                <div className="w-8 h-8 flex items-center justify-center">
                    <i className="ri-arrow-right-s-line text-gray-400"></i>
                </div>
            </Link>
            <div
                className="flex items-center p-4 border-b border-gray-100 cursor-pointer"
            >
                <div
                    className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3"
                >
                    <i className="ri-bank-card-line text-purple-500"></i>
                </div>
                <div className="flex-1">
                    <div className="text-base">账户管理</div>
                </div>
                <div className="w-8 h-8 flex items-center justify-center">
                    <i className="ri-arrow-right-s-line text-gray-400"></i>
                </div>
            </div>
            <div
                className="flex items-center p-4 border-b border-gray-100 cursor-pointer"
            >
                <div
                    className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center mr-3"
                >
                    <i className="ri-notification-3-line text-yellow-500"></i>
                </div>
                <div className="flex-1">
                    <div className="text-base">提醒设置</div>
                </div>
                <div className="w-8 h-8 flex items-center justify-center">
                    <i className="ri-arrow-right-s-line text-gray-400"></i>
                </div>
            </div>
            <div className="flex items-center p-4 cursor-pointer">
                <div
                    className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mr-3"
                >
                    <i className="ri-shield-keyhole-line text-green-500"></i>
                </div>
                <div className="flex-1">
                    <div className="text-base">隐私设置</div>
                </div>
                <div className="w-8 h-8 flex items-center justify-center">
                    <i className="ri-arrow-right-s-line text-gray-400"></i>
                </div>
            </div>
        </div>
        {/* <!-- 其他设置 --> */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div
                className="flex items-center p-4 border-b border-gray-100 cursor-pointer"
            >
                <div
                    className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3"
                >
                    <i className="ri-customer-service-line text-gray-500"></i>
                </div>
                <div className="flex-1">
                    <div className="text-base">帮助与反馈</div>
                </div>
                <div className="w-8 h-8 flex items-center justify-center">
                    <i className="ri-arrow-right-s-line text-gray-400"></i>
                </div>
            </div>
            <div
                className="flex items-center p-4 border-b border-gray-100 cursor-pointer"
            >
                <div
                    className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3"
                >
                    <i className="ri-information-line text-gray-500"></i>
                </div>
                <div className="flex-1">
                    <div className="text-base">关于我们</div>
                </div>
                <div className="w-8 h-8 flex items-center justify-center">
                    <i className="ri-arrow-right-s-line text-gray-400"></i>
                </div>
            </div>
            <div className="flex items-center p-4 cursor-pointer">
                <div
                    className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3"
                >
                    <i className="ri-logout-box-r-line text-red-500"></i>
                </div>
                <div className="flex-1">
                    <div className="text-base text-red-500">退出登录</div>
                </div>
            </div>
        </div>
    </div>
}