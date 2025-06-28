import { useAtomValue } from 'jotai'
import { createContext, useContext, type FC } from 'react'
import {
  expenditureCategoryAtom,
  incomeCategoryAtom,
  type CategoryType,
} from './category'
import { SpinLoading } from 'antd-mobile'

export interface GlobalStore {
  categoryConfigs: {
    expenditure: CategoryType[]
    income: CategoryType[]
  }
}

export let globalStore: GlobalStore = {
  categoryConfigs: { expenditure: [], income: [] },
}

const GlobalContent = createContext<GlobalStore>({
  categoryConfigs: { expenditure: [], income: [] },
})

export const GlobalProvider: FC<{ children: React.ReactNode }> = (props) => {
  const expenditureCategory = useAtomValue(expenditureCategoryAtom)
  const incomeCategory = useAtomValue(incomeCategoryAtom)

  if (
    expenditureCategory.state === 'loading' ||
    incomeCategory.state === 'loading'
  ) {
    return (
      <div className="h-screen w-screen flex items-center justify-center overflow-hidden">
        <SpinLoading color="primary" />
      </div>
    )
  }

  const store = {
    categoryConfigs: {
      expenditure:
        expenditureCategory.state === 'hasError'
          ? []
          : expenditureCategory.data || [],
      income:
        incomeCategory.state === 'hasError' ? [] : incomeCategory.data || [],
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

export { CategoryType }
