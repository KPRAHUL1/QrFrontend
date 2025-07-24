import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Loader2 } from 'lucide-react';

const RegisterForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const getNextWorkshopDate = () => {
    const today = new Date();
    const nextWorkshop = new Date(today);
    nextWorkshop.setDate(today.getDate() + 7);

    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = nextWorkshop.toLocaleDateString('en-US', dateOptions);

    return `${formattedDate} at 4:00 PM`;
  };

  const workshopDate = getNextWorkshopDate();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setRegistrationSuccess(false);

    const formData = new FormData();
    for (let key in data) {
      if (key === 'paymentProof') {
        if (data[key] && data[key][0]) {
          formData.append(key, data[key][0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      await axios.post('http://localhost:7700/api/qrscanner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setRegistrationSuccess(true);
      reset(); 

    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert(`Registration failed: ${error.response?.data?.error || "Please try again."}`); 
    } finally {
      setIsSubmitting(false);
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

        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center mt-10 rounded-2xl">
          <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            {registrationSuccess ? (
              <div className="text-center py-10">
                <h2 className="text-3xl font-extrabold text-green-600 mb-4">
                  Registration Successful!
                </h2>
                <p className="text-gray-700">
                  Thank you for registering for the AWS Workshop. We look forward to seeing you!
                </p>
                <button
                  onClick={() => setRegistrationSuccess(false)} 
                  className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Register Another
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
                  Register for the Event
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      {...register("fullName", { required: true })}
                      placeholder="Your Full Name"
                      className="mt-1 block w-full px-4 py-2 border text-black  border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                    />
                  </div>

              
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                      placeholder="your.email@example.com"
                      type="email"
                      className="mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                    />
                  </div>

         
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      {...register("phone", { required: true })}
                      placeholder="e.g., +919876543210"
                      className="mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                    />
                  </div>

          
                  <div>
                    <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700 mb-1">
                      College Name
                    </label>
                    <input
                      id="collegeName"
                      {...register("collegeName", { required: true })}
                      placeholder="Your College"
                      className="mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                    />
                  </div>

            
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <input
                      id="department"
                      {...register("department", { required: true })}
                      placeholder="e.g., Computer Science"
                      className="mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                    />
                  </div>

                  <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Year
                    </label>
                    <select
                      id="year"
                      {...register("year", { required: true })}
                      className="mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out bg-white"
                    >
                      <option value="">Select Your Academic Year</option>
                      <option>1st</option>
                      <option>2nd</option>
                      <option>3rd</option>
                      <option>4th</option>
                    </select>
                  </div>

             
                  <div>
                    <label htmlFor="awsExperience" className="block text-sm font-medium text-gray-700 mb-1">
                      AWS Experience Level
                    </label>
                    <select
                      id="awsExperience"
                      {...register("awsExperience")}
                      className="mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out bg-white"
                    >
                      <option value="">Select AWS Experience</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>

     
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn Profile URL (Optional)
                    </label>
                    <input
                      id="linkedin"
                      {...register("linkedin")}
                      placeholder="e.g., https://linkedin.com/in/yourname"
                      className="mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                    />
                  </div>

             
                  <div>
                    <label htmlFor="paymentMode" className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Mode
                    </label>
                    <select
                      id="paymentMode"
                      {...register("paymentMode", { required: true })}
                      className="mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out bg-white"
                    >
                      <option value="">Select Payment Mode</option>
                      <option>GPay</option>
                      <option>Paytm</option>
                      <option>QR</option>
                    </select>
                   <a href="/payment" className="text-black px-3 py-2 mt-10  rounded-xl">Pay Money <span className="text-xl">$30</span></a>
                  </div>

               
                  <div>
                    <label htmlFor="paymentProof" className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Proof Screenshot
                    </label>
                    <input
                      id="paymentProof"
                      type="file"
                      {...register("paymentProof", { required: true })}
                      className="mt-1 block w-full text-sm text-gray-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Please upload a screenshot of your payment. (Max 5MB)
                    </p>
                  </div>

            
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      'Register Now'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
