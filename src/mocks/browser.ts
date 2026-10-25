import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

function reactivateMocking(): Promise<void> {
  const controller = navigator.serviceWorker.controller
  if (!controller) return Promise.resolve()

  return new Promise((resolve) => {
    const timeout = setTimeout(finish, 1000)

    function handleMessage(event: MessageEvent) {
      if (event.data?.type !== 'MOCKING_ENABLED') return
      event.ports[0]?.postMessage({})
      finish()
    }

    function finish() {
      clearTimeout(timeout)
      navigator.serviceWorker.removeEventListener('message', handleMessage)
      resolve()
    }

    navigator.serviceWorker.addEventListener('message', handleMessage)
    controller.postMessage('MOCK_ACTIVATE')
  })
}

export function keepMockingActive() {
  const originalFetch = window.fetch.bind(window)

  window.fetch = async (...args) => {
    await reactivateMocking()
    return originalFetch(...args)
  }
}
