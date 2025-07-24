import { useForm } from "react-hook-form";
import axios from "axios";

const RegisterForm = () => {
  const { register, handleSubmit, reset } = useForm(); 
  
  // Added reset for clearing the form
 const getNextWorkshopDate = () => {
    const today = new Date();
    const nextWorkshop = new Date(today);
    nextWorkshop.setDate(today.getDate() + 7); // Add 7 days to today's date

    // Format the date nicely (e.g., "July 31, 2025")
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return nextWorkshop.toLocaleDateString('en-US', options); // Using en-US for consistent formatting, you can change locale
  };

  const workshopDate = getNextWorkshopDate();
  const onSubmit = async (data) => {
    const formData = new FormData();
    // Append all fields to FormData, correctly handling the file input
    for (let key in data) {
      if (key === 'paymentProof') {
        // Ensure data[key] is not null or undefined and has a file
        if (data[key] && data[key][0]) {
          formData.append(key, data[key][0]);
        }
      } else if (key === 'awsExperience' || key === 'linkedin') { // These are the new 'extraFields'
        // Create an array of objects for extraFields
        // This is a simplified approach, you might need a more robust way
        // to collect dynamic extra fields if they are truly variable.
        // For these two specific fields, we'll append them as part of the main data for now.
        // Later, we'll discuss how to group them into a 'extraFields' JSON object.
        formData.append(key, data[key]);
      } else {
        formData.append(key, data[key]);
      }
    }

    // --- IMPORTANT: Update the API endpoint and port ---
    // Based on previous conversations, your backend runs on port 7700.
    // Also, your backend router for registrations is '/api/qrscanner',
    // and the POST endpoint for adding a registration is '/' on that router.
    // So the full URL for registration is likely 'http://localhost:7700/api/qrscanner'
    try {
      await axios.post('http://localhost:7700/api/qrscanner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Essential for file uploads with FormData
        },
      });
      alert("Registration successful!");
      reset(); // Clear the form after successful submission
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert(`Registration failed: ${error.response?.data?.error || "Please try again."}`);
    }
  };

  return (
    <>
 <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-xl m-4">
      <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
        AWS Workshop
      </h1>
      <span className="text-xl font-medium">
        Next Workshop Date: <span className="font-semibold">{workshopDate}</span>
      </span>
      <p className="mt-4 text-center text-sm opacity-90 max-w-prose">
        Join us for an exciting deep dive into Amazon Web Services. Learn about cloud computing,
        deploying applications, and leveraging AWS services for your projects. All skill levels welcome!
      </p>
  
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Register for the Event
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="fullName"
              {...register("fullName", { required: true })}
              placeholder="Your Full Name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              placeholder="your.email@example.com"
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              {...register("phone", { required: true })}
              placeholder="e.g., +919876543210"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>

          {/* College Name */}
          <div>
            <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700 mb-1">
              College Name
            </label>
            <input
              id="collegeName"
              {...register("collegeName", { required: true })}
              placeholder="Your College"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>

          {/* Department */}
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <input
              id="department"
              {...register("department", { required: true })}
              placeholder="e.g., Computer Science"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>

          {/* Year */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Current Year
            </label>
            <select
              id="year"
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

          {/* AWS Experience (Extra Field) */}
          <div>
            <label htmlFor="awsExperience" className="block text-sm font-medium text-gray-700 mb-1">
              AWS Experience Level
            </label>
            <select
              id="awsExperience"
              {...register("awsExperience")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out bg-white"
            >
              <option value="">Select AWS Experience</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          {/* LinkedIn Profile (Extra Field) */}
          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn Profile URL (Optional)
            </label>
            <input
              id="linkedin"
              {...register("linkedin")}
              placeholder="e.g., https://linkedin.com/in/yourname"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>

          {/* Payment Mode */}
          <div>
            <label htmlFor="paymentMode" className="block text-sm font-medium text-gray-700 mb-1">
              Payment Mode
            </label>
            <select
              id="paymentMode"
              {...register("paymentMode", { required: true })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out bg-white"
            >
              <option value="">Select Payment Mode</option>
              <option>GPay</option>
              <option>Paytm</option>
              <option>QR</option>
            </select>
          </div>

          {/* Payment Proof */}
          <div>
            <label htmlFor="paymentProof" className="block text-sm font-medium text-gray-700 mb-1">
              Payment Proof Screenshot
            </label>
            <input
              id="paymentProof"
              type="file"
              {...register("paymentProof", { required: true })}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
            <p className="mt-1 text-xs text-gray-500">
              Please upload a screenshot of your payment. (Max 5MB)
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Register Now
          </button>
        </form>
      </div>
    </div>
      </div>
    </>
    
  );
};

export default RegisterForm;