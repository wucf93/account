import ModifyDetailsModal from './components/details-popup'
import { GlobalProvider } from './store'
import { Outlet } from 'react-router-dom'
import { SWRConfig } from 'swr'

export default function App() {
  return (
    <SWRConfig value={{ revalidateOnFocus: false }}>
      <GlobalProvider>
        <Outlet />

        {/** 记账弹窗 */}
        <ModifyDetailsModal />
      </GlobalProvider>
    </SWRConfig>
  )
}
