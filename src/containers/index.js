import { lazyload } from '../utils'
import Form from './Form'

export const Header = lazyload(() => import('./Header'))

export {
  Form
}

