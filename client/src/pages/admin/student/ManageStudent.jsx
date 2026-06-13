import { useState, useEffect } from "react";
import {
    useGetStudentsQuery,
    useDeleteStudentMutation,
    useUpdateStudentMutation
} from "../../../features/student/studentApi";
import { useGetClassesQuery } from "../../../features/class/classApi";
import { toast } from "react-toastify";

const StudentList = () => {
    const {
        data: students = [],
        isLoading,
        refetch
    } = useGetStudentsQuery();

    const { data: classes = [] } = useGetClassesQuery();

    const [deleteStudent] = useDeleteStudentMutation();
    const [updateStudent] = useUpdateStudentMutation();

    const [selectedStudent, setSelectedStudent] = useState(null);

    const [form, setForm] = useState({
        name: "",
        rollNo: "",
        email: "",
        classId: "",
        year: ""
    });

    // Prefill Edit Data
    useEffect(() => {
        if (selectedStudent) {
            setForm({
                name: selectedStudent.user?.name || "",
                rollNo: selectedStudent.rollNo || "",
                email: selectedStudent.user?.email || "",
                classId: selectedStudent.class?._id || "",
                year: selectedStudent.year || ""
            });
        }
    }, [selectedStudent]);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    // ✅ FIXED UPDATE
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateStudent({
                id: selectedStudent._id,
                ...form
            }).unwrap();

            toast.success("Student updated successfully 🎉");
            setSelectedStudent(null);
            refetch(); // refresh list
        } catch (err) {
            toast.error(err?.data?.message || "Update failed");
        }
    };

    // ✅ DELETE FIX
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteStudent(id).unwrap();
                toast.success("Student deleted");
                refetch();
            } catch (err) {
                toast.error("Delete failed");
            }
        }
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">📋 Student List</h2>

            <table className="w-full text-sm text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2">Name</th>
                        <th className="p-2">Roll</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Class</th>
                        <th className="p-2">Year</th>
                        <th className="p-2 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((s) => (
                        <tr key={s._id} className="border-b">
                            <td className="p-2">{s.user?.name}</td>
                            <td className="p-2">{s.rollNo}</td>
                            <td className="p-2">{s.user?.email}</td>
                            <td className="p-2">
                                {s.class?.course} - Sem {s.class?.semester}
                            </td>
                            <td className="p-2">{s.year}</td>
                            <td className="p-2 flex gap-2 justify-center">
                                <button
                                    onClick={() => setSelectedStudent(s)}
                                    className="px-3 py-1 bg-yellow-500 rounded text-white hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(s._id)}
                                    className="px-3 py-1 bg-red-500 rounded text-white hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* EDIT MODAL */}
            {selectedStudent && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="bg-white w-96 p-6 rounded-xl shadow-lg">
                        <h2 className="text-lg font-bold mb-4">✏ Edit Student</h2>

                        <form onSubmit={handleUpdate} className="space-y-3">
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full border p-2 rounded"
                            />

                            <input
                                name="rollNo"
                                value={form.rollNo}
                                onChange={handleChange}
                                placeholder="Roll No"
                                className="w-full border p-2 rounded"
                            />

                            <input
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full border p-2 rounded"
                            />

                            <select
                                name="classId"
                                value={form.classId}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            >
                                <option value="">Select Class</option>
                                {classes.map((cls) => (
                                    <option key={cls._id} value={cls._id}>
                                        {cls.course} - Sem {cls.semester}
                                    </option>
                                ))}
                            </select>

                            <input
                                name="year"
                                value={form.year}
                                onChange={handleChange}
                                placeholder="Year"
                                className="w-full border p-2 rounded"
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setSelectedStudent(null)}
                                    className="px-3 py-1 bg-gray-400 text-white rounded"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentList;