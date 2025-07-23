import Page from '@/components/page'
import { useNavigate } from 'react-router-dom'
import Switch from '@/components/switch-btn'
import { globalStore } from '@/store'
import CategorySelect, { DetailsType } from './components/category-select'
import Keyboard from './components/keyboard'
import {
  transactionControllerCreate,
  transactionControllerUpdate,
} from '@/apis'
import { useCallback, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

interface DetailsPopupInfo {
  visible: boolean
  id?: number
  transactionType: DetailsType
  amount: string
  transactionDate: Dayjs
  categoryId: number
  description: string
  onSuccess?: () => void
}

const DEFAULT_INFO = {
  id: undefined,
  visible: false,
  transactionType: DetailsType.Expenditure,
  amount: '0',
  transactionDate: dayjs(),
  categoryId: globalStore.categoryConfigs?.[DetailsType.Expenditure]?.[0]?.id,
  description: '',
}

export default function TransactionPage() {
  const [info, setInfo] = useState(DEFAULT_INFO)
  const navigate = useNavigate()

  const onSaveHandle = useCallback(async () => {
    if (!Number(info.amount)) {
      return alert('请输入金额')
    }
    const body = {
      amount: Number(info.amount),
      categoryId: info.categoryId,
      transactionType: info.transactionType,
      transactionDate: info.transactionDate.toString(),
      description: info.description,
    }
    ;(info.id
      ? transactionControllerUpdate({ body, path: { id: String(info.id) } })
      : transactionControllerCreate({ body })
    ).then((res) => {
      if (res.data?.success) {
        alert('新增成功！')
        navigate(-1)
      } else {
        alert(res.data?.message || '操作失败')
      }
    })
  }, [info])

  return (
    <Page
      showBack
      title="新增明细"
      footer={
        <div className="bg-gray-100 py-1">
          <Keyboard
            initialAccountValue={info.amount}
            onAccountChange={(val) => setInfo({ ...info, amount: val })}
            initialDateValue={info.transactionDate}
            onDateChange={(val) => setInfo({ ...info, transactionDate: val })}
            onSave={onSaveHandle}
          />
        </div>
      }
      className="h-screen"
    >
      {/* 金额输入 */}
      <div className="mt-4 mb-4 text-center">
        <div className="text-sm text-gray-500 mb-2">金额</div>
        <div className="text-3xl font-medium">
          ¥ <span>{info.amount}</span>
        </div>
      </div>

      {/* 类型切换 */}
      <div className="mb-4 flex justify-between">
        <Switch<DetailsPopupInfo['transactionType']>
          value={info.transactionType}
          onChange={(val) =>
            setInfo({
              ...info,
              transactionType: val,
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
        <div className="text-sm px-4 text-gray-500 mb-3">分类</div>
        <CategorySelect
          type={info.transactionType}
          categoryId={info.categoryId}
          onCategoryChange={(val) => setInfo({ ...info, categoryId: val })}
        />
      </div>

      {/* 备注 */}
      <div className="mb-4 px-4">
        <div className="text-sm text-gray-500 mb-2">备注</div>
        <input
          value={info.description}
          onChange={(val) =>
            setInfo({ ...info, description: val.target.value })
          }
          placeholder="添加备注..."
          className="w-full h-12 px-3 rounded-lg bg-white border-none shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/80"
        />
      </div>
    </Page>
  )
}
