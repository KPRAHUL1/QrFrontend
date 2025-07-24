import React, { useEffect, useState } from "react";
import axios from "axios";
import EditModal from "../Editmodel";

const AdminPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [selectedEdit, setSelectedEdit] = useState(null);

const fetchRegistrations = async () => {
  try {
    const res = await axios.get("http://localhost:7700/api/qrscanner");
    setRegistrations(res.data);
  } catch (error) {
    console.error("Error fetching registrations:", error);
  }
};

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this registration?")) return;
  try {
    await axios.delete(`http://localhost:7700/api/qrscanner/${id}`);
    fetchRegistrations();
  } catch (error) {
    console.error("Error deleting registration:", error);
    alert("Failed to delete registration.");
  }
};
  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6"> Admin Dashboard</h2>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">College</th>
              <th className="p-2">Department</th>
              <th className="p-2">Year</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Screenshot</th>
              <th className="p-2">Actions</th> 
            </tr>
          </thead>
          <tbody>
            {registrations.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{r.fullName}</td>
                <td className="p-2">{r.email}</td>
                <td className="p-2">{r.phone}</td>
                <td className="p-2">{r.collegeName}</td>
                <td className="p-2">{r.department}</td>
                <td className="p-2">{r.year}</td>
                <td className="p-2">{r.paymentMode}</td>
                <td className="p-2">
                  <a
                    href={`http://localhost:7700/${r.paymentProof}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View
                  </a>
                </td>

                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => setSelectedEdit(r)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {registrations.length === 0 && (
              <tr>
                <td colSpan={9} className="p-4 text-center text-gray-500">
                  No registrations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedEdit && (
        <EditModal
          open={!!selectedEdit}
          data={selectedEdit}
          onClose={() => setSelectedEdit(null)}
          onSave={fetchRegistrations}
        />
      )}
    </div>
  );
};

export default AdminPage;