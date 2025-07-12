import { atom } from 'jotai'
import dayjs, { Dayjs } from 'dayjs'
import { globalStore } from '@/store'

export enum DetailsType {
  /** 收入 */
  Income = 'income',
  /** 支出 */
  Expenditure = 'expenditure',
}

export interface DetailsPopupInfo {
  visible: boolean
  id?: number
  transactionType: DetailsType
  amount: string
  transactionDate: Dayjs
  categoryId: number
  description: string
  onSuccess?: () => void
}

export const getDefaultValue = () => ({
  visible: false,
  transactionType: DetailsType.Expenditure,
  amount: '0',
  transactionDate: dayjs(),
  categoryId: globalStore.categoryConfigs?.[DetailsType.Expenditure]?.[0]?.id,
  description: '',
})

export const detailsPopupInfo = atom<DetailsPopupInfo>(getDefaultValue())
