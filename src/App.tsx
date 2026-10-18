import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Header } from './components/Header'
import { HomePage } from './pages/HomePage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      // Only this user changes the mock data, so refetching on tab focus adds nothing
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div id="top">
        <Header />
        <HomePage />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
