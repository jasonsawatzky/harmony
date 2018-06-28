import aws from "aws-sdk"
const s3 = new aws.S3

const params = {
  Bucket: "harmony-deployment-configurations",
  Key: "deployment-config.json"
 }

 s3.getObject(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else console.log(data.Body.toString('utf-8'));           // successful response
 })
