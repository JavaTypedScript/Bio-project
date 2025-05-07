import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormdata] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigree: "",
    age: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData
      );
      setPrediction(response.data.prediction);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Diabetes Risk Predictor In Females
              </h1>

              <p className="mt-2 text-gray-600">
                Enter your health information to assess your diabetes risk
              </p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                

                <div>
                  <label
                    htmlFor="glucose"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Glucose (mg/dL)
                  </label>

                  <input
                    type="number"
                    id="glucose"
                    name="glucose"
                    value={formData.glucose}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="bloodPressure"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Blood Pressure (mm Hg)
                  </label>

                  <input
                    type="number"
                    id="bloodPressure"
                    name="bloodPressure"
                    value={formData.bloodPressure}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="skinThickness"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Skin Thickness (mm)
                  </label>

                  <input
                    type="number"
                    id="skinThickness"
                    name="skinThickness"
                    value={formData.skinThickness}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="insulin"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Insulin (mu U/ml)
                  </label>

                  <input
                    type="number"
                    id="insulin"
                    name="insulin"
                    value={formData.insulin}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="bmi"
                    className="block text-sm font-medium text-gray-700"
                  >
                    BMI (kg/m²)
                  </label>

                  <input
                    type="number"
                    step="0.1"
                    id="bmi"
                    name="bmi"
                    value={formData.bmi}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="diabetesPedigree"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Diabetes Pedigree Function(0.0 to 1.0)
                  </label>

                  <input
                    type="number"
                    step="0.001"
                    id="diabetesPedigree"
                    name="diabetesPedigree"
                    value={formData.diabetesPedigree}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Age (years)
                  </label>

                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="pregnancies"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Pregnancies(No of pregnancies)
                  </label>

                  <input
                    type="number"
                    id="pregnancies"
                    name="pregnancies"
                    value={formData.pregnancies}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Predicting..." : "Predict Diabetes Risk"}
                </button>
              </div>
            </form>

            {prediction !== null && (
              <div
                className={`mt-8 p-6 rounded-lg ${
                  prediction > 50 ? "bg-red-100" : "bg-green-100"
                }`}
              >
                <h2 className="text-xl font-semibold text-center mb-2">
                  Diabetes Risk Prediction
                </h2>

                <div className="text-center">
                  <span className="text-4xl font-bold">{prediction}%</span>

                  <p className="mt-2">
                    {prediction > 50
                      ? "Higher risk of diabetes. Please consult a healthcare professional."
                      : "Lower risk of diabetes. Maintain a healthy lifestyle!"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

  );
}

export default App;
