function load() {
  // Module loaded in deployment by stage
  console.log("Loading deployment config: ", process.env.DEPLOYMENT_STAGE)
  return require('./configs/' + process.env.DEPLOYMENT_STAGE + '.json')

}

module.exports = load()
