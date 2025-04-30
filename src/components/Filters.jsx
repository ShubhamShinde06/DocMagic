import { useEffect, useState } from "react";

export default function Filters({Data,filterData, setFilterData, setFilterShow }) {

  const [Language, setLanguage] = useState([]);
  const [Fees, setFees] = useState([])
  const [Experience, setExperience ] = useState([])

  const LanguageFilter = (e) => {
    const value = e.target.value;
    setLanguage((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const FeesFilter = (e) => {
    const value = e.target.value;
  
    if (value === "All") {
      setFees(["All"]);
    } else {
      setFees((prev) => {
        const newFees = prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev.filter((f) => f !== "All"), value];
  
        return newFees;
      });
    }
  };

  const ExperienceFilter = (e) => {
    const value = e.target.value;
  
    if (value === "All") {
      setExperience(["All"]);
    } else {
      setExperience((prev) => {
        let updated = prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev.filter((item) => item !== "All"), value];
  
        // If all options are removed, default back to "All"
        if (updated.length === 0) {
          updated = ["All"];
        }
  
        return updated;
      });
    }
  };
  
  

   const applyFilter = () => {

    let DataCopy = [...Data];
  
    if (Language.length > 0) {
      DataCopy = DataCopy.filter((item) =>
        item.language.some((lang) => Language.includes(lang))
      );
    }

    if (Fees.length > 0 && !Fees.includes("All")) {
      DataCopy = DataCopy.filter((item) => {
        return Fees.some((range) => {
          const fee = item.consultationFee;
  
          if (range === "100 - 500") return fee >= 100 && fee <= 500;
          if (range === "500 - 1000") return fee > 500 && fee <= 1000;
          if (range === "1000 +") return fee > 1000;
  
          return true; 
        });
      });
    }

    if (Experience.length > 0 && !Experience.includes("All")) {
      DataCopy = DataCopy.filter((item) => {
        const Exe = item.experience;
    
        return Experience.some((range) => {
          if (range === "0 - 5") return Exe >= 0 && Exe <= 5;
          if (range === "6 - 10") return Exe >= 6 && Exe <= 10;
          if (range === "11 - 16") return Exe >= 11 && Exe <= 16;
          if (range === "17 +") return Exe >= 17;
          return false;
        });
      });
    }
    
    
  
    setFilterData(DataCopy);

  };

  useEffect(() => {
    applyFilter();
  }, [Language, Data, Fees, Experience]);

  // console.log(filterData)

  return (
    <div className=" w-full h-full overflow-y-auto pr-2 flex flex-col gap-6 border border-gray-700 rounded-xl p-4  scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 pb-30 scroll-bar-hidden">
      {/* Experience */}
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-white flex justify-between">Experience (In Years) <span onClick={()=>setFilterShow(false)} className=" border rounded-xl px-2 block md:hidden">Close</span></h1>
        <div className="flex flex-col">
          {["All","0 - 5", "6 - 10", "11 - 16", "17 +"].map((label, index) => (
            <label
              key={index}
              className="flex items-center gap-3 p-2 rounded-lg transition cursor-pointer hover:bg-gray-800"
            >
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 transition"
                defaultChecked={index === 0}
                value={label}
                onClick={ExperienceFilter}
              />
              <span className="text-white text-base">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fees */}
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-white">Fees (In Rupees)</h1>
        <div className="flex flex-col">
          {["All","100 - 500", "500 - 1000", "1000 +"].map((label, index) => (
            <label
              key={index}
              className="flex items-center gap-3 p-2 rounded-lg transition cursor-pointer hover:bg-gray-800"
            >
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 transition"
                defaultChecked={index === 0}
                value={label}
                onClick={FeesFilter}
              />
              <span className="text-white text-base">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-white">Language</h1>
        <div className="flex flex-col">
          {["All","English", "Hindi", "Marathi", "Telugu", "Gujarati", "Kannada", "Punjabi", "Tamil", "Bengali"].map((label, index) => (
            <label
              key={index}
              className="flex items-center gap-3 p-2 rounded-lg transition cursor-pointer hover:bg-gray-800"
            >
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 transition"
                defaultChecked={index === 0}
                value={label}
                onClick={LanguageFilter}
              />
              <span className="text-white text-base">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
