const emailValidation = [
    value => !!value || 'Required.',
    value => (value || '').length <= 20 || 'Max 20 characters',
    value => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail.'
    },
  ]
  const commonValidation = [
    value => !!value || 'Required.',
    value => (value && value.length >= 4) || 'Min 4 characters',
  ]

  const checkboxRequired = [
    value => !!value || 'Required'
  ]

  export {
      emailValidation,
      commonValidation,
      checkboxRequired
  }