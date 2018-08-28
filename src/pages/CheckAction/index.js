import React, { Component } from 'react'
import { Form } from 'src/containers'
import { ItemWrapper, Input } from 'src/components'

const { withForm } = Form

class CheckAction extends Component {

  componentDidMount() {
    const { form: { setFieldValues } } = this.props
    setFieldValues({
      contract: 'eosio.token',
      action: 'transfer'
    })
  }

  handleSubmit = () => {
    this.props.form.validateFields(async (_, values) => {
      try {
        const { contract, action } = values
        const res = await window.client.checkAction(contract, action)
        alert('Check Action: ' + res)
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
        <ItemWrapper label='Action'>
          <Input {...injectFieldProps('action')} />
        </ItemWrapper>
        <button type='submit'>确定</button>
      </Form>
    )
  }
}

export default withForm(CheckAction)