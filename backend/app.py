# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib  # For loading pre-trained models
import numpy as np

app = Flask(__name__)
CORS(app)

# Load your pre-trained machine learning model
try:
    model = joblib.load('diabetes_model.pkl')  # Replace 'your_model.pkl' with your model file
except FileNotFoundError:
    print("Error: Model file not found!")
    model = None

@app.route('/')  # This route handles the root URL (http://localhost:5000/)
def home():
    return "Welcome to my Flask app!"

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500

    try:
        data = request.json
        # Assuming your React frontend sends data as a JSON object
        # with keys corresponding to your model's input features.
        features = np.array([[float(data[key]) for key in ['pregnancies','glucose','bloodPressure','skinThickness','insulin','bmi','diabetesPedigree','age']]])
        prediction = model.predict_proba(features)[0][1]*100  # Convert NumPy array to list
        probability=round(prediction,2);
        return jsonify({'prediction': probability})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000) # Run the Flask app on port 5000