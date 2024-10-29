const QRCode = require('qrcode');

exports.generateQR = (data) => {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(data, (err, url) => {
      if (err) reject(err);
      resolve(url);
    });
  });
};