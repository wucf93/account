import { GlobalProvider } from './store'
import { Outlet } from 'react-router-dom'
import { SWRConfig } from 'swr'

export default function App() {
  return (
    <SWRConfig value={{ revalidateOnFocus: false }}>
      <GlobalProvider>
        <Outlet />
      </GlobalProvider>
    </SWRConfig>
  )
}
