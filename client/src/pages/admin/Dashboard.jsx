const Dashboard = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4">

      <div className="bg-blue-500 text-white p-6 rounded">
        <h3>Regd Users</h3>
        <p className="text-3xl font-bold">6</p>
      </div>

      <div className="bg-red-500 text-white p-6 rounded">
        <h3>Subjects Listed</h3>
        <p className="text-3xl font-bold">7</p>
      </div>

      <div className="bg-yellow-500 text-white p-6 rounded">
        <h3>Total Classes</h3>
        <p className="text-3xl font-bold">8</p>
      </div>

      <div className="bg-green-500 text-white p-6 rounded">
        <h3>Results Declared</h3>
        <p className="text-3xl font-bold">5</p>
      </div>

    </div>
  );
};

export default Dashboard;