/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MANAGEMENT_APP_API_URL: string
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_GOOGLE_CLIENT_SECRET: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
