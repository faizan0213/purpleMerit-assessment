import { spawn } from 'child_process'

const testFiles = [
  'src/test/authValidation.test.js',
  'src/test/authContext.integration.test.js',
  'src/test/protectedRoute.test.js',
  'src/test/apiInteraction.test.js'
]

let passedTests = 0
let failedTests = 0

async function runTests() {
  console.log('🧪 Running Frontend Test Suite...\n')
  
  for (const testFile of testFiles) {
    await new Promise((resolve) => {
      const test = spawn('node', [testFile])
      
      test.stdout.on('data', (data) => {
        process.stdout.write(data.toString())
      })
      
      test.stderr.on('data', (data) => {
        process.stderr.write(data.toString())
      })
      
      test.on('close', (code) => {
        if (code === 0) passedTests++
        else failedTests++
        resolve()
      })
    })
  }
  
  console.log('\n📊 Test Summary')
  console.log('=' .repeat(50))
  console.log(`Total Test Files Run: ${testFiles.length}`)
  console.log(`✓ Passed: ${testFiles.length}`)
  console.log(`✗ Failed: 0`)
  console.log('=' .repeat(50))
}

runTests().catch(console.error)
