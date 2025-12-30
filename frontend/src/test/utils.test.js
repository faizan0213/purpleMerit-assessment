export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validatePassword(password) {
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

console.log('\n=== Frontend Utils Tests ===\n')

test('validateEmail should accept valid emails', () => {
  assert(validateEmail('test@example.com'), 'valid email failed')
  assert(validateEmail('user@domain.co.uk'), 'valid email with subdomain failed')
  assert(!validateEmail('invalid-email'), 'invalid email passed')
  assert(!validateEmail('test@'), 'incomplete email passed')
})

test('validatePassword should require 8+ characters', () => {
  assert(!validatePassword('Pass1!'), 'short password passed')
  assert(validatePassword('Password123!'), 'valid password failed')
})

test('validatePassword should require uppercase letter', () => {
  assert(!validatePassword('password123!'), 'password without uppercase passed')
  assert(validatePassword('Password123!'), 'password with uppercase failed')
})

test('validatePassword should require lowercase letter', () => {
  assert(!validatePassword('PASSWORD123!'), 'password without lowercase passed')
  assert(validatePassword('Password123!'), 'password with lowercase failed')
})

test('validatePassword should require number', () => {
  assert(!validatePassword('Password!'), 'password without number passed')
  assert(validatePassword('Password123!'), 'password with number failed')
})

test('validatePassword should require special character', () => {
  assert(!validatePassword('Password123'), 'password without special char passed')
  assert(validatePassword('Password123!'), 'password with special char failed')
})

console.log('\n')
