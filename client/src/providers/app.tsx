import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { store } from '~/stores/store'
import { InternalServerPage } from '~/components'
import { ToastContainer } from 'react-toastify'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import LoadingPage from '~/components/LoadingPage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from '~/constants/service.constants'

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()
  return (
    <React.Suspense fallback={<LoadingPage />}>
      <ErrorBoundary FallbackComponent={InternalServerPage}>
        <Provider store={store}>
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <QueryClientProvider client={queryClient}>
              <ToastContainer pauseOnHover={false} />
              {children}
            </QueryClientProvider>
          </GoogleOAuthProvider>
        </Provider>
      </ErrorBoundary>
    </React.Suspense>
  )
}

export default AppProvider
