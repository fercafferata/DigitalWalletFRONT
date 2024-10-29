const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const QRCode = require('qrcode');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Simulación de base de datos de usuarios
const users = {
  'user1': { balance: 1000 },
  'user2': { balance: 500 }
};

// Función para generar QR
const generateQR = async (data) => {
  try {
    return await QRCode.toDataURL(JSON.stringify(data));
  } catch (err) {
    console.error('Error generando QR:', err);
    throw err;
  }
};

// Ruta para generar QR de prueba
app.get('/generate-test-qr', async (req, res) => {
  const amount = parseFloat(req.query.amount) || 10.00; // Aseguramos que amount sea un número
  const paymentInfo = {
    transactionId: Date.now().toString(),
    amount: amount,
    description: 'Test Payment'
  };

  try {
    const qrCodeDataUrl = await generateQR(paymentInfo);
    res.send(`
      <h1>QR de Prueba</h1>
      <img src="${qrCodeDataUrl}" />
      <p>Monto: $${amount.toFixed(2)}</p>
      <p>Escanea este código con tu aplicación</p>
    `);
  } catch (error) {
    res.status(500).send('Error generando el código QR');
  }
});

// Ruta para obtener el saldo del usuario
app.get('/balance/:userId', (req, res) => {
  const userId = req.params.userId;
  if (users[userId]) {
    res.json({ balance: users[userId].balance });
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

// Ruta para procesar el pago
app.post('/process-payment', (req, res) => {
  const { fromUserId, toUserId, amount } = req.body;
  
  if (!users[fromUserId] || !users[toUserId]) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const amountNum = parseFloat(amount);
  if (isNaN(amountNum) || amountNum <= 0) {
    return res.status(400).json({ error: 'Monto inválido' });
  }

  if (users[fromUserId].balance < amountNum) {
    return res.status(400).json({ error: 'Saldo insuficiente' });
  }

  // Realizar la transacción
  users[fromUserId].balance -= amountNum;
  users[toUserId].balance += amountNum;

  res.json({ 
    success: true, 
    message: 'Pago procesado exitosamente',
    newBalance: users[fromUserId].balance
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});