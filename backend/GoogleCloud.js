const vision = require('@google-cloud/vision');
const language = require('@google-cloud/language');
const {Storage} = require('@google-cloud/storage');

const detectText = async (fileName) => {
  const client = new vision.ImageAnnotatorClient();
  const [result] = await client.textDetection(fileName);
  const detections = result.textAnnotations;
  return detections.map(text => text);
}

const verifyCredentials = async () => {
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

const analyzeEntities = async (string) => {
	const entities = result.entities;
	console.log('Entities:');
	entities.forEach(entity => {
	  console.log(entity.name);
	  console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
	  if (entity.metadata && entity.metadata.wikipedia_url) {
		console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`);
	  }
	});
}

module.exports = {analyzeEntities, verifyCredentials, detectText}
