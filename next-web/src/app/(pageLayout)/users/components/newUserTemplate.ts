const newUserTemplate = [
  {
    name: 'email',
    type: 'string',
    label: 'Email',
  },
  {
    name: 'password',
    type: 'string',
    label: 'Password',
  },
  {
    name: 'gender',
    type: 'select',
    items: ['MALE', 'FEMALE'],
    label: 'Gender',
  },

  {
    name: 'gender',
    type: 'radio',
    items: ['MALE', 'FEMALE'],
    label: 'GenderRadio',
  },
]
export default newUserTemplate
