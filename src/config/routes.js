import * as pages from 'src/pages'

const routes = [
  {
    path: '/',
    component: pages.Index
  },
  {
    path: '/transfer',
    component: pages.Transfer
  },
  {
    path: '/check-action',
    component: pages.CheckAction
  },
  {
    path: '/get-account',
    component: pages.Account
  },
  {
    path: '/currency-balance',
    component: pages.CurrencyBalance
  },
  {
    path: '/table-rows',
    component: pages.TableRows
  },
  {
    path: '/sign-text',
    component: pages.SignText
  }
]

export default routes