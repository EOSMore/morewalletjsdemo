import React, { Component } from 'react'
import { Form } from 'src/containers'
import { ItemWrapper, Input } from 'src/components'

const { withForm } = Form

class TableRows extends Component {

  componentDidMount() {
    const { form: { setFieldValues } } = this.props
    setFieldValues({
      code: 'eosio',
      scope: 'eosio',
      table: 'global'
    })
  }

  handleSubmit = () => {
    this.props.form.validateFields(async (_, values) => {
      try {
        const res = await window.client.getTableRows({ ...values, json: true })
        alert(JSON.stringify(res))
      } catch (error) {
        alert('Error: ' + error)
      }
    })
  }

  render() {
    const { form: { injectFieldProps } } = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <ItemWrapper label='Code'>
          <Input {...injectFieldProps('code')} />
        </ItemWrapper>
        <ItemWrapper label='Scope'>
          <Input {...injectFieldProps('scope')} />
        </ItemWrapper>
        <ItemWrapper label='Table'>
          <Input {...injectFieldProps('table')} />
        </ItemWrapper>
        <button type='submit'>确定</button>
      </Form>
    )
  }
}

export default withForm(TableRows)