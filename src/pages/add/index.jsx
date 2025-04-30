import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";

export default function Dashboard() {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: "",
    location: "",
    consultationFee: "",
    rating: "",
    gender: "",
    language: [],
  });

  if (form.rating > 5) {
    form.rating = 0;
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const [status, setStatus] = useState({ type: "", message: "" });

  const languageOptions = [
    "English",
    "Hindi",
    "Marathi",
    "Gujarati",
    "Telugu",
    "Tamil",
    "Kannada",
    "Malayalam",
    "Bengali",
    "Punjabi",
    
  ];

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleLanguage = (lang) => {
    setForm((prev) => ({
      ...prev,
      language: prev.language.includes(lang)
        ? prev.language.filter((l) => l !== lang)
        : [...prev.language, lang],
    }));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/doctors/add", {
        ...form,
        experience: Number(form.experience),
        consultationFee: Number(form.consultationFee),
        rating: Number(form.rating),
      });
      alert("Doctor added successfully!");
      setForm({
        name: "",
        specialization: "",
        experience: "",
        location: "",
        consultationFee: "",
        rating: "",
        gender: "",
        language: [],
      });
    } catch (error) {
      alert("Failed to add doctor.");
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br  overflow-y-auto py-10 px-4">
        <div className="max-w-2xl mx-auto rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold  mb-6 text-center">
            🩺 Add New Doctor
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Specialization
              </label>
              <input
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Experience (Years)
              </label>
              <input
                name="experience"
                type="number"
                value={form.experience}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Consultation Fee (₹)
              </label>
              <input
                name="consultationFee"
                type="number"
                value={form.consultationFee}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Rating (1–5)
              </label>
              <input
                name="rating"
                type="number"
                step="0.1"
                value={form.rating}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-1">
                Languages Spoken
              </label>
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex justify-between items-center w-full px-4 py-2 border rounded-md bg-black cursor-pointer"
              >
                <span className="text-sm text-white">
                  {form.language.length > 0
                    ? form.language.join(", ")
                    : "Select languages"}
                </span>
              </div>

              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute z-10 mt-1 w-full bg-black border rounded-md shadow-lg max-h-48 overflow-auto"
                >
                  {languageOptions.map((lang) => (
                    <label key={lang} className="flex items-center px-4 py-2 ">
                      <input
                        type="checkbox"
                        checked={form.language.includes(lang)}
                        onChange={() => toggleLanguage(lang)}
                        className="mr-2"
                      />
                      {lang}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="col-span-1 md:col-span-2 mt-6 space-y-4">
              <button
                type="submit"
                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
              >
                Add Doctor
              </button>

              <Link href="/">
                <div className="text-center  hover:underline text-lg cursor-pointer">
                  ← Back to Home
                </div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
