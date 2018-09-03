import React, { Component } from 'react'
import { Form } from 'src/containers'
import { ItemWrapper } from 'src/components'

const { withForm } = Form

class SignText extends Component {

  componentDidMount() {
    const { form: { setFieldValues } } = this.props
    setFieldValues({
      text: 'eosio.token'
    })
  }

  handleSubmit = () => {
    this.props.form.validateFields(async (_, values) => {
      try {
        const { text } = values
        const res = await window.client.signText(text)
        alert('Sign Text: ' + res)
      } catch (error) {
        alert('Error: ' + error)
      }
    })
  }

  render() {
    const { form: { injectFieldProps } } = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <ItemWrapper label='文本'>
          <textarea style={{ width: '100%', padding: '8px 12px' }}
            rows={4} {...injectFieldProps('text')} />
        </ItemWrapper>
        <button type='submit'>确定</button>
      </Form>
    )
  }
}

export default withForm(SignText)