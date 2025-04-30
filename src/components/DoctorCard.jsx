import { useEffect, useState } from "react";

export default function DoctorCard({
  Data,
  setFilterData,
  setFilterShow,
  filterShow,
}) {
  const [sortType, setSortType] = useState("relavent");

  const SortProducts = () => {
    const FilterCopy = [...Data];

    switch (sortType) {
      case "low-high":
        setFilterData(
          FilterCopy.sort((a, b) => a.consultationFee - b.consultationFee)
        );
        break;

      case "high-low":
        setFilterData(
          FilterCopy.sort((a, b) => b.consultationFee - a.consultationFee)
        );
        break;

      default:
        "";
        break;
    }
  };

  useEffect(() => {
    SortProducts();
  }, [sortType]);

  return (
    <>
      <div className="flex items-center justify-between text-base sm:text-2xl">
        <h1 className=" hidden md:block">
          Consult General Physicians Online - Internal <br /> Medicine
          Specialists
        </h1>
        <button
          onClick={() => setFilterShow(!filterShow)}
          className=" md:hidden block border-2 border-gray-300 text-sm px-2 py-2 rounded bg-black"
        >
          {filterShow ? "Close" : "Filters"}
        </button>

        {/* Sorting for product */}
        <select
          onChange={(e) => setSortType(e.target.value)}
          className="border-2 border-gray-300 text-sm px-2 py-2 rounded bg-black"
        >
          <option value="relavent">Sort by: Relavent</option>
          <option value="low-high">Sort by: Low to High</option>
          <option value="high-low">Sort by: High to Low</option>
        </select>
      </div>
      
      {Data.length > 0 ? (
        Data.map((data, index) => (
          <div
            key={index + 1}
            className="w-full h-auto bg-[#36415359] rounded-lg flex md:flex-row flex-col p-2 gap-6"
          >
            {/* img */}
            <div className="lg:w-1/3 md:w-1/2 md:h-[100px] h-[150px] rounded-md overflow-hidden">
              <img
                src="https://images.apollo247.in/images/consult_home/icons/male.png?tr=w-74,c-at_max,f-auto,q=80,dpr-2"
                alt={data?.name}
                className="w-full h-full"
              />
            </div>

            {/* Doc-info */}
            <section className="w-full text-[#99A1AF] flex flex-col gap-1">
              <h1 className="text-2xl font-semibold text-white flex items-center">
                <span className="line-clamp-1">Dr. {data?.name}</span>
              </h1>

              <h1 className="line-clamp-1">
                Specialization:{" "}
                <span className="text-[#FFFFFF]">{data?.specialization}</span>
              </h1>
              <h1 className="line-clamp-1">
                Experience:{" "}
                <span className="text-[#FFFFFF]">{data?.experience} Years</span>
              </h1>
              <h1 className="line-clamp-1">
                Address:{" "}
                <span className="text-[#FFFFFF]">{data?.location}</span>
              </h1>
              <h1>
                Gender: <span className="text-[#FFFFFF]">{data?.gender}</span>
              </h1>
              <h1 className="line-clamp-1">
                Language:{" "}
                <span className="text-[#FFFFFF]">
                  {data?.language?.join(", ")}
                </span>
              </h1>
            </section>

            {/* button/price */}
            <div className="w-full flex flex-col gap-3 md:items-center justify-end">
              <p className="text-xl font-bold">
                ₹{data?.consultationFee} |{" "}
                <span className="text-orange-300">DocMagic</span>
              </p>
              <button className="w-full py-3 border rounded-lg bg-white text-black cursor-pointer hover:bg-transparent hover:text-white">
                Consult Online
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full text-center text-white text-xl font-semibold py-10 animate-fadeIn">
          No data available
        </div>
      )}
    </>
  );
}
