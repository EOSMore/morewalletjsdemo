import morex from 'morex'

morex.model({
  name: 'app',
  initialState: {
    client: null,
    account: null,
    inApp: false,
    version: null
  },
  reducers: {
    setClient(state, client) {
      return { ...state, client }
    },
    setAccount(state, account) {
      return { ...state, account }
    },
    setInApp(state, inApp) {
      return { ...state, inApp }
    },
    setVersion(state, version) {
      return { ...state, version }
    }
  }
})