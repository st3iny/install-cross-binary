import fs from 'fs'
import path from 'path'

import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as tc from '@actions/tool-cache'

function getReleaseUrl(release: string) {
  let url = 'https://github.com/cross-rs/cross/releases'
  if (release === 'latest') {
    url += '/latest/download'
  } else {
    url += `/download/${release}`
  }
  return url + '/cross-x86_64-unknown-linux-gnu.tar.gz'
}

export async function installCrossBinary(release: string, destination: string) {
  // Create target dirs if not existing
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true })
  }

  // Download and extract release archive
  const archivePath = await tc.downloadTool(getReleaseUrl(release))
  await tc.extractTar(archivePath, destination)

  // Run smoke test
  await exec.exec(path.join(destination, 'cross'), ['--version'])
}

(async function() {
  try {
    await installCrossBinary(core.getInput('release'), core.getInput('destination'))
  } catch (error: any) {
    core.setFailed(error)
  }
})()
