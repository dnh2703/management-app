const LOGIN_VALIDATE = {
  email: { required: 'Please fill email' },
  password: { required: 'Please fill password' }
}

const CUSTOMER_FORM_VALIDATE = {
  name: { required: 'Please fill name' },
  location: { required: 'Please fill location' },
  company: { required: 'Please fill company' },
  country: { required: 'Please fill country' },
  status: { required: 'Please select status' },
  priority: { required: 'Please select priority' }
}

const PROJECT_FORM_VALIDATE = {
  title: { required: 'Please fill name' },
  status: { required: 'Please fill location' },
  project_type: { required: 'Please select project type' },
  priority: { required: 'Please select priority' },
  department: { required: 'Please select department' },
  tech_stack: { required: 'Please select technology stack' },
  employees: { required: 'Please select employees' }
}

const DEPARTMENT_FORM_VALIDATE = {
  name: { required: 'Please fill the name' }
}

const EMPLOYEE_FORM_VALIDATE = {
  first_name: { required: 'Please fill the first name' },
  last_name: { required: 'Please fill the last name' },
  gender: { required: 'Please select gender' },
  birthday: { required: 'Please fill the birthday' },
  phone_number: { required: 'Please fill the phone number' },
  experience: { required: 'Please fill the experience' },
  tech_stacks: { required: 'Please fill the technology stack' }
}

export {
  LOGIN_VALIDATE,
  CUSTOMER_FORM_VALIDATE,
  PROJECT_FORM_VALIDATE,
  DEPARTMENT_FORM_VALIDATE,
  EMPLOYEE_FORM_VALIDATE
}
