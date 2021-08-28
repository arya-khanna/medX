const vision = require('@google-cloud/vision');
const {Storage} = require('@google-cloud/storage');

detectText = async (path) => {
	// Creates a client
	const client = new vision.ImageAnnotatorClient();

   /**
    * TODO(developer): Uncomment the following line before running the sample.
    */
 const fileName = './adheretech_bottle_640.jfif';

 // Performs text detection on the local file
   const [result] = await client.textDetection(fileName);
   const detections = result.textAnnotations;
   return detections.map(text => text);
}

verifyCredentials = async () => {
  const storage = new Storage();
  try {
    const results = await storage.getBuckets();

    const [buckets] = results;

    console.log('Buckets:');
    buckets.forEach(bucket => {
      console.log(bucket.name);
    });
  } catch (err) {
    console.error('ERROR:', err);
  }
}

module.exports = {detectText, verifyCredentials}
