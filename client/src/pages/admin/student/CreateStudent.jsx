import { useState } from "react";
import { useAddStudentMutation } from "../../../features/student/studentApi";
import { useGetClassesQuery } from "../../../features/class/classApi";
import { toast } from "react-toastify";

const AddStudent = () => {
  const { data: classes = [], isLoading: classLoading } = useGetClassesQuery();
  const [addStudent, { isLoading }] = useAddStudentMutation();

  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    email: "",   // ✅ ADD
    classId: "",
    year: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.rollNo ||
      !form.email ||    // ✅ ADD
      !form.classId ||
      !form.year ||
      !form.password
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      await addStudent(form).unwrap();
      toast.success("Student added successfully 🎉");

      setForm({
        name: "",
        rollNo: "",
        email: "",
        classId: "",
        year: "",
        password: ""
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || "Failed to add student");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md">
      <h2 className="text-xl font-bold mb-4">➕ Add Student</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          name="name"
          placeholder="Student Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="rollNo"
          placeholder="Roll No"
          value={form.rollNo}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* ✅ EMAIL FIELD */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select
          name="classId"
          value={form.classId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Class</option>
          {classLoading ? (
            <option>Loading...</option>
          ) : (
            classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.course} - Sem {cls.semester}
              </option>
            ))
          )}
        </select>

        <input
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {isLoading ? "Saving..." : "Add Student"}
        </button>

      </form>
    </div>
  );
};

export default AddStudent;