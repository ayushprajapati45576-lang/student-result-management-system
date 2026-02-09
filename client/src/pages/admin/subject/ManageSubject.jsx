import { useState } from "react";
import {
    useGetSubjectsQuery,
    
    // useUpdateSubjectMutation,
} from "../../../features/subject/subjectApi"
import { toast } from "react-toastify";

const ManageSubjects = () => {
    const { data: subjects = [], isloading } = useGetSubjectsQuery();
    // const[updateSubject] = useUpdateSubjectMutation();

    // const [editData, setEditData] = useState(null);

    // DELETE
    const handleDelete = async (id) => {
        if (!confirm("Delete this subjects")) return;
        try {
            await deleteSubject(id).unwrap();
            toast.success("subject deleted");
        }
        catch (err) {
            toast.error(err?.data?.message || "Delete failed");
        }
    };


    if (isloading) return <p>loading...</p>;

    return (
        <div className="bg-white p-6 rounded-shadow">
            <h2 className="text-xl font-semibold mb-4 ">Manage Subjects</h2>

            <table className="w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">#</th>
                        <th className="border p-2">class</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Code</th>
                        <th className="border p-2">Marks</th>
                        <th className="border p-2">Action</th>

                    </tr>
                </thead>

                <tbody>
                    {subjects.map((s, i) => (
                        <tr key={s._id}>
                            <td className="border p-2 ">{i + 1}</td>
                            <td className="border p-2 ">{s.class?.course}- Sem {s.class?.semester}</td>
                            <td className="border p-2">{s.name}</td>
                            <td className="border p-2">{s.code}</td>
                            <td className="border p-2">{s.maxMarks}</td>

                            <td className="border p-2 space-x-2">
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded">
                                    Edit
                                </button>

                                <button
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
    )
}

export default ManageSubjects;



