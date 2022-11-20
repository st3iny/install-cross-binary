import fs from 'fs';
import os from 'os';
import path from 'path';

import { exec } from '@actions/exec'

const appPrefix = 'install-cross-binary-'
let tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), appPrefix))

async function runTest(version: string, destination: string) {
  await exec('node', ['dist/index.js'], {
    env: {
      RUNNER_TEMP: path.join(tmpDir, 'runner'),
      ...process.env,
      INPUT_RELEASE: version,
      INPUT_DESTINATION: destination,
    }
  })
}

(async function() {
  await exec('npm run build')
  const destination = path.join(tmpDir, 'bin')
  try {
    await runTest('latest', destination)
    await runTest('v0.2.3', destination)
  } finally {
    try {
      if (tmpDir) {
        fs.rmSync(tmpDir, { recursive: true })
      }
    } catch (error) {
      console.error(`Failed to cleanup temp dir at ${tmpDir}`, error)
    }
  }
})()
