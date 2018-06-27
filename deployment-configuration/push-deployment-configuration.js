import aws from "aws-sdk"
import config from "./deployment-config.json"

const s3 = new aws.S3
const params = {
  Body: JSON.stringify(config, null, 2),
  Bucket: "harmony-deployment-configurations",
  Key: "deployment-config.json"
 };

 s3.putObject(params, function(err, data) {
   if (err) console.log(err, err.stack) // an error occurred
   else console.log("Configuration uploaded successfully...")           // successful response
 })
