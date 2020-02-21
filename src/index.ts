/* eslint-disable no-console, no-process-exit */
import { spawn } from 'child_process'

// Detect package manager
let packageManager: string | undefined
if (process.env.npm_config_user_agent) {
  const pmPart = process.env.npm_config_user_agent.split(' ')[0]
  packageManager = pmPart.slice(0, pmPart.lastIndexOf('/'))
}

// Arguments
const args = process.argv.slice(2)

// Display message
if (!packageManager) {
  console.log('Warning: could not detect package manager')
  packageManager = 'npm'
}
console.log(`> ${packageManager} ${args.join(' ')}`)

// Execute
const pmProcess = spawn(packageManager, args, { stdio: 'inherit' })
pmProcess.on('close', code => process.exit(code))
pmProcess.on('exit', code => process.exit(code ?? undefined))
