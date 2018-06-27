import config from './deployment-config.json'

export default process.env.NODE_ENV === "development" ?
  config["local"]
  :
  config[process.env.DEPLOYMENT_STAGE]
