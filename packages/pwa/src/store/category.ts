import { atom } from 'jotai'
import { loadable } from 'jotai/utils'
import { getListCategory } from '@/apis/Category'

export enum DetailsType {
  /** 收入 */
  Income = 'income',
  /** 支出 */
  Expenditure = 'expenditure',
}

export interface CategoryConfig {
  icon: string
  name: string
  color: string
}

export const expenditureCategoryAtom = loadable(
  atom(
    async () =>
      await getListCategory({
        type: DetailsType.Expenditure,
        per_page: 100,
      })
        .then((res) => res?.data?.result || [])
        .catch(() => [])
  )
)

export const incomeCategoryAtom = loadable(
  atom(
    async () =>
      await getListCategory({ type: DetailsType.Income, per_page: 100 })
        .then((res) => res?.data?.result || [])
        .catch(() => [])
  )
)

export type CategoryType = Awaited<
  ReturnType<typeof getListCategory>
>['data']['result'][number]
