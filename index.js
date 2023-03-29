const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/crypto_wallets', { useNewUrlParser: true });
const db = mongoose.connection;

// Define data model for wallet balances
const WalletBalanceSchema = new mongoose.Schema({
  currency: String,
  balance: Number
});
const WalletBalance = mongoose.model('WalletBalance', WalletBalanceSchema);

// Endpoint to retrieve wallet balances
app.get('/balances', async (req, res) => {
  try {
    const walletBalances = await WalletBalance.find();
    res.json(walletBalances);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint to retrieve a specific wallet balance
app.get('/balances/:currency', async (req, res) => {
  try {
    const currency = req.params.currency;
    const walletBalance = await WalletBalance.findOne({ currency: currency });
    if (walletBalance) {
      res.json(walletBalance);
    } else {
      res.status(404).send('Currency not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint to transfer cryptocurrencies to other addresses
app.post('/transfers', async (req, res) => {
  try {
    // Placeholder logic for transferring cryptocurrencies
    const currency = req.body.currency;
    const recipientAddress = req.body.recipient_address;
    const amount = req.body.amount;

    // TODO: Implement logic to transfer cryptocurrencies

    res.json({ success: true });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
