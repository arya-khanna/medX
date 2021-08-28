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
	const client = new language.LanguageServiceClient();
	const document = {
	  content: string,
	  type: 'PLAIN_TEXT',
	};
	const [result] = await client.analyzeEntities({document});
	const entities = result.entities;
	const ret = new Array();
	entities.forEach(entity => {
		ret.push({name:entity.name,
				  type:entity.type,
			      salience:entity.salience});
	});
	return ret
}

module.exports = {analyzeEntities, verifyCredentials, detectText}
