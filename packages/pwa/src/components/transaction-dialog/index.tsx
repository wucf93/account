import { useMemo, useState } from 'react'
import { useGlobalStore } from '@/store'
import { Dialog, DialogPanel, DialogTitle, Input } from '@headlessui/react'
import { dayjs } from '@/lib'
import classnames from 'classnames'
import { postTransactionCreate } from '@/apis/sdk.gen'
import type { TransactionCreateInput } from '@/apis/types.gen'
import Switch from '../switch-btn'
import DatePicker from '../date-picker'
import { Dayjs } from 'dayjs'

interface TransactionDialogProps {
  open: boolean
  onClose: (value: boolean) => void
}

interface FormDataProps
  extends Omit<TransactionCreateInput, 'transactionDate'> {
  transactionDate: Dayjs
}

const TRANSACTION_TYPES = [
  { value: 'income' as const, label: '收入' },
  { value: 'expenditure' as const, label: '支出' },
]

export default function TransactionDialog(props: TransactionDialogProps) {
  const { categoryConfigs } = useGlobalStore()
  const [formData, setFormData] = useState<FormDataProps>({
    amount: '',
    transactionType: 'expenditure',
    transactionDate: dayjs(),
    description: '',
    categoryId: categoryConfigs.expenditure[0]?.id || 0,
  })

  // 根据交易类型筛选分类
  const filteredCategories = useMemo(
    () =>
      formData.transactionType === 'expenditure'
        ? categoryConfigs.expenditure
        : categoryConfigs.income,
    [categoryConfigs, formData.transactionType]
  )

  // 处理交易类型变更
  const handleTransactionTypeChange = (type: 'income' | 'expenditure') => {
    setFormData((prev) => ({
      ...prev,
      transactionType: type,
      categoryId:
        type === 'expenditure'
          ? categoryConfigs.expenditure[0]?.id || 0
          : categoryConfigs.income[0]?.id || 0,
    }))
  }

  // 键盘组件的点击处理
  const handleKeyPress = (key: string) => {
    if (key === 'del') {
      setFormData((prev) => ({
        ...prev,
        amount: prev.amount.slice(0, -1),
      }))
      return
    }

    if (key === '.') {
      // 确保只有一个小数点
      if (!formData.amount.includes('.')) {
        setFormData((prev) => ({
          ...prev,
          amount: prev.amount ? prev.amount + '.' : '0.',
        }))
      }
      return
    }

    if (key >= '0' && key <= '9') {
      // 检查是否已经有小数点，并且小数点后已有两位数字
      const decimalIndex = formData.amount.indexOf('.')
      if (decimalIndex !== -1 && formData.amount.length - decimalIndex > 2) {
        // 已经有两位小数，不添加新数字
        return
      }
      setFormData((prev) => ({
        ...prev,
        amount: prev.amount === '0' ? key : prev.amount + key,
      }))
    }
  }

  return (
    <Dialog
      as="div"
      className="relative z-10 focus:outline-none"
      open={props.open}
      onClose={props.onClose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-hidden bg-black/5 dark:bg-white/5 backdrop-blur-2xl">
        <div className="flex min-h-full items-center justify-center p-6">
          <DialogPanel className="global-bg-color w-full max-w-md rounded-xl">
            <DialogTitle className="flex justify-between items-center p-2 px-4">
              <div
                className="w-12 text-sm text-zinc-500"
                onClick={() => props.onClose(false)}
              >
                取消
              </div>
              <Switch
                options={TRANSACTION_TYPES}
                value={formData.transactionType}
                onChange={handleTransactionTypeChange}
              />
              <div className="w-12" />
            </DialogTitle>

            <div className="mt-4 grid grid-cols-5 gap-y-4 max-h-[30vh] overscroll-y-auto overflow-x-hidden px-4">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex flex-col items-center"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      categoryId: category.id,
                    }))
                  }
                >
                  <div
                    className={classnames(
                      'w-10 h-10 rounded-full flex items-center justify-center text-lg ',
                      formData.categoryId === category.id
                        ? formData.transactionType === 'expenditure'
                          ? 'bg-rose-500'
                          : 'bg-green-500'
                        : 'global-bg-soft-color'
                    )}
                  >
                    <i className={category.icon} />
                  </div>
                  <span className="mt-2 text-xs">{category.name}</span>
                </div>
              ))}
            </div>

            <div className="p-4">
              <div className="rounded-lg global-bg-soft-color px-3 divide-y divide-zinc-950/10 dark:divide-white/10">
                <div
                  className={classnames(
                    'text-xl font-semibold py-2',
                    formData.transactionType === 'expenditure'
                      ? 'text-rose-500'
                      : 'text-green-500'
                  )}
                >
                  <span className="mr-1">¥</span>
                  <span>{formData.amount || 0}</span>
                </div>
                <div className="py-2 text-xs flex items-center">
                  <DatePicker
                    value={formData.transactionDate}
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        transactionDate: value,
                      }))
                    }
                    max={dayjs()}
                    type="datetime"
                    className="flex-none mr-2"
                  >
                    <div className="global-bg-color rounded-full py-1 px-2.5">
                      <i className="ri-time-line mr-1" />
                      <span>
                        {formData.transactionDate?.local().format('HH:mm')}
                      </span>
                    </div>
                  </DatePicker>
                  <Input
                    placeholder="备注信息"
                    value={formData.description || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    maxLength={100}
                    className="flex-auto focus:outline-none"
                  />
                </div>
              </div>

              {/* 数字键盘 - 模仿图片中的键盘设计 */}
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[
                  '1',
                  '2',
                  '3',
                  '+',
                  '4',
                  '5',
                  '6',
                  '-',
                  '7',
                  '8',
                  '9',
                  '×',
                  '0',
                  '.',
                ].map((key) => (
                  <button
                    key={key}
                    onClick={() => handleKeyPress(key)}
                    className="w-full h-10 rounded-lg global-bg-soft-color flex items-center justify-center text-xl font-semibold"
                  >
                    {key}
                  </button>
                ))}
                <button
                  onClick={() => handleKeyPress('del')}
                  className="w-full h-10 rounded-lg global-bg-soft-color flex items-center justify-center text-lg font-semibold"
                >
                  <i className="ri-delete-back-2-line" />
                </button>
                <button className="w-full h-10 rounded-lg global-bg-soft-color flex items-center justify-center text-sm font-semibold">
                  完成
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
