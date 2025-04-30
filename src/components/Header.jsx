import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header({Data,filterData, setFilterData}) {

  const [search, setSearch] = useState('')

  const applyFilter = () => {

    let DataCopy = [...Data];

    if(search){
      DataCopy = DataCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    setFilterData(DataCopy)

  }

  useEffect(()=>{
    applyFilter()
  },[search, Data])

  // console.log(filterData)



  return (
    <header className=" w-full flex justify-between items-center px-5 py-5 border-b-1 border-gray-700">
      {/* logo */}
      <h1 className=" font-bold text-3xl">DocMagic</h1>

      {/* serach */}
      <div className=" w-1/2 py-3 rounded-md md:flex bg-[#36415359] hidden">
        <input
          type="text"
          placeholder="Search Doctors"
          className=" bg-transparent border-none outline-none w-full h-full flex-1 px-2 placeholder:text-gray-400"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </div>

      {/* button - add doctor */}
      <Link href={'/add'} className=" px-5 py-2 rounded-lg bg-[#36415359] cursor-pointer block">
        Add Doctor +
      </Link>

    </header>
  );
}
