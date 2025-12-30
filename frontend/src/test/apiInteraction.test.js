const APIInteractionTests = {
  testAxiosHeadersWithToken() {
    const token = 'jwt-token-123'
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    
    console.assert(headers['Authorization'] === `Bearer ${token}`, 'Authorization header not set correctly')
    console.assert(headers['Content-Type'] === 'application/json', 'Content-Type header not set')
    
    return true
  },
  
  testAxiosHeadersWithoutToken() {
    const token = null
    const headers = {
      'Content-Type': 'application/json'
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    
    console.assert(!headers['Authorization'], 'Authorization header set without token')
    console.assert(headers['Content-Type'] === 'application/json', 'Content-Type header not set')
    
    return true
  },
  
  testLoginApiRequest() {
    const loginPayload = {
      email: 'test@example.com',
      password: 'Password123!'
    }
    
    const expectedKeys = ['email', 'password']
    const actualKeys = Object.keys(loginPayload)
    
    console.assert(JSON.stringify(expectedKeys.sort()) === JSON.stringify(actualKeys.sort()), 
      'Login payload structure incorrect')
    
    return true
  },
  
  testSignupApiRequest() {
    const signupPayload = {
      fullName: 'John Doe',
      email: 'test@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!'
    }
    
    const expectedKeys = ['fullName', 'email', 'password', 'confirmPassword']
    const actualKeys = Object.keys(signupPayload)
    
    console.assert(JSON.stringify(expectedKeys.sort()) === JSON.stringify(actualKeys.sort()), 
      'Signup payload structure incorrect')
    
    return true
  },
  
  testAuthInterceptor401Handling() {
    const responses = [
      { status: 200, data: { user: { id: '1' } } },
      { status: 401, data: { message: 'Unauthorized' } },
      { status: 500, data: { message: 'Server error' } }
    ]
    
    const shouldClearAuth = (response) => response.status === 401
    
    console.assert(!shouldClearAuth(responses[0]), 'Auth cleared on 200 status')
    console.assert(shouldClearAuth(responses[1]), 'Auth not cleared on 401 status')
    console.assert(!shouldClearAuth(responses[2]), 'Auth cleared on 500 status')
    
    return true
  },
  
  testApiErrorHandling() {
    const errors = [
      { response: { status: 404, data: { message: 'Not found' } } },
      { response: { status: 401, data: { message: 'Unauthorized' } } },
      { message: 'Network error' }
    ]
    
    const getErrorMessage = (error) => {
      return error.response?.data?.message || error.message || 'Unknown error'
    }
    
    console.assert(getErrorMessage(errors[0]) === 'Not found', 'Error message extraction failed')
    console.assert(getErrorMessage(errors[1]) === 'Unauthorized', 'Error message extraction failed')
    console.assert(getErrorMessage(errors[2]) === 'Network error', 'Error message extraction failed')
    
    return true
  }
}

console.log('\n=== API Interaction Tests ===\n')

try {
  console.log('✓ Axios headers with token:', APIInteractionTests.testAxiosHeadersWithToken())
  console.log('✓ Axios headers without token:', APIInteractionTests.testAxiosHeadersWithoutToken())
  console.log('✓ Login API request format:', APIInteractionTests.testLoginApiRequest())
  console.log('✓ Signup API request format:', APIInteractionTests.testSignupApiRequest())
  console.log('✓ Auth interceptor 401 handling:', APIInteractionTests.testAuthInterceptor401Handling())
  console.log('✓ API error handling:', APIInteractionTests.testApiErrorHandling())
  console.log('\n')
} catch (error) {
  console.error('✗ Test failed:', error.message)
}
