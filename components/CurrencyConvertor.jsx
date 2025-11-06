import { useEffect, useState } from "react";
import Dropdown from "./dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrencyConvertor = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);
  const [favourite, setFavourite] = useState(
    JSON.parse(localStorage.getItem("favorites")) || ["INR"]
  );

  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.dev/v1/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.log("Error While Fetching Data, pls try again later!");
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const handleFavourite = (currency) => {
    let updated;
    if (favourite.includes(currency)) {
      updated = favourite.filter((c) => c !== currency);
    } else {
      updated = [...favourite, currency];
    }
    setFavourite(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const currencyConvert = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.log("Error While Fetching Data, pls try again later!");
    } finally {
      setConverting(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-6">
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_30px_rgba(0,255,255,0.15)] p-8 text-gray-100 transition-transform duration-300 hover:scale-[1.01] hover:shadow-[0_0_60px_rgba(0,255,255,0.25)]">
        
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]">
          💱 Currency Converter
        </h1>

        {/* Dropdown Section */}
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <Dropdown
            currencies={currencies}
            title="From:"
            favourite={favourite}
            currency={fromCurrency}
            setCurrency={setFromCurrency}
            handleFavourite={handleFavourite}
          />

          {/* Floating Swap Button */}
          <button
            onClick={swapCurrencies}
            className="absolute md:static left-1/2 -translate-x-1/2 -bottom-6 md:translate-x-0 md:bottom-0 bg-gradient-to-r from-teal-400 to-cyan-500 p-3 rounded-full shadow-lg hover:scale-110 hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] transition-all duration-300"
            title="Swap currencies"
          >
            <HiArrowsRightLeft size={24} className="text-white" />
          </button>

          <Dropdown
            currencies={currencies}
            title="To:"
            favourite={favourite}
            currency={toCurrency}
            setCurrency={setToCurrency}
            handleFavourite={handleFavourite}
          />
        </div>

        {/* Amount Input */}
        <div className="flex flex-col mb-8">
          <label htmlFor="amount" className="text-gray-300 font-medium mb-2">
            Amount:
          </label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            className="p-3 rounded-lg bg-white/20 border border-white/30 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 transition-all duration-300 hover:bg-white/30"
            placeholder="Enter amount"
          />
        </div>

        {/* Convert Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={currencyConvert}
            disabled={converting}
            className={`px-8 py-3 rounded-2xl bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 text-white font-bold shadow-[0_0_25px_rgba(0,255,255,0.4)] hover:shadow-[0_0_45px_rgba(0,255,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 ${
              converting ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {converting ? "Converting..." : "Convert"}
          </button>
        </div>

        {/* Result */}
        {convertedAmount && (
          <div className="mt-6 text-center text-2xl font-bold bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,255,255,0.4)]">
            Converted Amount:{" "}
            <span className="text-white">{convertedAmount}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConvertor;
