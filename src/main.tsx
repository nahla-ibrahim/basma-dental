import '@fontsource/ibm-plex-sans-arabic/400.css'
import '@fontsource/ibm-plex-sans-arabic/500.css'
import '@fontsource/ibm-plex-sans-arabic/600.css'
import '@fontsource/ibm-plex-sans-arabic/700.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './i18n'
import './index.css'

// Start the mock API before rendering, so the first request is already mocked
async function enableMocking() {
  const { worker } = await import('./mocks/browser')
  const options = { onUnhandledFrame: 'bypass' } as const

  await worker.start(options)

  // The browser stops idle service workers, and MSW then forgets this tab.
  // Restart mocking whenever the tab becomes visible again.
  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState !== 'visible') return
    await worker.stop()
    await worker.start(options)
  })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
