import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalStore } from '@/store'
import { Dialog, DialogPanel, DialogTitle, Input } from '@headlessui/react'
import { dayjs } from '@/lib'
import classnames from 'classnames'
import Switch from '../switch-btn'
import DatePicker from '../date-picker'
import { Dayjs } from 'dayjs'
import KeyPress from './components/keypress'
import { postTransactionCreate } from '@/apis/sdk.gen'
import type { TransactionCreateInput } from '@/apis/types.gen'
import CategorySelect from './components/category-select'

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
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormDataProps>({
    amount: '',
    transactionType: 'expenditure',
    transactionDate: dayjs(),
    description: '',
    categoryId: categoryConfigs.expenditure[0]?.id || 0,
  })
  const navigate = useNavigate()

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

  const handleSubmit = async () => {
    if (!formData.amount || formData.amount === '0') {
      return
    }

    try {
      setLoading(true)
      await postTransactionCreate({
        body: {
          ...formData,
          transactionDate: dayjs
            .tz(formData.transactionDate, 'utc')
            .toISOString(),
        },
      })
      setLoading(false)
      props.onClose(true)
    } catch (error) {
      console.log(error)
      setLoading(false)
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
              <div
                className="w-12 text-indigo-500 text-right"
                onClick={() => navigate('/ocr')}
              >
                <i className="ri-image-ai-line"></i>
              </div>
            </DialogTitle>

            {/* 分类选择 */}
            <CategorySelect
              value={formData.categoryId}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  categoryId: value,
                }))
              }
              transactionType={formData.transactionType}
              className="mt-4"
            />

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
              <KeyPress
                value={formData.amount || ''}
                transactionType={formData.transactionType}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, amount: value }))
                }
                onDone={handleSubmit}
                loading={loading}
                className="mt-2"
              />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
