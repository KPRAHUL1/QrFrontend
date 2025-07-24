import React, { useState, useEffect } from "react"; // Added useEffect for better data initialization
import axios from "axios";

const EditModal = ({ data, onClose, onSave }) => { // Renamed onSave for consistency
  const [formData, setFormData] = useState({
    fullName: "", // Initialize with empty strings
    email: "",
    phone: "",
    collegeName: "",
    department: "",
    year: "",
    paymentMode: "",
    extraFields: [], // Initialize as an empty array
  });

  // Use useEffect to update formData when 'data' prop changes (e.g., when a new item is selected for edit)
useEffect(() => {
  if (data) {
    setFormData({
      fullName: data.fullName || "",
      email: data.email || "",
      phone: data.phone || "",
      collegeName: data.collegeName || "",
      department: data.department || "",
      year: data.year || "",
      paymentMode: data.paymentMode || "",
      extraFields: Array.isArray(data.extraFields) ? data.extraFields : [],
    });
  }
}, [data]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleExtraFieldChange = (index, field, value) => {
    const updated = [...formData.extraFields];
    updated[index][field] = value;
    setFormData({ ...formData, extraFields: updated });
  };

  const addExtraField = () => {
    setFormData({
      ...formData,
      extraFields: [...formData.extraFields, { label: "", value: "" }],
    });
  };

  const saveChanges = async () => {
    try {
      // Send extraFields as an array of objects. Axios will automatically JSON.stringify it for the request body.
      await axios.put(`http://localhost:7700/api/qrscanner/${data.id}`, formData); // **Corrected Port to 7700**
      onSave(); // Call the callback to refresh data in AdminPage
      onClose();
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes."); // Provide user feedback
    }
  };

  if (!data) return null; // Don't render if no data is passed (modal is closed)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"> {/* Added z-50 */}
      <div className="bg-white p-6 rounded w-[500px] max-h-[90vh] overflow-y-auto"> {/* Added max-height and overflow */}
        <h3 className="text-xl font-bold mb-4">Edit Registration</h3>

        {/* Main fields */}
        {["fullName", "email", "phone", "collegeName", "department", "year", "paymentMode"].map(field => (
          <div className="mb-2" key={field}>
            <label htmlFor={field} className="block text-sm font-medium capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</label> {/* Added htmlFor and capitalize for better UX */}
            <input
              type="text"
              id={field} // Added id
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
        ))}

        {/* Extra fields */}
        <h4 className="mt-4 mb-2 font-semibold">Extra Fields</h4>
        {formData.extraFields.map((ef, idx) => (
          <div key={idx} className="flex gap-2 mb-2 items-center">
            <input
              type="text"
              placeholder="Label"
              value={ef.label}
              onChange={(e) => handleExtraFieldChange(idx, "label", e.target.value)}
              className="flex-1 border px-2 py-1 rounded"
            />
            <input
              type="text"
              placeholder="Value"
              value={ef.value}
              onChange={(e) => handleExtraFieldChange(idx, "value", e.target.value)}
              className="flex-1 border px-2 py-1 rounded"
            />
            {/* Add a remove button for extra fields */}
            <button
              type="button"
              onClick={() => setFormData(prev => ({
                ...prev,
                extraFields: prev.extraFields.filter((_, i) => i !== idx)
              }))}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              x
            </button>
          </div>
        ))}
        <button onClick={addExtraField} className="text-blue-600 text-sm mb-4">+ Add Field</button>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-1 rounded">Cancel</button>
          <button onClick={saveChanges} className="bg-blue-600 text-white px-4 py-1 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;