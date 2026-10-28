import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Navbar from "./Navbar";

import FileUpload from "./FileUpload";

const AppLayout = () => {
  const [showImport, setShowImport] = useState(false);

  return (
    <>
      <SideBar onImport={() => setShowImport(true)} />

      <div className="min-h-screen bg-slate-50 pb-20 dark:bg-slate-900 md:ml-64 md:pb-0">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8">
          <Outlet />
        </main>
      </div>

     
      {showImport && <FileUpload onClose={() => setShowImport(false)} />}
    </>
  );
};

export default AppLayout;