import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.styl'

class Form extends Component {

  static withForm = WrappedComponent => {

    class FormWrapper extends Component {

      constructor(props) {
        super(props)
        this.validators = {}
        this.errMsgs = {}
        this.state = {
          formData: {}
        }
      }

      genValidator = (fieldName, rules) => {
        let validateRules = {
          min: {
            condition: true,
            validate(fieldValue, len, message) {
              if (fieldValue && fieldValue.length >= len) {
                return null
              }
              return message || `字段 ${fieldName} 最小长度为 ${len}`
            }
          },
          max: {
            condition: true,
            validate(fieldValue, len, message) {
              if (!fieldValue || fieldValue.length <= len) {
                return null
              }
              return message || `字段 ${fieldName} 最大长度为 ${len}`
            }
          },
          required: {
            condition: rule => rule,
            validate(fieldValue, condition, message = `字段 ${fieldName} 是必填的`) {
              if (!!fieldValue === condition) {
                return null
              }
              return message
            }
          }
        }
        let validateKeys = Object.keys(validateRules)
        const validators = rules.reduce((validators, rule) => {
          let ruleKey
          for (ruleKey in rule) {
            if (validateKeys.indexOf(ruleKey) !== -1) {
              break
            }
          }
          const validateRule = validateRules[ruleKey]
          if (validateRule) {
            const { condition, validate } = validateRule
            const ruleCondition = rule[ruleKey]
            if ('function' === typeof condition ? condition(ruleCondition) : condition) {
              validators.push(function (fieldValue) {
                return validate(fieldValue, ruleCondition, rule.message)
              })
            }
          }
          return validators
        }, [])

        // 置空
        validateKeys = null
        validateRules = null

        return () => {
          let message
          const { formData } = this.state
          const fieldValue = formData[fieldName]
          for (let validator of validators) {
            message = validator(fieldValue)
            this.errMsgs[fieldName] = message
            if (message) {
              // TODO event emit
              break
            }
          }
          return message
        }
      }

      handleFieldValueChange = (fieldName, validateRules = []) => {
        if (!(validateRules instanceof Array)) {
          throw new Error('validate rules should be an array')
        }
        const validator = validateRules.length ?
          this.genValidator(fieldName, validateRules)
          : () => { }
        this.validators[fieldName] = validator
        return ev => {
          const { value } = ev.target
          this.setState(({ formData }) => {
            return { formData: { ...formData, [fieldName]: value } }
          }, validator)
        }
      }

      setFieldValues = fields => {
        if ('object' === typeof fields) {
          this.setState(({ formData }) => {
            return { formData: { ...formData, ...fields } }
          })
        } else {
          throw new Error('fields should be an object')
        }
      }

      getFieldValues = fieldNames => {
        const { formData } = this.state
        if ('string' === typeof fieldNames) {
          return formData[fieldNames]
        }
        if (fieldNames instanceof Array) {
          return fieldNames.reduce((fields, fieldName) => {
            fields[fieldName] = formData[fieldName]
            return fields
          }, {})
        }
        return formData
      }

      validateFields = (callback) => {
        const { formData } = this.state
        const validators = this.validators
        const messages = Object.keys(validators).reduce((messages, fieldName) => {
          messages[fieldName] = validators[fieldName]()
          return messages
        }, {})
        if ('function' === typeof callback) {
          if (Object.keys(messages).filter(key => !!messages[key]).length) {
            callback(messages, formData)
          } else {
            callback(null, formData)
          }
        }
      }

      injectFieldProps = (fieldName, validateRules) => {
        const { formData } = this.state
        return {
          value: formData[fieldName],
          onChange: this.handleFieldValueChange(fieldName, validateRules)
        }
      }

      render() {
        const formProps = {
          injectFieldProps: this.injectFieldProps,
          setFieldValues: this.setFieldValues,
          getFieldValues: this.getFieldValues,
          validateFields: this.validateFields
        }
        return (
          <div className="form-container">
            <WrappedComponent form={formProps} {...this.props} />
          </div>
        )
      }

    }

    return FormWrapper
  }

  static Item = () => {
    return (
      <div className="form-item-wrapper">
        {/* TODO */}
      </div>
    )
  }

  handleSubmit = ev => {
    ev.preventDefault();
    this.props.onSubmit(ev)
  }

  render() {
    const { children } = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        {children}
      </form>
    )
  }

}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default Form