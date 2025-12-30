function validateLoginForm(email, password) {
  const errors = {}
  
  if (!email?.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid email format'
  }
  
  if (!password) errors.password = 'Password is required'
  
  return errors
}

function validateSignupForm(fullName, email, password, confirmPassword) {
  const errors = {}
  
  if (!fullName?.trim()) errors.fullName = 'Full name is required'
  
  if (!email?.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid email format'
  }
  
  if (!password) {
    errors.password = 'Password is required'
  } else if (!validatePassword(password)) {
    errors.password = 'Password must have 8+ chars, uppercase, lowercase, number, special char'
  }
  
  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }
  
  return errors
}

function validatePassword(password) {
  const minLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[!@#$%^&*]/.test(password)
  
  return minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecial
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`)
  }
}

function test(name, fn) {
  try {
    fn()
    console.log(`✓ ${name}`)
    return true
  } catch (error) {
    console.error(`✗ ${name}: ${error.message}`)
    return false
  }
}

console.log('\n=== Login Form Validation Tests ===\n')

test('validateLoginForm should require email', () => {
  const errors = validateLoginForm('', 'password')
  assert(errors.email === 'Email is required', 'email validation failed')
})

test('validateLoginForm should validate email format', () => {
  const errors = validateLoginForm('invalid', 'password')
  assert(errors.email === 'Invalid email format', 'email format validation failed')
})

test('validateLoginForm should accept valid email', () => {
  const errors = validateLoginForm('test@example.com', 'password')
  assert(!errors.email, 'valid email rejected')
})

test('validateLoginForm should require password', () => {
  const errors = validateLoginForm('test@example.com', '')
  assert(errors.password === 'Password is required', 'password validation failed')
})

test('validateLoginForm should accept valid credentials', () => {
  const errors = validateLoginForm('test@example.com', 'password123')
  assert(Object.keys(errors).length === 0, 'valid credentials rejected')
})

console.log('\n=== Signup Form Validation Tests ===\n')

test('validateSignupForm should require all fields', () => {
  const errors = validateSignupForm('', '', '', '')
  assert(errors.fullName && errors.email && errors.password, 'required fields validation failed')
})

test('validateSignupForm should validate email format', () => {
  const errors = validateSignupForm('John Doe', 'invalid', 'Password123!', 'Password123!')
  assert(errors.email === 'Invalid email format', 'email format validation failed')
})

test('validateSignupForm should validate password strength', () => {
  const errors = validateSignupForm('John Doe', 'test@example.com', 'weak', 'weak')
  assert(errors.password?.includes('8+'), 'password strength validation failed')
})

test('validateSignupForm should require matching passwords', () => {
  const errors = validateSignupForm('John Doe', 'test@example.com', 'Password123!', 'Different123!')
  assert(errors.confirmPassword === 'Passwords do not match', 'password match validation failed')
})

test('validateSignupForm should accept valid data', () => {
  const errors = validateSignupForm('John Doe', 'test@example.com', 'Password123!', 'Password123!')
  assert(Object.keys(errors).length === 0, 'valid data rejected')
})

console.log('\n')
