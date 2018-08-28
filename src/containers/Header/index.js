import React from 'react'
import { connect } from 'morex'
import './style.styl'

const Header = ({ inApp, account, version }) => {
  return (
    <header>
      <h1>MORE Wallet DEMO</h1>
      <p>账号：{account}</p>
      <p>当前环境：{inApp ? 'MORE 钱包' : 'Web'}</p>
      <p>版本号：{version}</p>
    </header>
  )
}

export default connect(({ app }) => ({ ...app }))(Header)