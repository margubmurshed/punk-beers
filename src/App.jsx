import React, { useEffect, useRef, useState } from "react";
import { IoSearchSharp, IoClose } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { Circles } from "react-loader-spinner";
import SingleBeer from "./components/SingleBeer";

const App = () => {
  const [beers, setBeers] = useState([]);
  const [beersLoading, setBeersLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchPageNumber, setSearchPageNumber] = useState(1);
  const [searchByName, setSearchByName] = useState("");
  const [minABV, setMinABV] = useState("");
  const [maxABV, setMaxABV] = useState("");
  const [minIBU, setMinIBU] = useState("");
  const [maxIBU, setMaxIBU] = useState("");
  const [minEBC, setMinEBC] = useState("");
  const [maxEBC, setMaxEBC] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const nameFormRef = useRef(null);
  const otherFiltersFormRef = useRef(null);

  const isSearch = () => {
    if (
      searchByName ||
      minABV ||
      maxABV ||
      minIBU ||
      maxIBU ||
      minEBC ||
      maxEBC
    )
      return true;
    else return false;
  };
  const getSearchURL = () => {
    let URL = `https://api.punkapi.com/v2/beers?page=${searchPageNumber}&per_page=10`;
    if (searchByName) URL += `&beer_name=${searchByName}`;
    if (minABV) URL += `&abv_gt=${minABV}`;
    if (maxABV) URL += `&abv_lt=${maxABV}`;
    if (minIBU) URL += `&ibu_gt=${minIBU}`;
    if (maxIBU) URL += `&ibu_lt=${maxIBU}`;
    if (minEBC) URL += `&ebc_gt=${minEBC}`;
    if (maxEBC) URL += `&ebc_lt=${maxEBC}`;
    return URL;
  };
  const setSearchBeerName = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    if (!name) return;
    setSearchByName(name);
  };
  const setMinMaxValues = (e) => {
    e.preventDefault();
    const form = e.target;
    const form_minABV =
      typeof parseFloat(form.minABV.value) == "number" &&
      !isNaN(parseFloat(form.minABV.value))
        ? form.minABV.value
        : "";
    const form_maxABV =
      typeof parseFloat(form.maxABV.value) == "number" &&
      !isNaN(parseFloat(form.maxABV.value))
        ? form.maxABV.value
        : "";
    const form_minIBU =
      typeof parseFloat(form.minIBU.value) == "number" &&
      !isNaN(parseFloat(form.minIBU.value))
        ? form.minIBU.value
        : "";
    const form_maxIBU =
      typeof parseFloat(form.maxIBU.value) == "number" &&
      !isNaN(parseFloat(form.maxIBU.value))
        ? form.maxIBU.value
        : "";
    const form_minEBC =
      typeof parseFloat(form.minEBC.value) == "number" &&
      !isNaN(parseFloat(form.minEBC.value))
        ? form.minEBC.value
        : "";
    const form_maxEBC =
      typeof parseFloat(form.maxEBC.value) == "number" &&
      !isNaN(parseFloat(form.maxEBC.value))
        ? form.maxEBC.value
        : "";

    if (
      form_minABV ||
      form_maxABV ||
      form_minIBU ||
      form_maxIBU ||
      form_minEBC ||
      form_maxEBC
    ) {
      setMinABV(form_minABV);
      setMaxABV(form_maxABV);
      setMinIBU(form_minIBU);
      setMaxIBU(form_maxIBU);
      setMinEBC(form_minEBC);
      setMaxEBC(form_maxEBC);
    }
  };

  const clearFilters = () => {
    nameFormRef.current.name.value = "";
    otherFiltersFormRef.current.minABV.value = "";
    otherFiltersFormRef.current.maxABV.value = "";
    otherFiltersFormRef.current.minIBU.value = "";
    otherFiltersFormRef.current.maxIBU.value = "";
    otherFiltersFormRef.current.minEBC.value = "";
    otherFiltersFormRef.current.maxEBC.value = "";
    setBeersLoading(true);
    fetch(`https://api.punkapi.com/v2/beers?page=1&per_page=10`)
      .then((res) => res.json())
      .then((data) => {
        setBeers(data);
        setBeersLoading(false);
      });
  };

  useEffect(() => {
    setIsFilterOpen(false);
    if (isSearch()) {
      setBeersLoading(true);
      fetch(getSearchURL())
        .then((res) => res.json())
        .then((data) => {
          setBeers(data);
          setBeersLoading(false);
        });
    }
  }, [
    searchByName,
    minABV,
    maxABV,
    minIBU,
    maxIBU,
    minEBC,
    maxEBC,
    searchPageNumber,
  ]);
  useEffect(() => {
    setBeersLoading(true);
    fetch(`https://api.punkapi.com/v2/beers?page=${pageNumber}&per_page=10`)
      .then((res) => res.json())
      .then((data) => {
        setBeers(data);
        setBeersLoading(false);
      });
  }, [pageNumber]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 h-screen">
      {/* filters */}
      <aside
        className={`absolute top-0 w-full h-full lg:h-auto lg:static p-5 bg-white z-10 duration-500 ${
          isFilterOpen ? "left-0" : "-left-full"
        }`}
      >
        {/* filter close button for small devices */}
        <div className="flex justify-center lg:hidden mb-3">
          <button
            className="beer-bg-animate rounded-full text-white p-2 mx-auto"
            onClick={() => setIsFilterOpen(false)}
          >
            <IoClose />
          </button>
        </div>
        {/* form for name search */}
        <form className="" onSubmit={setSearchBeerName} ref={nameFormRef}>
          <div className="border rounded-full py-3 px-5 flex justify-between items-center gap-3">
            <input
              type="text"
              placeholder="Search by name"
              className="outline-none grow"
              defaultValue={searchByName}
              name="name"
            />
            <button
              type="submit"
              className="beer-bg-animate rounded-full text-white p-2"
            >
              <IoSearchSharp size={20} className="" />
            </button>
          </div>
        </form>
        {/* form for abv, ebc & ibu search */}
        <form onSubmit={setMinMaxValues} ref={otherFiltersFormRef}>
          <div className="flex items-center gap-3 p-3">
            <h3 className="font-semibold text-gray-700">ABV</h3>
            <div className="grow flex flex-col gap-3">
              <input
                type="text"
                placeholder="Greater Than ABV"
                className="outline-none border w-full py-2 px-3 rounded"
                defaultValue={minABV}
                name="minABV"
              />
              <input
                type="text"
                placeholder="Less Than ABV"
                className="outline-none border w-full py-2 px-3 rounded"
                defaultValue={maxABV}
                name="maxABV"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 p-3">
            <h3 className="font-semibold text-gray-700">IBU</h3>
            <div className="grow flex flex-col gap-3">
              <input
                type="text"
                placeholder="Greater Than IBU"
                className="outline-none border w-full py-2 px-3 rounded"
                defaultValue={minIBU}
                name="minIBU"
              />
              <input
                type="text"
                placeholder="Less Than IBU"
                className="outline-none border w-full py-2 px-3 rounded"
                defaultValue={maxIBU}
                name="maxIBU"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 p-3">
            <h3 className="font-semibold text-gray-700">EBC</h3>
            <div className="grow flex flex-col gap-3">
              <input
                type="text"
                placeholder="Greater Than EBC"
                className="outline-none border w-full py-2 px-3 rounded"
                defaultValue={minEBC}
                name="minEBC"
              />
              <input
                type="text"
                placeholder="Less Than EBC"
                className="outline-none border w-full py-2 px-3 rounded"
                defaultValue={maxEBC}
                name="maxEBC"
              />
            </div>
          </div>
          <input
            className="beer-container w-full rounded-md text-white py-3 px-5 font-semibold cursor-pointer"
            type="submit"
            value="Apply Changes"
          />
        </form>
        <button
          className="bg-red-500 mt-2 w-full rounded-md text-white py-3 px-5 font-semibold cursor-pointer"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </aside>
      {/* filter toggle button for small devices */}
      <div className="lg:hidden my-auto pb-3 border-b">
        <button
          type="submit"
          className="beer-bg-animate rounded-md text-white py-3 px-5 font-semibold flex  gap-2 items-center mt-3 mx-auto"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <span>Filters</span> <FaFilter />
        </button>
      </div>
      {/* beer cards */}
      <main className="lg:col-span-3 p-5 overflow-y-auto">
        {beersLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Circles
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <>
            {beers.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {beers.map((beer) => (
                  <SingleBeer beer={beer} key={beer.id} />
                ))}
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <p className="font-semibold uppercase text-gray-300">
                  No Beer Found
                </p>
              </div>
            )}
            {beers.length == 10 && (
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="beer-bg-animate rounded-md text-white py-3 px-5 font-semibold flex gap-2 items-center mt-3"
                  onClick={() =>
                    isSearch()
                      ? setSearchPageNumber(searchPageNumber + 1)
                      : setPageNumber(pageNumber + 1)
                  }
                >
                  <span>Next Page</span> <MdNavigateNext />
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;
