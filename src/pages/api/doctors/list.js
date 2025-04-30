import dbConnect from "../../../utils/dbConnect.js";
import Doctor from "../../../models/Doctor.js";

export default async function handler(req, res) {
  await dbConnect();

  const { page = 1, limit = 5, gender, specialization } = req.query;

  const query = {};
  if (gender) query.gender = gender;
  if (specialization) query.specialization = specialization;

  try {
    const doctors = await Doctor.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Doctor.countDocuments(query);

    res.status(200).json({
      success: true,
      doctors,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
