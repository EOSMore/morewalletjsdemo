import { lazyload } from '../utils'

export const ItemWrapper = lazyload(() => import('./ItemWrapper'))

export const Input = lazyload(() => import('./Input'))