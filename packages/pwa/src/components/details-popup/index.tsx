import { useAtom } from 'jotai'
import { Popup, Toast } from 'antd-mobile'
import {
  detailsPopupInfo,
  DetailsType,
  getDefaultValue,
  type DetailsPopupInfo,
} from './atom'
import Keyboard from './components/keyboard'
import Switch from '../switch-btn'
import CategorySelect from './components/category-select'
import { useCallback } from 'react'
import { transactionControllerCreate } from '@/apis'
import { globalStore } from '@/store'

export default function ModifyDetailsModal() {
  const [info, setInfo] = useAtom(detailsPopupInfo)

  const onSaveHandle = useCallback(async () => {
    if (!Number(info.amount)) {
      return Toast.show({ content: '请输入金额' })
    }
    await transactionControllerCreate({
      body: {
        amount: Number(info.amount),
        categoryId: info.categoryId,
        transactionType: info.type,
        transactionDate: info.date.toString(),
        description: info.description,
      },
    }).then((res) => {
      if (res.data?.success) {
        info.onSuccess?.()
        setInfo(getDefaultValue())
      } else {
        Toast.show({ content: res.data?.message || '创建失败' })
      }
    })
  }, [info])

  return (
    <Popup
      visible={info.visible}
      bodyStyle={{
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
        maxHeight: '100vh',
      }}
      onClose={() => setInfo(getDefaultValue())}
      onMaskClick={() => setInfo(getDefaultValue())}
      destroyOnClose
    >
      <div className="h-full flex flex-col">
        {/* 输入区域 */}
        <div className="flex-1 px-4">
          {/* 金额输入 */}
          <div className="mt-2 mb-4 text-center">
            <div className="text-sm text-gray-500 mb-2">金额</div>
            <div className="text-3xl font-medium">
              ¥ <span>{info.amount}</span>
            </div>
          </div>

          {/* 类型切换 */}
          <div className="mb-4 flex justify-between">
            <Switch<DetailsPopupInfo['type']>
              value={info.type}
              onChange={(val) =>
                setInfo({
                  ...info,
                  type: val,
                  categoryId: globalStore.categoryConfigs[val]?.[0]?.id,
                })
              }
              options={[
                { label: '支出', value: DetailsType['Expenditure'] },
                { label: '收入', value: DetailsType['Income'] },
              ]}
            />
          </div>

          {/* 分类选择 */}
          <div className="mb-4">
            <div className="text-sm text-gray-500 mb-3">分类</div>
            <CategorySelect
              type={info.type}
              categoryId={info.categoryId}
              onCategoryChange={(val) => setInfo({ ...info, categoryId: val })}
            />
          </div>

          {/* 备注 */}
          <div className="mb-4">
            <div className="text-sm text-gray-500 mb-2">备注</div>
            <input
              value={info.description}
              onChange={(val) =>
                setInfo({ ...info, description: val.target.value })
              }
              placeholder="添加备注..."
              className="w-full h-12 px-3 rounded-lg bg-white border-none shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* 数字键盘 */}
        <div className="bg-gray-100 py-1">
          <Keyboard
            initialAccountValue={info.amount}
            onAccountChange={(val) => setInfo({ ...info, amount: val })}
            initialDateValue={info.date}
            onDateChange={(val) => setInfo({ ...info, date: val })}
            onSave={onSaveHandle}
          />
        </div>
      </div>
    </Popup>
  )
}
