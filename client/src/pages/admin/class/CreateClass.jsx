import { useState } from "react";
import { useAddClassMutation } from "../../../features/class/classApi";
import { toast } from "react-toastify";

const CreateClass = () => {
  const [course, setCourse] = useState("");

  const [addClass, { isLoading }] = useAddClassMutation(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!course) {
      toast.error("Please select a course/class");
      return;
    }

    try {
      await addClass({ course }).unwrap();
      toast.success("Class created successfully 🎉");
      setCourse("");
    } catch (err) {
      toast.error(err?.data?.message || "Class already exists");
    }
  };

  return (
    <div className="max-w-md bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create Class</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Course */}
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="">Select Course</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {isLoading ? "Creating..." : "Create Class"}
        </button>
      </form>
    </div>
  );
};

export default CreateClass;