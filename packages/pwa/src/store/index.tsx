import { createContext, useContext, type FC } from 'react'
import useSWR from 'swr'
import { categoryControllerFindAll, CategoryEntity } from '@/apis'
import { authClient } from '@/lib'
import classNames from 'classnames'
import GlobalLoading from '@/components/global-loading'

export type UserInfo = Awaited<
  (typeof authClient)['$Infer']['Session']['user'] | null
>

export interface GlobalStore {
  userInfo: UserInfo
  categoryConfigs: {
    expenditure: CategoryEntity[]
    income: CategoryEntity[]
  }
}

export let globalStore: GlobalStore = {
  userInfo: null,
  categoryConfigs: { expenditure: [], income: [] },
}

const GlobalContent = createContext<GlobalStore>({ ...globalStore })

interface GlobalProviderProps {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export const GlobalProvider: FC<GlobalProviderProps> = (props) => {
  const {
    data: [categoryValue, userInfo] = [],
    isLoading,
    isValidating,
  } = useSWR('globalStore', () =>
    Promise.all([
      categoryControllerFindAll()
        .then((res) => res?.data?.data || ([] as CategoryEntity[]))
        .catch(() => [] as CategoryEntity[]),
      authClient
        .getSession()
        .then((res) => res.data?.user || null)
        .catch(() => null),
    ])
  )

  if (isLoading || isValidating) {
    return <GlobalLoading />
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
      <div
        className={classNames('min-h-screen', props.className)}
        style={props.style}
      >
        {props.children}
      </div>
    </GlobalContent.Provider>
  )
}

export const useGlobalStore = () => {
  return useContext(GlobalContent)
}
