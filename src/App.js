import React from "react";
import Footer from "./components/LayoutComponents/Footer";
import Navbar from "./components/LayoutComponents/Navbar";
import AllRoute from "./routes/AllRoute";
import ScrollToTop from "./components/HelperComponents/ScrollToTop";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";
const App = () => {
  const [progress, setProgress] = useState(0);
  return (
    <div className="  overflow-hidden overflow-x-hidden bg-[#121212] text-slate-50 ">
      <LoadingBar
        color="#dc2626"
        height={3}
        shadow={true}
        waitingTime={300}
        progress={progress}
        onLoaderFinished={() => setProgress(100)}
      />

      <Navbar />
      <ScrollToTop />
      <AllRoute setProgress={setProgress} />

      <Footer />
    </div>
  );
};

export default App;
