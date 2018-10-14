function load() {
  // Module loaded in deployment by stage
  const stage = process.env.DEPLOYMENT_STAGE

  if (stage === 'true') {
    throw Error('Error: No configuration stage specified.')
  }

  console.log("Loading deployment config: ", stage)
  return require('./configs/' + stage + '.json')

}

module.exports = load()
