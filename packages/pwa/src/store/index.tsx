import { createContext, useContext, useState, type FC } from 'react'
import useSWR from 'swr'
import { getCategoryList, Category } from '@/apis'
import { authClient } from '@/lib'
import GlobalLoading from '@/components/global-loading'
import TransactionDialog from '@/components/transaction-dialog'

export type UserInfo = Awaited<
  (typeof authClient)['$Infer']['Session']['user'] | null
>

export interface GlobalStore {
  userInfo: UserInfo
  categoryConfigs: {
    expenditure: Category[]
    income: Category[]
  }
  /** 录入明细 */
  openTransactionDialog: () => void
}

export let globalStore: GlobalStore = {
  userInfo: null,
  categoryConfigs: { expenditure: [], income: [] },
  openTransactionDialog: () => {},
}

const GlobalContent = createContext<GlobalStore>({ ...globalStore })

interface GlobalProviderProps {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export const GlobalProvider: FC<GlobalProviderProps> = (props) => {
  const [open, setOpen] = useState(false)
  const {
    data: [categoryValue, userInfo] = [],
    isLoading,
    isValidating,
  } = useSWR('globalStore', () =>
    Promise.all([
      getCategoryList()
        .then((res) => res?.data?.data || ([] as Category[]))
        .catch(() => [] as Category[]),
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
    openTransactionDialog: () => setOpen(true),
  }

  globalStore = { ...store }

  return (
    <GlobalContent.Provider value={store}>
      {props.children}

      {/* 交易弹窗 */}
      <TransactionDialog open={open} onClose={() => setOpen(false)} />
    </GlobalContent.Provider>
  )
}

export const useGlobalStore = () => {
  return useContext(GlobalContent)
}
