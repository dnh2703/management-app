import Cookie from 'js-cookie'

const storagePrefix = 'management_app_'

const storage = {
  getAccessToken: () => {
    return Cookie.get(`${storagePrefix}act`)
  },
  setAccessToken: (token: string) => {
    Cookie.set(`${storagePrefix}act`, token)
  },
  clearAccessToken: () => {
    Cookie.remove(`${storagePrefix}act`)
  },
  getRefreshToken: () => {
    return Cookie.get(`${storagePrefix}rft`)
  },
  setRefreshToken: (token: string) => {
    Cookie.set(`${storagePrefix}rft`, token)
  },
  clearRefreshToken: () => {
    Cookie.remove(`${storagePrefix}rft`)
  },
  getUser: () => {
    return JSON.parse(localStorage.getItem(`${storagePrefix}user`) as string)
  },
  setUser: (data: unknown) => {
    return localStorage.setItem(`${storagePrefix}user`, JSON.stringify(data))
  },
  clearUser: () => {
    return localStorage.removeItem(`${storagePrefix}user`)
  }
}

export default storage
