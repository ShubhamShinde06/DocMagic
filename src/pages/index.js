import Head from "next/head";
import Header from "../components/Header";
import Filters from "../components/Filters";
import DoctorCard from "../components/DoctorCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filterShow, setFilterShow] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/doctors/list?page=${page}&limit=5`);
        if (res.data.success) {
          setData(res.data.doctors);
          setTotalPages(res.data.totalPages);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [page]);

  return (
    <>
      <Head>
        <title>DocMagic 24/7</title>
        <meta
          name="description"
          content="Find the best General Physicians near you."
        />
        <link rel="canonical" href="https://yourdomain.com" />
      </Head>

      <Header
        Data={data}
        filterData={filterData}
        setFilterData={setFilterData}
      />

      <div className="flex flex-col md:flex-row gap-4 px-4 md:px-6 py-4 h-screen relative overflow-y-auto scroll-bar-hidden pb-20">
        {/* Sidebar Filters */}
        <div
          className={`md:w-1/3 lg:w-1/4 w-full md:block ${
            filterShow ? "block" : "hidden"
          }`}
        >
          <div className=" p-4 rounded-xl shadow-md h-full overflow-y-auto">
            <Filters
              Data={data}
              filterData={filterData}
              setFilterData={setFilterData}
              setFilterShow={setFilterShow}
            />
          </div>
        </div>

        {/* Doctor Listings */}
        <div className="flex-1 overflow-y-auto pb-24 scroll-bar-hidden">
          <div className="grid gap-4">
            {loading ? (
              <div className="flex items-center justify-center h-64 text-xl text-gray-600">
                Loading...
              </div>
            ) : (
              <DoctorCard
                Data={filterData}
                setFilterData={setFilterData}
                setFilterShow={setFilterShow}
                filterShow={filterShow}
              />
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="  fixed bottom-4 left-0  right-0 z-50 flex justify-center">
          <div className="bg-black shadow-lg px-6 py-2 rounded-full flex items-center gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 bg-orange-300 cursor-pointer text-black rounded-full disabled:bg-white transition"
            >
              Prev
            </button>

            <span className="text-white font-medium">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-orange-300 cursor-pointer text-black rounded-full disabled:bg-white transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
