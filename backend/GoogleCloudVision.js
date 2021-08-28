 const vision = require('@google-cloud/vision');

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

module.exports = detectText
