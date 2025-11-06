import './index.css';
import CurrencyConvertor from "../components/CurrencyConvertor";
import Footer from "../components/Footer";




const App=()=>{
  return (
    //https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}
    //https://api.frankfurter.dev/v1/currencies
    <div className="flex flex-col items-center justify-center min-h-screen font-bold bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
    <div className="container">
      <CurrencyConvertor />
      <div className="mt-6">
        <Footer />
      </div>
    </div>
  </div>

  )
}

export default App
