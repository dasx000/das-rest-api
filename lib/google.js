const { google } = require('googleapis');
const fs = require('fs');

const gdrive = async (id) => {
  // Replace with the path to your JSON key file
  //   let res = [];
  //   new Promise((resolve, reject) => {
  const key = require('./key.json');

  // Replace with the file ID of the file you want to download

  //https://drive.google.com/file/d/1vWBzzgJpDj8qFzN6XWercdHZKtoJ29-4/view?usp=sharing
  //https://drive.google.com/file/d/1ZzUwaweVW1t3fO6xEl-G56PtJv_ZemKK/view?usp=share_link
  //https://drive.google.com/file/d/1J4x0Wcn5PBo_dyIzEKe0te4YoK9k0Hzd/view?usp=share_link
  const fileId = id;

  // Create a new JWT client using the key file
  const client = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/drive'],
    null
  );

  // Use the JWT client to generate an access token
  return new Promise((resolve, reject) => {
    client.authorize((error, tokens) => {
      if (error) {
        console.log(error);
        reject(error);
      }

      // Use the access token to create a new Drive client
      const drive = google.drive({ version: 'v3', auth: client });

      // Use the Drive client to get the file's metadata
      drive.files.get(
        { fileId: fileId, fields: 'name, mimeType, webContentLink' },
        (error, file) => {
          if (error) {
            console.log('emror');
            return reject(error);
          }

          // Get the file's name and content type
          const fileName = file.data.name;
          const fileMimeType = file.data.mimeType;
          const link = file.data.webContentLink;

          console.log(link);
          return resolve([link, fileName, fileMimeType]);
        }
      );
    });
  });
};

// gdrive('1J4x0Wcn5PBo_dyIzEKe0te4YoK9k0Hzd');

module.exports = { gdrive };
