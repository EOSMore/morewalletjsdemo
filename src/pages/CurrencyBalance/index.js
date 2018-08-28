import React, { Component } from 'react'
import { Form } from 'src/containers'
import { ItemWrapper, Input } from 'src/components'

const { withForm } = Form

class CurrencyBalance extends Component {

  componentDidMount() {
    const { form: { setFieldValues } } = this.props
    setFieldValues({
      contract: 'eosio.token',
      symbol: 'EOS'
    })
  }

  handleSubmit = () => {
    this.props.form.validateFields(async (_, values) => {
      try {
        const { contract, symbol } = values
        const res = await window.client.getCurrencyBalance(contract, symbol)
        alert(res)
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
        <ItemWrapper label='Symbol'>
          <Input {...injectFieldProps('symbol')} />
        </ItemWrapper>
        <button type='submit'>确定</button>
      </Form>
    )
  }
}

export default withForm(CurrencyBalance)