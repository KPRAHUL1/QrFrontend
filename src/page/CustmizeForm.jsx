import React, { useState } from 'react';

const CustomizeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    extraFields: ['']
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name === 'extraFields') {
      const updatedFields = [...formData.extraFields];
      updatedFields[index] = value;
      setFormData(prev => ({ ...prev, extraFields: updatedFields }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addField = () => {
    setFormData(prev => ({
      ...prev,
      extraFields: [...prev.extraFields, '']
    }));
  };

  const removeField = index => {
    const updatedFields = formData.extraFields.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, extraFields: updatedFields }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can POST this to your backend
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-6">Customize Form</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Department</label>
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="e.g. Development, HR"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Custom Fields</label>
          {formData.extraFields.map((field, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                name="extraFields"
                value={field}
                onChange={e => handleChange(e, index)}
                className="flex-grow border border-gray-300 p-2 rounded"
                placeholder={`Custom Field ${index + 1}`}
              />
              <button
                type="button"
                className="text-red-500 font-bold"
                onClick={() => removeField(index)}
              >
                ✖
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-blue-600 text-sm mt-2 underline"
            onClick={addField}
          >
            + Add Field
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomizeForm;
