import React, { useState, useEffect } from "react";
import { Edit, Trash2, BarChart3, Table } from "lucide-react";

// Predefined data for dropdowns
const phaseTaskData = {
  "PA-100": "Review Documents",
  "PA-101": "Legal Research",
  "PA-102": "Case Preparation",
  "PA-103": "Client Consultation",
  "PA-104": "Contract Analysis",
};

const activityData = {
  "A-100": "Document Review and Analysis",
  "A-101": "Legal Case Research",
  "A-102": "Court Filing Preparation",
  "A-103": "Client Meeting and Discussion",
  "A-104": "Contract Terms Review",
};

// Helper to build tree data from records
const buildPhaseTree = (records) => {
  const phaseMap = {};
  records.forEach(
    ({ phaseTaskId, phaseTaskDesc, activityId, activityDesc }) => {
      if (!phaseMap[phaseTaskId]) {
        phaseMap[phaseTaskId] = {
          name: phaseTaskId,
          attributes: { desc: phaseTaskDesc },
          children: [],
        };
      }
      phaseMap[phaseTaskId].children.push({
        name: activityId,
        attributes: { desc: activityDesc },
      });
    }
  );
  return Object.values(phaseMap);
};

// Simple tree visualization component
const PhaseActivityTree = ({ records }) => {
  const treeData = buildPhaseTree(records);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Phase-Activity Tree
      </h3>
      <div className="space-y-4">
        {treeData.map((phase, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4">
            <div className="font-semibold text-blue-600">
              {phase.name}: {phase.attributes.desc}
            </div>
            <div className="ml-4 mt-2 space-y-1">
              {phase.children.map((activity, actIndex) => (
                <div key={actIndex} className="text-sm text-gray-600">
                  └── {activity.name}: {activity.attributes.desc}
                </div>
              ))}
            </div>
          </div>
        ))}
        {treeData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No data to visualize yet
          </div>
        )}
      </div>
    </div>
  );
};

const RefDataMgt = () => {
  const [organisation, setOrganisation] = useState("");
  const [phaseTaskId, setPhaseTaskId] = useState("");
  const [phaseTaskDesc, setPhaseTaskDesc] = useState("");
  const [activityId, setActivityId] = useState("");
  const [activityDesc, setActivityDesc] = useState("");
  const [clientTask, setClientTask] = useState("");
  const [clientActivity, setClientActivity] = useState("");

  const [records, setRecords] = useState([]);
  const [activeTab, setActiveTab] = useState("records");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  // Load data from in-memory storage (simulating localStorage)
  useEffect(() => {
    // In a real app, this would be localStorage.getItem("allRecords")
    // For now, we'll use state-based storage
  }, []);

  // Show toast message
  const showToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage("");
      setToastType("");
    }, 3000);
  };

  // Update phase task description when phase task ID changes
  useEffect(() => {
    if (phaseTaskId && phaseTaskData[phaseTaskId]) {
      setPhaseTaskDesc(phaseTaskData[phaseTaskId]);
    } else {
      setPhaseTaskDesc("");
    }
  }, [phaseTaskId]);

  // Update activity description when activity ID changes
  useEffect(() => {
    if (activityId && activityData[activityId]) {
      setActivityDesc(activityData[activityId]);
    } else {
      setActivityDesc("");
    }
  }, [activityId]);

  // Handle client task input with prefix
  const handleClientTaskChange = (e) => {
    const value = e.target.value;
    const prefix = getClientPrefix();

    if (prefix) {
      if (!value.startsWith(prefix)) {
        setClientTask(prefix + value.replace(/^(ca-|ez-)/, ""));
      } else {
        setClientTask(value);
      }
    } else {
      setClientTask(value);
    }
  };

  // Handle client activity input with prefix
  const handleClientActivityChange = (e) => {
    const value = e.target.value;
    const prefix = getClientPrefix();

    if (prefix) {
      if (!value.startsWith(prefix)) {
        setClientActivity(prefix + value.replace(/^(ca-|ez-)/, ""));
      } else {
        setClientActivity(value);
      }
    } else {
      setClientActivity(value);
    }
  };

  // Get client prefix based on organisation
  const getClientPrefix = () => {
    if (organisation === "General Dynamics") return "ca-";
    if (organisation === "Envada") return "ez-";
    return "";
  };

  // Get example text based on organisation
  const getExampleText = (fieldType) => {
    if (organisation === "General Dynamics") {
      return fieldType === "task"
        ? "e.g. ca-100-discovery"
        : "e.g. ca-aa-requirement_analysis";
    }
    if (organisation === "Envada") {
      return fieldType === "task"
        ? "e.g. ez-4000-initial"
        : "e.g. ez-100-discovery";
    }
    return "";
  };

  const resetAll = () => {
    setOrganisation("");
    setPhaseTaskId("");
    setPhaseTaskDesc("");
    setActivityId("");
    setActivityDesc("");
    setClientTask("");
    setClientActivity("");
  };

  const generateRefId = (phaseId, actId) => `REF-${phaseId}-${actId}`;

  const handleInsertData = (e) => {
    e.preventDefault();
    if (
      !organisation ||
      !phaseTaskId ||
      !activityId ||
      !clientTask ||
      !clientActivity
    ) {
      showToast("Please fill in all required fields!", "error");
      return;
    }
    const record = {
      id: Date.now(),
      organisation,
      phaseTaskId,
      phaseTaskDesc,
      activityId,
      activityDesc,
      clientTask,
      clientActivity,
      refId: generateRefId(phaseTaskId, activityId),
    };
    setRecords((prev) => [...prev, record]);
    showToast("Data inserted & Reference ID Created!");
    resetAll();
  };

  const handleDelete = (id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    showToast("Record deleted", "info");
  };

  const TableTabs = () => (
    <div className="flex border-b border-gray-200 mb-4">
      <button
        onClick={() => setActiveTab("records")}
        className={`flex items-center px-4 py-2 font-medium text-sm transition-colors ${
          activeTab === "records"
            ? "border-b-2 border-blue-500 text-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <Table className="w-4 h-4 mr-2" />
        Records
      </button>
      <button
        onClick={() => setActiveTab("visualizations")}
        className={`flex items-center px-4 py-2 font-medium text-sm transition-colors ${
          activeTab === "visualizations"
            ? "border-b-2 border-blue-500 text-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <BarChart3 className="w-4 h-4 mr-2" />
        Visualizations
      </button>
    </div>
  );

  const RecordsTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Sr. No
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Reference ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Organisation
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Phase ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Phase Desc
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Activity ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Activity Desc
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Client Task
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Client Activity
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {records.map((rec, idx) => (
            <tr key={rec.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm">{idx + 1}</td>
              <td className="px-4 py-3 text-sm font-medium text-blue-600">
                {rec.refId}
              </td>
              <td className="px-4 py-3 text-sm">{rec.organisation}</td>
              <td className="px-4 py-3 text-sm">{rec.phaseTaskId}</td>
              <td className="px-4 py-3 text-sm">{rec.phaseTaskDesc}</td>
              <td className="px-4 py-3 text-sm">{rec.activityId}</td>
              <td className="px-4 py-3 text-sm">{rec.activityDesc}</td>
              <td className="px-4 py-3 text-sm">{rec.clientTask}</td>
              <td className="px-4 py-3 text-sm">{rec.clientActivity}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(rec.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {records.length === 0 && (
        <div className="text-center py-6 text-gray-500">No records found.</div>
      )}
    </div>
  );

  // Toast component
  const Toast = () => {
    if (!toastMessage) return null;

    const bgColor =
      toastType === "error"
        ? "bg-red-500"
        : toastType === "info"
        ? "bg-blue-500"
        : "bg-green-500";

    return (
      <div
        className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300`}
      >
        {toastMessage}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-start py-5 px-4">
      <div
        className="opacity-0 animate-fade-in"
        style={{ animationDelay: "0s", animationFillMode: "forwards" }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Reference Data Management
        </h1>

        {/* Main Form Container - Fixed Width */}
        <div className="bg-white rounded-2xl shadow-lg px-10 py-8 w-6xl space-y-6 mb-8">
          {/* Organisation Selector */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organisation
              </label>
              <select
                value={organisation}
                onChange={(e) => setOrganisation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select Organisation</option>
                <option value="General Dynamics">General Dynamics</option>
                <option value="Envada">Envada</option>
              </select>
            </div>
          </div>

          {/* Phase Task Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phase Task ID
              </label>
              <select
                value={phaseTaskId}
                onChange={(e) => setPhaseTaskId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select Phase Task ID</option>
                {Object.keys(phaseTaskData).map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phase Task Description
              </label>
              <input
                placeholder="Phase Task Description"
                value={phaseTaskDesc}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Activity Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity ID
              </label>
              <select
                value={activityId}
                onChange={(e) => setActivityId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select Activity ID</option>
                {Object.keys(activityData).map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity Description
              </label>
              <input
                placeholder="Activity Description"
                value={activityDesc}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Client Billable Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Billable Task{" "}
                {getExampleText("task") && (
                  <span className="text-gray-500 font-normal">
                    ({getExampleText("task")})
                  </span>
                )}
              </label>
              <input
                placeholder="Client Billable Task"
                value={clientTask}
                onChange={handleClientTaskChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Billable Activity{" "}
                {getExampleText("activity") && (
                  <span className="text-gray-500 font-normal">
                    ({getExampleText("activity")})
                  </span>
                )}
              </label>
              <input
                placeholder="Client Billable Activity"
                value={clientActivity}
                onChange={handleClientActivityChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
            </div>
          </div>

          {/* Insert Data Button */}
          <div className="flex justify-center">
            <button
              onClick={handleInsertData}
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm transform hover:scale-105"
            >
              Insert Data
            </button>
          </div>
        </div>

        {/* Records Section - Fixed Width */}
        <div className="w-full max-w-6xl">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 bg-blue-600 text-white">
              <h2 className="text-lg font-semibold">
                All Records ({records.length})
              </h2>
            </div>

            <div className="p-6">
              <TableTabs />
              {activeTab === "records" ? (
                <RecordsTable />
              ) : (
                <PhaseActivityTree records={records} />
              )}
            </div>
          </div>
        </div>

        <Toast />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RefDataMgt;
