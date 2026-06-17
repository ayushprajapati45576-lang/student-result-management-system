import { useState } from "react";
import {
  useGetSubjectsQuery,
  useDeleteSubjectMutation,
  useUpdateSubjectMutation,
} from "../../../features/subject/subjectApi"; 
import { toast } from "react-toastify";

const ManageSubjects = () => {
  const { data: subjects = [], isLoading } = useGetSubjectsQuery();

  const [deleteSubject, { isLoading: deleting }] =
    useDeleteSubjectMutation();

  const [updateSubject, { isLoading: updating }] =
    useUpdateSubjectMutation();

  const [editData, setEditData] = useState(null);

  // 🔴 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subject?")) return;

    try {
      await deleteSubject(id).unwrap();
      toast.success("Subject deleted");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  // 🔵 UPDATE
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateSubject({
        id: editData._id,
        data: {
          name: editData.name,
          code: editData.code,
          maxMarks: editData.maxMarks,
        },
      }).unwrap();

      toast.success("Subject updated");
      setEditData(null);
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Manage Subjects</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Code</th>
            <th className="border p-2">Marks</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((s, i) => (
            <tr key={s._id}>
              <td className="border p-2">{i + 1}</td>
              <td className="border p-2">
                Class {s.class?.course}
              </td>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.code}</td>
              <td className="border p-2">{s.maxMarks}</td>

              <td className="border p-2 space-x-2">
                <button
                  onClick={() => setEditData(s)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  disabled={deleting}
                  onClick={() => handleDelete(s._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 EDIT MODAL */}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded w-96"
          >
            <h3 className="text-lg font-semibold mb-4">Edit Subject</h3>

            <input
              type="text"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              className="w-full border p-2 mb-3"
              placeholder="Subject Name"
              required
            />

            <input
              type="text"
              value={editData.code}
              onChange={(e) =>
                setEditData({ ...editData, code: e.target.value })
              }
              className="w-full border p-2 mb-3"
              placeholder="Subject Code"
              required
            />

            <input
              type="number"
              value={editData.maxMarks}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  maxMarks: e.target.value,
                })
              }
              className="w-full border p-2 mb-3"
              placeholder="Max Marks"
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

export default ManageSubjects;

