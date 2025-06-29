import { atom } from 'jotai'
import { loadable } from 'jotai/utils'
import { getCategoryListRoute } from '@/apis/Category'

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

export const categoryAtom = loadable(
  atom(
    async () =>
      await getCategoryListRoute()
        .then((res) => res?.data?.result || [])
        .catch(() => [])
  )
)

export type CategoryType = Awaited<
  ReturnType<typeof getCategoryListRoute>
>['data']['result'][number]
