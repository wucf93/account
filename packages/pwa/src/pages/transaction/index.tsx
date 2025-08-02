import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalStore } from '@/store'
import classnames from 'classnames'
import { dayjs } from '@/lib'
import Page from '@/components/page'
import { postTransactionCreate } from '@/apis/sdk.gen'
import type { TransactionCreateInput } from '@/apis/types.gen'

// 交易类型选项
const TRANSACTION_TYPES = [
  { value: 'income' as const, label: '收入' },
  { value: 'expenditure' as const, label: '支出' },
]

export default function TransactionPage() {
  const navigate = useNavigate()
  const { categoryConfigs } = useGlobalStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<TransactionCreateInput>({
    amount: '',
    transactionType: 'expenditure',
    transactionDate: dayjs().format('YYYY-MM-DD'),
    description: '',
    categoryId: categoryConfigs.expenditure[0]?.id || 0,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // 处理输入变化
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'transactionType'
          ? value
          : name === 'categoryId'
            ? Number(value)
            : name === 'amount'
              ? value || ''
              : value,
    }))
    // 清除对应字段的错误
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // 验证表单
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (
      !formData.amount ||
      isNaN(Number(formData.amount)) ||
      Number(formData.amount) <= 0
    ) {
      newErrors.amount = '请输入有效的金额'
    }

    if (!formData.categoryId || formData.categoryId <= 0) {
      newErrors.categoryId = '请选择分类'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 处理表单提交
  const handleSubmit = async () => {
    if (!validateForm()) return

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
      navigate(-1)
    } catch (error) {
      console.error('Failed to create transaction:', error)
      alert('保存失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  // 根据交易类型筛选分类
  const filteredCategories = useMemo(
    () =>
      formData.transactionType === 'expenditure'
        ? categoryConfigs.expenditure
        : categoryConfigs.income,
    [categoryConfigs, formData.transactionType]
  )

  return (
    <Page
      showBack
      title="添加账单"
      footer={
        <div className="p-4 h-full w-full">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={classnames(
              'w-full py-3 rounded-lg font-medium transition-all duration-300',
              loading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            )}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <i className="ri-loader-2-line animate-spin" />
                <span>保存中...</span>
              </div>
            ) : (
              '保存账单'
            )}
          </button>
        </div>
      }
    >
      {/* 金额 */}
      <div className="rounded-xl bg-white shadow-2xl dark:bg-gray-900 p-5">
        <div className="text-sm text-gray-500 mb-2 dark:text-gray-400">
          金额（元）
        </div>
        <div className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span className="text-lg">¥</span>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="0"
            className={classnames(
              'flex-1 text-3xl font-bold bg-transparent focus:outline-none ml-1',
              'dark:text-white placeholder-gray-400 dark:placeholder-gray-500',
              errors.amount ? 'text-red-500' : 'text-gray-900'
            )}
            step="0.01"
            min="0"
          />
        </div>
        {errors.amount && (
          <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
        )}
      </div>

      {/* 交易类型 */}
      <div className="rounded-xl bg-white shadow-lg dark:bg-gray-900 p-5 mt-5">
        <div className="text-sm text-gray-500 mb-3 dark:text-gray-400">
          交易类型
        </div>
        <div className="flex w-full rounded-lg bg-gray-100 p-1 dark:bg-gray-700">
          {TRANSACTION_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              className={classnames(
                'flex-1 rounded-md py-2.5 font-medium transition-all duration-200 text-sm',
                formData.transactionType === type.value
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600'
              )}
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  transactionType: type.value,
                }))
              }
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* 日期 */}
      <div className="rounded-xl bg-white shadow-lg dark:bg-gray-900 p-5 mt-5">
        <div className="text-sm text-gray-500 mb-2 dark:text-gray-400">
          日期
        </div>
        <input
          type="date"
          name="transactionDate"
          value={
            dayjs(formData.transactionDate).local().format('YYYY-MM-DD') || ''
          }
          onChange={handleInputChange}
          max={new Date().toISOString().split('T')[0]}
          className={classnames(
            'w-full px-4 py-3 rounded-lg border focus:outline-none transition-all duration-200',
            'dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-500',
            errors.transactionDate ? 'border-red-500' : 'border-gray-300'
          )}
        />
        {errors.transactionDate && (
          <p className="mt-1 text-sm text-red-500">{errors.transactionDate}</p>
        )}
      </div>

      {/* 分类 */}
      <div className="rounded-xl bg-white shadow-lg dark:bg-gray-900 p-5 mt-5">
        <div className="text-sm text-gray-500 mb-2 dark:text-gray-400">
          分类
        </div>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleInputChange}
          className={classnames(
          'w-full px-4 py-3 pr-10 rounded-lg border focus:outline-none transition-all duration-200 appearance-none bg-white dark:bg-gray-700',
          'dark:border-gray-600 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-500',
          errors.categoryId ? 'border-red-500' : 'border-gray-300'
        )}
        >
          {filteredCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="mt-1 text-sm text-red-500">{errors.categoryId}</p>
        )}
      </div>

      {/* 备注 */}
      <div className="rounded-xl bg-white shadow-lg dark:bg-gray-900 p-5 mt-5">
        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          备注 (可选)
        </label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleInputChange}
          placeholder="请输入备注信息"
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>
    </Page>
  )
}
