const ExcelJS = require('exceljs');
const path = require('path');
const filePath = path.join(__dirname, '../data/patients.xlsx');

// Create Patient
exports.createPatient = async (req, res) => {
  const patient = req.body;

  const workbook = new ExcelJS.Workbook();
  let worksheet;

  try {
    await workbook.xlsx.readFile(filePath);
    worksheet = workbook.getWorksheet('Patients');
  } catch {
    worksheet = workbook.addWorksheet('Patients');
    worksheet.columns = [
      { header: 'First Name', key: 'firstName' },
      { header: 'Last Name', key: 'lastName' },
      { header: 'Email', key: 'email' },
      { header: 'Phone', key: 'phone' },
      { header: 'Address Line 1', key: 'addressLine1' },
      { header: 'Address Line 2', key: 'addressLine2' },
      { header: 'City', key: 'city' },
      { header: 'Region', key: 'region' },
      { header: 'Postal Code', key: 'postalCode' },
      { header: 'Country', key: 'country' },
    ];
  }

  worksheet.addRow(patient);
  await workbook.xlsx.writeFile(filePath);

  res.status(200).send('Patient successfully created');
};

// Fetch Patients
exports.getPatients = async (req, res) => {
  const workbook = new ExcelJS.Workbook();
  try {
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Patients');

    const patients = [];
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if(rowNumber > 1) {
        patients.push({
          firstName: row.getCell(1).value,
          lastName: row.getCell(2).value,
          email: row.getCell(3).value,
          phone: row.getCell(4).value,
          addressLine1: row.getCell(5).value,
          addressLine2: row.getCell(6).value,
          city: row.getCell(7).value,
          region: row.getCell(8).value,
          postalCode: row.getCell(9).value,
          country: row.getCell(10).value
        });
      }
    });

    res.status(200).json(patients);
  } catch {
    res.status(500).send('Error reading patient data');
  }
};