import { useState } from "react";
import {
  useGetClassesQuery,
  useDeleteClassMutation,
  useUpdateClassMutation,
} from "../../../features/class/classApi";
import { toast } from "react-toastify";

const ManageClasses = () => {
  const { data, isLoading } = useGetClassesQuery();
  const [deleteClass, { isLoading: deleting }] = useDeleteClassMutation();
  const [updateClass, { isLoading: updating }] = useUpdateClassMutation();

  const [editData, setEditData] = useState(null);

  // 🔴 Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this class?")) return;

    try {
      await deleteClass(id).unwrap();
      toast.success("Class deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // 🔵 Update
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateClass({
        id: editData._id,
        data: {
          course: editData.course,
          semester: editData.semester,
        },
      }).unwrap(); // 🔥 IMPORTANT

      toast.success("Class updated");
      setEditData(null); // close modal
    } catch (error) {
        toast.error(error?.data?.message || "Update failed");

    }
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
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => setEditData(cls)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  disabled={deleting}
                  onClick={() => handleDelete(cls._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 Edit Modal */}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded w-96"
          >
            <h3 className="text-lg font-semibold mb-4">Edit Class</h3>

            <input
              type="text"
              value={editData.course}
              onChange={(e) =>
                setEditData({ ...editData, course: e.target.value })
              }
              className="w-full border p-2 mb-3"
              placeholder="Course Name"
              required
            />

            <input
              type="number"
              value={editData.semester}
              onChange={(e) =>
                setEditData({ ...editData, semester: e.target.value })
              }
              className="w-full border p-2 mb-3"
              placeholder="Semester"
              required
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditData(null)}
                className="px-4 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={updating}
                className="bg-green-600 text-white px-4 py-1 rounded disabled:opacity-50"
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      )}
      
    </div>
  );
};

export default ManageClasses;