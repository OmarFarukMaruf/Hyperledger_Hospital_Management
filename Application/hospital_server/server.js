const express = require('express');
const cors = require('cors');
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const patientRoutes = require('./routes/patient');

const app = express();
app.use(express.json());
app.use(cors());

async function getContract() {
  const ccpPath = path.resolve(__dirname, 'connection-org1.json');
  const ccp = JSON.parse(fs.readFileSync(ccpPath));

  const walletPath = path.join(__dirname, 'wallet');
  const wallet = await Wallets.newFileSystemWallet(walletPath);
  const gateway = new Gateway();

  await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });
  const network = await gateway.getNetwork('channelHospital');
  return network.getContract('hospital');
}

app.post('/createPatient', async (req, res) => {
  const contract = await getContract();
  await contract.submitTransaction('CreatePatientRecord', ...Object.values(req.body));
  res.send('Patient Created');
});

app.get('/patient/:id', async (req, res) => {
  const contract = await getContract();
  const result = await contract.evaluateTransaction('ReadPatientRecord', req.params.id);
  res.json(JSON.parse(result));
});

// (similarly implement update, delete, and history routes)
app.use('/api/patients', patientRoutes);
app.listen(8080, () => console.log('Server running on port 8080'));

