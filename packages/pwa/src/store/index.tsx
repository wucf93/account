import { createContext, useContext, type FC } from 'react'
import { SpinLoading } from 'antd-mobile'
import useSWR from 'swr'
import { getCategoryListRoute } from '@/apis/Category'
import { authClient } from '@/lib'

export type CategoryType = Awaited<
  ReturnType<typeof getCategoryListRoute>
>['data']['result'][number]

export type UserInfo = Awaited<
  (typeof authClient)['$Infer']['Session']['user'] | null
>

export interface GlobalStore {
  userInfo: UserInfo
  categoryConfigs: {
    expenditure: CategoryType[]
    income: CategoryType[]
  }
}

export let globalStore: GlobalStore = {
  userInfo: null,
  categoryConfigs: { expenditure: [], income: [] },
}

const GlobalContent = createContext<GlobalStore>({ ...globalStore })

export const GlobalProvider: FC<{ children: React.ReactNode }> = (props) => {
  const {
    data: [categoryValue, userInfo] = [],
    isLoading,
    isValidating,
  } = useSWR('globalStore', () =>
    Promise.all([
      getCategoryListRoute()
        .then((res) => res?.data?.result || ([] as CategoryType[]))
        .catch(() => [] as CategoryType[]),
      authClient
        .getSession()
        .then((res) => res.data?.user || null)
        .catch(() => null),
    ])
  )

  if (isLoading || isValidating) {
    return (
      <div className="h-screen w-screen flex items-center justify-center overflow-hidden">
        <SpinLoading color="primary" />
      </div>
    )
  }

  const store = {
    userInfo: userInfo || null,
    categoryConfigs: {
      expenditure:
        categoryValue?.filter((item) => item.type === 'expenditure') || [],
      income: categoryValue?.filter((item) => item.type === 'income') || [],
    },
  }

  globalStore = { ...store }

  return (
    <GlobalContent.Provider value={store}>
      {props.children}
    </GlobalContent.Provider>
  )
}

export const useGlobalStore = () => {
  return useContext(GlobalContent)
}
