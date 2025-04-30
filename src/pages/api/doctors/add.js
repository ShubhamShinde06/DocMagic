import dbConnect from '../../../utils/dbConnect.js';
import Doctor from '../../../models/Doctor.js';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const doctor = await Doctor.create(req.body);
      res.status(201).json({ success: true, data: doctor });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Only POST method allowed' });
  }
}
