// import { Menu } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useLogoutMutation, useGetProfileQuery } from "../../features/auth/authApi";
// import { toast } from "react-toastify";

// const StudentHeader = ({ setOpen }) => {
//   const navigate = useNavigate();
//   const [logout] = useLogoutMutation();
//   const { data: admin,isLoading} = useGetProfileQuery(); // 👈 PROFILE
//   // console.log(admin)

//   const handleLogout = async () => {
//     try {
//       await logout().unwrap();
//       toast.success("Logout successful");
//       navigate("/admin-login", { replace: true });
//     } catch (error) {
//       toast.error("Logout failed");
//     }
//   };

//   return (
//     <header className="flex items-center justify-between bg-white px-4 py-3 shadow">
//       <div className="flex items-center gap-3">
//         <button onClick={() => setOpen(true)} className="md:hidden">
//           <Menu />
//         </button>

//         <h2 className="font-semibold">
//           Welcome, <span className="text-blue-600">{admin?.user?.name}</span> 👋
//         </h2>
//       </div>

//       <button
//         onClick={handleLogout}
//         className="bg-red-500 text-white px-3 py-1 rounded"
//       >
//         Logout
//       </button>
//     </header>
//   );
// };

// export default StudentHeader;