const { google } = require('googleapis');
const fs = require('fs');

const gdrive = async (id) => {
  // Replace with the path to your JSON key file
  //   let res = [];
  //   new Promise((resolve, reject) => {
  const key = require('./key.json');

  // Replace with the file ID of the file you want to download

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
        { fileId: fileId, fields: 'name, mimeType, webContentLink, size' },
        (error, file) => {
          if (error) {
            console.log('emror');
            return reject(error);
          }

          // Get the file's name and content type
          const fileName = file.data.name;
          const fileMimeType = file.data.mimeType;
          const link = file.data.webContentLink;
          const size = file.data.size; //BYTE

          console.log(size);
          return resolve([link, fileName, fileMimeType, size]);
        }
      );
    });
  });
};

module.exports = { gdrive };
