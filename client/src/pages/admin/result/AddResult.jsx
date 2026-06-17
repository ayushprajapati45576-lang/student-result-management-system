import { useState, useMemo } from "react";
import { useGetStudentsQuery } from "../../../features/student/studentApi";
import { useGetSubjectsQuery } from "../../../features/subject/subjectApi";
import { useAddBulkResultMutation } from "../../../features/result/resultApi";
import { toast } from "react-toastify";

const AddBulkResult = () => {
    const { data: students = [] } = useGetStudentsQuery();
    const { data: subjects = [] } = useGetSubjectsQuery();
    const [addBulkResult, { isLoading }] = useAddBulkResultMutation();

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [year, setYear] = useState(new Date().getFullYear());
    const [marks, setMarks] = useState([
        { subjectId: "", marksObtained: "" }
    ]);

    // 🎯 Filter subjects based on selected student's class
    const filteredSubjects = useMemo(() => {
        if (!selectedStudent) return [];

        return subjects.filter(
            (sub) =>
                String(sub.class?._id || sub.class) ===
                String(selectedStudent.class?._id || selectedStudent.class)
        );
    }, [subjects, selectedStudent]);

    // ➕ Add More Subject
    const addMoreSubject = () => {
        setMarks([...marks, { subjectId: "", marksObtained: "" }]);
    };

    // 📝 Handle Marks Change
    const handleChange = (index, field, value) => {
        const updated = [...marks];
        updated[index][field] = value;
        setMarks(updated);
    };

    // 🚀 Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedStudent) {
            return toast.error("Please select student");
        }

        try {
            const res = await addBulkResult({
                studentId: selectedStudent._id,
                year: Number(year),
                marks: marks.map((m) => ({
                    subjectId: m.subjectId,
                    marksObtained: Number(m.marksObtained)
                }))
            }).unwrap();

            toast.success(res.message);

            setSelectedStudent(null);
            setMarks([{ subjectId: "", marksObtained: "" }]);
        } catch (error) {
            toast.error(error?.data?.message || "Error adding result");
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">
                📊 Declare Student Result
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* 🎓 Student Dropdown */}
                <div>
                    <label className="block mb-1 font-medium">Select Student</label>
                    <select
                        className="w-full border p-2 rounded-lg"
                        value={selectedStudent?._id || ""}
                        onChange={(e) => {
                            const student = students.find(
                                (s) => s._id === e.target.value
                            );
                            setSelectedStudent(student);
                        }}
                    >
                        <option value="">Select Student</option>
                        {students.map((s) => (
                            <option key={s._id} value={s._id}>
                                {s.user?.name} ({s.rollNo})
                            </option>
                        ))}
                    </select>
                </div>

                {/* 📅 Year */}
                <div>
                    <label className="block mb-1 font-medium">Year</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full border p-2 rounded-lg"
                    />
                </div>

                <hr />

                {/* 📚 Subject + Marks */}
                {marks.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-2 gap-4 items-end"
                    >
                        <div>
                            <label className="block mb-1 font-medium">
                                Subject
                            </label>
                            <select
                                value={item.subjectId}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "subjectId",
                                        e.target.value
                                    )
                                }
                                className="w-full border p-2 rounded-lg"
                            >
                                <option value="">Select Subject</option>
                                {filteredSubjects.map((sub) => (
                                    <option key={sub._id} value={sub._id}>
                                        {sub.name} ({sub.code})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                Marks
                            </label>
                            <input
                                type="number"
                                placeholder="Enter Marks"
                                value={item.marksObtained}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "marksObtained",
                                        e.target.value
                                    )
                                }
                                className="w-full border p-2 rounded-lg"
                            />
                        </div>
                    </div>
                ))}

                {/* ➕ Add More */}
                <button
                    type="button"
                    onClick={addMoreSubject}
                    className="text-blue-600 font-semibold"
                >
                    + Add More Subject
                </button>

                {/* 🚀 Submit */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl mt-4"
                >
                    {isLoading ? "Saving..." : "Declare Result"}
                </button>
            </form>
        </div>
    );
};

export default AddBulkResult;