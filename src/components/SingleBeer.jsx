import React from "react";

const SingleBeer = ({ beer }) => {
  return (
    <div className="w-full border rounded-md beer-container">
      <div className="bg-gray-50 backdrop-blur-xl w-full h-full p-5">
        <div className="relative">
          <div className="beer-bg-animate h-28 w-28 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"></div>
          <img
            src={beer.image_url || "https://static.vecteezy.com/system/resources/previews/012/621/477/non_2x/beer-glassware-illustration-png.png"}
            alt={beer.name}
            className="h-48 w-fit mx-auto relative z-10"
          />
        </div>
        <div className="mt-5 text-center">
          <h2 className="font-bold uppercase">{beer.name}</h2>
          <p className=" text-xs">{beer.tagline}</p>
          <div className="grid grid-cols-2 bg-gray-100 rounded-md mt-3 text-left gap-3">
            <p className="beer-container rounded-md p-3 text-center font-semibold">PH : {beer.ph}</p>
            <p className="beer-container rounded-md p-3 text-center font-semibold">ABV : {beer.abv}</p>
            <p className="beer-container rounded-md p-3 text-center font-semibold">EBC : {beer.ebc}</p>
            <p className="beer-container rounded-md p-3 text-center font-semibold">SRM : {beer.srm}</p>
            <p className="beer-container rounded-md p-3 text-center font-semibold">IBU : {beer.ibu}</p>
            <p className="beer-container rounded-md p-3 text-center font-semibold">VOL : {beer.volume.value}L</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBeer;
