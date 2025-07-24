import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Loader2, X } from 'lucide-react'; 

const EditModal = ({ open, data, onClose, onSave }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPaymentProof, setCurrentPaymentProof] = useState(null);

  useEffect(() => {
    if (open && data) {
   
      for (const key in data) {
        if (key !== 'paymentProof') { 
          setValue(key, data[key]);
        }
      }
   
      if (data.paymentProof) {
        setCurrentPaymentProof(`http://localhost:7700/${data.paymentProof}`);
      } else {
        setCurrentPaymentProof(null);
      }
    
      reset(data);
    }
  }, [open, data, reset, setValue]);

  const onSubmit = async (formData) => {
    setIsUpdating(true);
    const updateData = new FormData();


    for (const key in formData) {
      if (key === 'paymentProof') {
  
        if (formData[key] && formData[key][0]) {
          updateData.append(key, formData[key][0]);
        }

      } else {
        updateData.append(key, formData[key]);
      }
    }

    try {
      await axios.put(`http://localhost:7700/api/qrscanner/${data.id}`, updateData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Registration updated successfully!"); 
      onSave();
      onClose();
    } catch (error) {
      console.error("Error updating registration:", error.response?.data || error.message);
      alert(`Failed to update registration: ${error.response?.data?.error || "Please try again."}`); 
    } finally {
      setIsUpdating(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Edit Registration
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <div>
            <label htmlFor="editFullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="editFullName"
              {...register("fullName", { required: true })}
              placeholder="Full Name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>

     
          <div>
            <label htmlFor="editEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="editEmail"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              placeholder="Email"
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>

       
          <div>
            <label htmlFor="editPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              id="editPhone"
              {...register("phone", { required: true })}
              placeholder="Phone Number"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>

         
          <div>
            <label htmlFor="editCollegeName" className="block text-sm font-medium text-gray-700 mb-1">
              College Name
            </label>
            <input
              id="editCollegeName"
              {...register("collegeName", { required: true })}
              placeholder="College Name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>

        
          <div>
            <label htmlFor="editDepartment" className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <input
              id="editDepartment"
              {...register("department", { required: true })}
              placeholder="Department"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>

      
          <div>
            <label htmlFor="editYear" className="block text-sm font-medium text-gray-700 mb-1">
              Current Year
            </label>
            <select
              id="editYear"
              {...register("year", { required: true })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out bg-white"
            >
              <option value="">Select Your Academic Year</option>
              <option>1st</option>
              <option>2nd</option>
              <option>3rd</option>
              <option>4th</option>
            </select>
          </div>
          <div>
            <label htmlFor="editAwsExperience" className="block text-sm font-medium text-gray-700 mb-1">
              AWS Experience Level
            </label>
            <select
              id="editAwsExperience"
              {...register("awsExperience")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out bg-white"
            >
              <option value="">Select AWS Experience</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div>
            <label htmlFor="editLinkedin" className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn Profile URL (Optional)
            </label>
            <input
              id="editLinkedin"
              {...register("linkedin")}
              placeholder="e.g., https://linkedin.com/in/yourname"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>

          <div>
            <label htmlFor="editAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount Paid ($)
            </label>
            <input
              id="editAmount"
              type="number"
              step="0.01"
              {...register("amount", { required: true, valueAsNumber: true })}
              placeholder="e.g., 39.00"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>

          <div>
            <label htmlFor="editPaymentMode" className="block text-sm font-medium text-gray-700 mb-1">
              Payment Mode
            </label>
            <select
              id="editPaymentMode"
              {...register("paymentMode", { required: true })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out bg-white"
            >
              <option value="">Select Payment Mode</option>
              <option>GPay</option>
              <option>Paytm</option>
              <option>QR</option>
            </select>
          </div>

          <div>
            <label htmlFor="editPaymentProof" className="block text-sm font-medium text-gray-700 mb-1">
              Payment Proof Screenshot
            </label>
            {currentPaymentProof && (
              <div className="mb-2">
                <p className="text-sm text-gray-600">Current Proof:</p>
                <a
                  href={currentPaymentProof}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline text-sm"
                >
                  View Current Screenshot
                </a>
              </div>
            )}
            <input
              id="editPaymentProof"
              type="file"
              {...register("paymentProof")}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
            <p className="mt-1 text-xs text-gray-500">
              Upload a new screenshot if you want to change it. (Max 5MB)
            </p>
          </div>

    
          <button
            type="submit"
            disabled={isUpdating}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </div>
            ) : (
              'Save Changes'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
