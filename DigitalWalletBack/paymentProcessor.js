exports.processPayment = (transactionId, amount) => {
    // Simulamos el procesamiento del pago
    const success = Math.random() < 0.9; // 90% de probabilidad de éxito
  
    if (success) {
      return { success: true, message: 'Payment processed successfully' };
    } else {
      return { success: false, message: 'Payment failed' };
    }
  };