import { useGetMyResultQuery } from "../features/result/resultApi";

const MyResult = () => {

    const { data, isLoading } = useGetMyResultQuery();

    if (isLoading) return <h2>Loading...</h2>;

    const student = data?.student;
    const results = data?.results || [];

    const total = results.reduce((sum, r) => sum + r.marksObtained, 0);
    const max = results.reduce((sum, r) => sum + r.totalMarks, 0);
    const percentage = ((total / max) * 100).toFixed(2);

    return (
        <div className="max-w-5xl mx-auto mt-24">

            <h1 className="text-3xl font-bold text-center mb-6">
                🎓 Student Result
            </h1>

            {/* Student Info */}
            <div className="bg-gray-100 p-6 rounded-lg grid grid-cols-2 gap-4 mb-6">

                <p><b>Name:</b> {student?.user?.name}</p>

                <p><b>Roll No:</b> {student?.rollNo}</p>

                <p><b>Class:</b> {student?.class?.class}</p>

                <p><b>Semester:</b> {results[0]?.semester}</p>

                <p><b>Year:</b> {results[0]?.year}</p>

                <p><b>Percentage:</b> {percentage}%</p>

            </div>

            {/* Result Table */}

            <table className="w-full border">

                <thead className="bg-blue-600 text-white">

                    <tr>
                        <th className="p-3">Subject</th>
                        <th className="p-3">Semester</th>
                        <th className="p-3">Marks</th>
                        <th className="p-3">Grade</th>
                    </tr>

                </thead>

                <tbody>

                    {results.map((r) => (

                        <tr key={r._id} className="text-center border">

                            <td className="p-3">{r.subject.name}</td>

                            <td>{r.semester}</td>

                            <td>{r.marksObtained}/{r.totalMarks}</td>

                            <td className="font-bold text-green-600">
                                {r.grade}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default MyResult;




