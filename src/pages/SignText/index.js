import React, { Component } from 'react'
import { Form } from 'src/containers'
import { ItemWrapper, Input } from 'src/components'

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
        const res = await this.signText(text)
        alert('Sign Text: ' + res)
      } catch (error) {
        alert('Error: ' + error)
      }
    })
  }

  signText(text = '') {
    return new Promise((resolve, reject) => {
      window['mw_sign_text_success'] = signedText => {
        resolve(signedText);
      };
      window['mw_sign_text_fail'] = (error) => {
        reject(error);
      };
      if (window.MoreJSBridge) {
        window.MoreJSBridge.signText(text);
      } else if (window.webkit) {
        window.webkit.messageHandlers.signText.postMessage(JSON.stringify({ text }));
      } else {
        reject("请在MORE WALLET中打开此DAPP");
      }
    });
  }

  render() {
    const { form: { injectFieldProps } } = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <ItemWrapper label='文本'>githu
          <textarea style={{ width: '100%', padding: '8px 12px' }}
            rows={4} {...injectFieldProps('text')} />
        </ItemWrapper>
        <button type='submit'>确定</button>
      </Form>
    )
  }
}

export default withForm(SignText)