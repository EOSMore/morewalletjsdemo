import React, { Component } from 'react'
import { connect, actions } from 'morex'
import './style.styl'

class Index extends Component {

  jsApis = [
    {
      label: '检查是否在钱包中打开',
      onClick: () => {
        this.checkInApp()
      }
    },
    {
      label: '获取账号信息',
      path: '/get-account'
    },
    {
      label: '获取APP版本号',
      onClick: () => {
        this.getAppVersion()
      }
    },
    {
      label: '批量Actions',
      onClick: () => {
        this.pushActions()
      }
    },
    {
      label: '检查权限',
      path: '/check-action'
    },
    {
      label: '转账',
      path: '/transfer'
    },
    {
      label: 'Currency balance',
      path: '/currency-balance'
    },
    {
      label: 'getTableRows',
      path: '/table-rows'
    },
    {
      label: '加密文本',
      path: '/sign-text'
    }
  ]

  async getAccount() {
    try {
      const account = await this.state.client.getAccount();
      alert(account.account_name);
    } catch (e) {
      alert("出错了：" + e);
    }
  }

  getAppVersion = async () => {
    try {
      const version = await this.props.client.getAppVersion()
      actions.app.setVersion(version)
    } catch (e) {
      alert("出错了：" + e);
    }
  }

  async checkAction() {
    try {
      const res = await this.state.client.checkAction("eosio.token", "transfer");
      alert("检查：" + res);
    } catch (e) {
      alert("出错了：" + e);
    }
  }

  checkInApp = async () => {
    const res = await this.props.client.openInApp();
    actions.app.setInApp(res)
  }

  async transfer() {
    try {
      const res = await this.state.client.transfer("eosio.token", "uknowwhoamme", "1.0000 EOS", "hi baby");
      alert("转账：" + res);
    } catch (e) {
      alert("出错了：" + e);
    }
  }

  async getCurrencyBalance() {
    try {
      const balance = await this.state.client.getCurrencyBalance("eosio.token", "EOS");
      alert(balance);
    } catch (e) {
      alert("出错了：" + e);
    }
  }

  async getGlobal() {
    try {
      const globalInfo = await this.state.client.getTableRows({
        json: true,
        code: "eosio",
        scope: "eosio",
        table: "global"
      });
      alert(JSON.stringify(globalInfo));
    } catch (e) {
      alert("出错了：" + e);
    }
  }

  async pushActions() {
    const { client } = this.props
    try {
      const actions = [
        {
          account: "eosio",
          name: "buyram",
          authorization: [
            {
              actor: client.account,
              permission: "active"
            }
          ],
          data: {
            payer: client.account,
            receiver: client.account,
            quant: "2.0000 EOS"
          }
        },
        {
          account: "eosio",
          name: "delegatebw",
          authorization: [{
            actor: client.account,
            permission: "active"
          }],
          data: {
            from: client.account,
            receiver: client.account,
            stake_net_quantity: "0.5000 EOS",
            stake_cpu_quantity: "1.0000 EOS",
            transfer: false
          }
        }
      ]
      const res = await client.pushActions(actions)
      alert("批量actions：" + res);
    } catch (e) {
      alert("出错了：" + e);
    }
  }

  render() {
    return (
      <div className="index">
        {
          this.jsApis.map(({ label, onClick, path }, index) => {
            if (path) {
              onClick = () => {
                this.props.history.push(path)
              }
            }
            return (
              <p key={index}>
                <button onClick={onClick}>{label}</button>
              </p>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = ({ app }) => {
  return { client: app.client }
}

export default connect(mapStateToProps)(Index)
