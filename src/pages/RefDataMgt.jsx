import React, { useState } from "react";

const RefDataMgt = () => {
  const [phaseTask, setPhaseTask] = useState("PA-100 Assessment");
  const [activity, setActivity] = useState("A-101 Plan");

  return (
    <div className="h-[80vh] bg-blue-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">
          Reference Data Management
        </h2>

        <div className="text-sm text-gray-700 mb-6">
          <p>
            <strong>Client:</strong> 014 - General Dynamics
          </p>
          <p>
            <strong>Matter:</strong> 03S - Methods
          </p>
        </div>

        <form className="space-y-5">
          {/* Ref. ID */}
          <div className="flex items-center justify-between">
            <label className="text-gray-700 font-medium w-24">Ref. ID</label>
            <input
              type="text"
              value="G-100"
              readOnly
              className="bg-gray-300 text-gray-800 font-semibold px-3 py-2 rounded-md w-64 cursor-not-allowed"
            />
          </div>

          {/* Phase Task */}
          <div className="flex items-center justify-between">
            <label className="text-gray-700 font-medium w-24">Phase Task</label>
            <select
              value={phaseTask}
              onChange={(e) => setPhaseTask(e.target.value)}
              className="w-64 px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>PA-100 Assessment</option>
              <option>PA-200 Review</option>
              <option>PA-300 Execution</option>
            </select>
          </div>

          {/* Activity */}
          <div className="flex items-center justify-between">
            <label className="text-gray-700 font-medium w-24">Activity</label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-64 px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>A-101 Plan</option>
              <option>A-102 Execute</option>
              <option>A-103 Close</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-full transition-all duration-200 font-semibold"
            >
              Insert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RefDataMgt;
