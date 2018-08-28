import React, { Component } from 'react'
import { Form } from 'src/containers'
import { ItemWrapper, Input } from 'src/components'

const { withForm } = Form

class Transfer extends Component {

  componentDidMount() {
    const { form: { setFieldValues } } = this.props
    setFieldValues({
      contract: 'eosio.token',
      to: 'uknowwhoamme',
      quantity: '1.0000 EOS',
      memo: 'hi baby'
    })
  }

  handleSubmit = () => {
    this.props.form.validateFields(async (_, values) => {
      try {
        const { contract, to, quantity, memo } = values
        const res = await window.client.transfer(contract, to, quantity, memo)
        alert('Transfer: ' + res)
      } catch (error) {
        alert('Error: ' + error)
      }
    })
  }

  render() {
    const { form: { injectFieldProps } } = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <ItemWrapper label='合约'>
          <Input {...injectFieldProps('contract')} />
        </ItemWrapper>
        <ItemWrapper label='收款方'>
          <Input type="text" {...injectFieldProps('to')} />
        </ItemWrapper>
        <ItemWrapper label='数量'>
          <Input type="text" {...injectFieldProps('quantity')} />
        </ItemWrapper>
        <ItemWrapper label='MEMO'>
          <Input type="text" {...injectFieldProps('memo')} />
        </ItemWrapper>
        <button type='submit'>确定</button>
      </Form>
    )
  }
}

export default withForm(Transfer)
