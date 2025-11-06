import React from "react";
import { HiStar } from "react-icons/hi";

const Dropdown = ({
  currencies = [],
  currency,
  setCurrency,
  favourite = [],
  handleFavourite,
  title = "",
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label */}
      <label
        htmlFor={title}
        className="text-sm font-semibold text-gray-300 tracking-wide uppercase"
      >
        {title}
      </label>

      {/* Dropdown Container */}
      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 shadow-sm hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-all duration-300">
        {/* Select Box */}
        <select
          id={title}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="flex-1 bg-transparent text-gray-100 font-medium outline-none focus:ring-2 focus:ring-cyan-400 rounded-md p-2 cursor-pointer appearance-none"
        >
          {/* Favourite currencies first */}
          {favourite?.length > 0 && (
            <optgroup label="⭐ Favourite" className="bg-gray-800 text-white">
              {favourite.map((fav) => (
                <option
                  key={fav}
                  value={fav}
                  className="bg-gray-900 text-teal-300 font-semibold"
                >
                  {fav}
                </option>
              ))}
            </optgroup>
          )}

          {/* All currencies */}
          <optgroup label="All Currencies" className="bg-gray-800 text-white">
            {currencies.map((curr) => (
              <option
                key={curr}
                value={curr}
                className="bg-gray-900 text-gray-200 hover:bg-cyan-600"
              >
                {curr}
              </option>
            ))}
          </optgroup>
        </select>

        {/* Star Button */}
        <button
          onClick={() => handleFavourite(currency)}
          className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
            favourite.includes(currency)
              ? "text-yellow-400 drop-shadow-[0_0_10px_rgba(255,255,0,0.7)]"
              : "text-gray-400 hover:text-yellow-400 hover:drop-shadow-[0_0_10px_rgba(255,255,0,0.5)]"
          }`}
          title={
            favourite.includes(currency)
              ? "Remove from favourites"
              : "Add to favourites"
          }
        >
          <HiStar size={22} />
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
