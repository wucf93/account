import { useAtomValue } from 'jotai'
import { createContext, useContext, type FC } from 'react'
import { categoryAtom, type CategoryType } from './category'
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
  const categoryValue = useAtomValue(categoryAtom)

  if (categoryValue.state === 'loading') {
    return (
      <div className="h-screen w-screen flex items-center justify-center overflow-hidden">
        <SpinLoading color="primary" />
      </div>
    )
  }

  const store = {
    categoryConfigs: {
      expenditure:
        categoryValue.state === 'hasError'
          ? []
          : categoryValue.data.filter((item) => item.type === 'expenditure') ||
            [],
      income:
        categoryValue.state === 'hasError'
          ? []
          : categoryValue.data.filter((item) => item.type === 'income') || [],
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
