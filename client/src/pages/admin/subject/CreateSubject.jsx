import { useState } from "react";
import { useGetClassesQuery } from "../../../features/class/classApi";
import { useAddSubjectMutation } from "../../../features/subject/subjectApi";
import { toast } from "react-toastify";

const CreateSubject = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [classId, setClassId] = useState("");

  const { data, isLoading: classLoading } = useGetClassesQuery();
  const classes = data?.classes || data || [];

  const [addSubject, { isLoading }] = useAddSubjectMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !code || !classId) {
      toast.error("All fields required");
      return;
    }

    try {
      await addSubject({ name, code, classId }).unwrap();
      toast.success("Subject added successfully 🎉");

      setName("");
      setCode("");
      setClassId("");
    } catch (err) {
      toast.error(err?.data?.message || "Error adding subject");
    }
  };

  return (
    <div className="max-w-md bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Subject</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Subject Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="text"
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />

        <select
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="">
            {classLoading ? "Loading classes..." : "Select Class"}
          </option>

          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              Class {cls.course}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          {isLoading ? "Saving..." : "Add Subject"}
        </button>
      </form>
    </div>
  );
};

export default CreateSubject;
