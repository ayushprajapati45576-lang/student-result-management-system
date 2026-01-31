import { useState } from "react"; 
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import Sidebar from "./Sidebar";


const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <AdminHeader setOpen={setOpen} />

        <main className="p-4 flex-1">
          {children}
        </main>

        <AdminFooter/>
      </div>
    </div>
  );
};

export default AdminLayout;