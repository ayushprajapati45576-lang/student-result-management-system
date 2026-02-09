import {
  useGetClassesQuery,
  useDeleteClassMutation,
} from "../../../features/class/classApi"; 
import { toast } from "react-toastify";

const ManageClasses = () => { 
  const { data, isLoading } = useGetClassesQuery();
  const [deleteClass] = useDeleteClassMutation();

  const handleDelete = async (id) => {
    if (!confirm("Delete this class?")) return;
    await deleteClass(id);
    toast.success("Class deleted");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Manage Classes</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Course</th>
            <th className="border p-2">Semester</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((cls, index) => (
            <tr key={cls._id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{cls.course}</td>
              <td className="border p-2">Sem {cls.semester}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(cls._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageClasses;