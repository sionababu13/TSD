
import React from "react";
import "./App.css";

// Functional Component
function StudentCard(props) {
  return (
    <div className="student-card">
      <div className="profile-icon">
        {props.name.charAt(0)}
      </div>

      <h2>{props.name}</h2>

      <p><strong>Roll No:</strong> {props.rollNo}</p>
      <p><strong>Department:</strong> {props.department}</p>
      <p><strong>Year:</strong> {props.year}</p>
      <p><strong>Email:</strong> {props.email}</p>
    </div>
  );
}

// Main Component
function App() {
  return (
    <div className="portal">
      <h1>College Student Portal</h1>
      <h2>Student Profiles</h2>

      <div className="profile-container">
        <StudentCard
          name="Siona Babu"
          rollNo="101"
          department="Information Technology"
          year="Third Year"
          email="siona@example.com"
        />

        <StudentCard
          name="Cinol Samson"
          rollNo="102"
          department="Computer Science"
          year="Third Year"
          email="cinol@example.com"
        />

        <StudentCard
          name="Meenu Mathews"
          rollNo="103"
          department="Electronics"
          year="Second Year"
          email="meenu@example.com"
        />
      </div>
    </div>
  );
}

export default App;
