import React, { Component } from 'react'
import { actions } from 'morex'
import { Form } from 'src/containers'
import { ItemWrapper, Input } from 'src/components'

const { withForm } = Form

class Account extends Component {

  handleSubmit = () => {
    this.props.form.validateFields(async (_, values) => {
      try {
        const { account } = values
        const accountInfo = await window.client.getAccount(account)
        actions.app.setAccount(accountInfo.account_name)
        alert(JSON.stringify(accountInfo))
      } catch (error) {
        alert('Error: ' + error)
      }
    })
  }

  render() {
    const { form: { injectFieldProps } } = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <ItemWrapper label='Account'>
          <Input {...injectFieldProps('account')} />
        </ItemWrapper>
        <button type='submit'>确定</button>
      </Form>
    )
  }
}

export default withForm(Account)