const vision = require('@google-cloud/vision');
const {Storage} = require('@google-cloud/storage');

export const detectText = async (fileName) => {
  const client = new vision.ImageAnnotatorClient();
  const [result] = await client.textDetection(fileName);
  const detections = result.textAnnotations;
  return detections.map(text => text);
}

export const verifyCredentials = async () => {
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

export const analyzeEntities = async (string) => {

}
