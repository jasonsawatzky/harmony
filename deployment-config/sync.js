import {S3} from 'aws-sdk'
const s3 = new S3()
import fs from 'fs-extra'

export async function pull() {
  const stage = process.argv[4]
  writeLocal(await readRemote(stage))
}

export async function push() {
  const stage = process.argv[4]
  writeRemote(await readLocal('configs/' + stage + '.json'))
}

async function readLocal(path) {
  try {
    return await fs.readJson(path)
  }
  catch(e) {
    console.log("Error reading local config at: ", path, e)
  }
}

async function writeLocal(config) {
  try {
    return await fs.writeJson('./configs/' + config.stage + '.json', config, {spaces: 2})
  }
  catch(e) {
    console.log("Error writing local config to: ", path)
  }
}

async function readRemote(stage) {
  const params = {
    Bucket: "harmony-deployment-configurations",
    Key: stage + ".json"
  }
  try {
    const res = await s3.getObject(params).promise()
    return JSON.parse(res.Body.toString('utf-8'))
  }
  catch (e) {
    console.log("Error reading remote configuration file: ", e)
  }
}

async function writeRemote(config) {
  const params = {
    Body: JSON.stringify(config, null, 2),
    Bucket: "harmony-deployment-configurations",
    Key: config.stage + ".json"
   }

  try {
    await s3.putObject(params).promise()
  }
  catch (e) {
    console.log("Error writing remote configuration file: ", e)
  }
}
