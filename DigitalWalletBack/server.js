const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const QRCode = require('qrcode');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// balance
let userBalance = 1000;

// Fuuncion para genrar el QR
const generateQR = async (data) => {
  try {
    return await QRCode.toDataURL(JSON.stringify(data));
  } catch (err) {
    console.error('Error generating QR:', err);
    throw err;
  }
};

// Ruta para generar el QR
app.get('/generate-test-qr', async (req, res) => {
  const amount = parseFloat(req.query.amount) || 10.00; // Nos asegura que el balance sea un numero
  const paymentInfo = {
    transactionId: Date.now().toString(),
    amount: amount,
  };

  try {
    const qrCodeDataUrl = await generateQR(paymentInfo);
    res.send(`
      <h1>Escanear para pagar</h1>
      <img src="${qrCodeDataUrl}" />
      <p>Importe: $${amount.toFixed(2)}</p>
      <p>Escanea este código con tu aplicación</p>
    `);
  } catch (error) {
    res.status(500).send('Error generating QR code');
  }
});

// Ruta para el balance
app.get('/balance', (req, res) => {
  res.json({ balance: userBalance });
});

// Ruta para procesar el pago
app.post('/process-payment', (req, res) => {
  const { amount } = req.body;

  const amountNum = parseFloat(amount);
  if (isNaN(amountNum) || amountNum <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  if (userBalance < amountNum) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }

  
  userBalance -= amountNum;

  res.json({ 
    success: true, 
    message: 'Payment processed successfully',
    newBalance: userBalance
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});