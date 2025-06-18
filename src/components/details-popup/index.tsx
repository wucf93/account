import { useAtom } from 'jotai';
import { Popup, } from "antd-mobile";
import { detailsPopupInfo, DetailsType, INITIAL_DETAILS_POPUP_INFO, type DetailsPopupInfo, } from './atom';
import Keyboard from './components/keyboard';
import Switch from '../switch-btn';
import CategorySelect from './components/category-select';


export default function ModifyDetailsModal() {
    const [info, setInfo] = useAtom(detailsPopupInfo);

    return (
        <Popup
            visible={info.visible}
            bodyStyle={{ borderTopLeftRadius: '16px', borderTopRightRadius: '16px', maxHeight: '100vh' }}
            onClose={() => setInfo(INITIAL_DETAILS_POPUP_INFO)}
            onMaskClick={() => setInfo(INITIAL_DETAILS_POPUP_INFO)}
            destroyOnClose
        >
            <div className="h-full flex flex-col">
                {/* 输入区域 */}
                <div className="flex-1 px-4">
                    {/* 金额输入 */}
                    <div className="mt-2 mb-4 text-center">
                        <div className="text-sm text-gray-500 mb-2">金额</div>
                        <div className="text-3xl font-medium">
                            ¥ <span>{info.account}</span>
                        </div>
                    </div>

                    {/* 类型切换 */}
                    <div className="mb-4 flex justify-between">
                        <Switch<DetailsPopupInfo["type"]>
                            value={info.type}
                            onChange={val => setInfo({ ...info, type: val })}
                            options={[
                                { label: "支出", value: DetailsType["Expenditure"] },
                                { label: "收入", value: DetailsType["Income"] },
                            ]}
                        />
                    </div>

                    {/* 分类选择 */}
                    <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-3">分类</div>
                        <CategorySelect type={info.type} />
                    </div>

                    {/* 备注 */}
                    <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-2">备注</div>
                        <input
                            placeholder="添加备注..."
                            className="w-full h-12 px-3 rounded-lg bg-white border-none shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>

                {/* 数字键盘 */}
                <div className="bg-gray-100 py-1">
                    <Keyboard
                        initialAccountValue={info.account}
                        onAccountChange={val => setInfo({ ...info, account: val })}
                        initialDateValue={info.date}
                        onDateChange={val => setInfo({ ...info, date: val })}
                        onSave={() => { }}
                    />
                </div>
            </div>
        </Popup>)
}