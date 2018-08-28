import { lazyload } from 'src/utils'

export const Index = lazyload(() => import('./Index/index'))

export const Transfer = lazyload(() => import('./Transfer'))

export const CheckAction = lazyload(() => import('./CheckAction'))

export const Account = lazyload(() => import('./Account'))

export const CurrencyBalance = lazyload(() => import('./CurrencyBalance'))

export const TableRows = lazyload(() => import('./TableRows'))

export const SignText = lazyload(() => import('./SignText'))