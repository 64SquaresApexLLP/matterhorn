import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Edit, Trash2, BarChart3, Table, Search, X } from "lucide-react";

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

const expenseData = {
  "E-100": "Office Supplies",
  "E-101": "Travel Expenses",
  "E-102": "Equipment Rental",
  "E-103": "Consultant Fees",
  "E-104": "Software Licenses",
};

// Helper to build tree data from records
const buildPhaseTree = (records) => {
  const phaseMap = {};
  records.forEach(
    ({ phaseTaskId, phaseTaskDesc, activityId, activityDesc, type }) => {
      if (!phaseMap[phaseTaskId]) {
        phaseMap[phaseTaskId] = {
          name: phaseTaskId,
          attributes: { desc: phaseTaskDesc },
          children: [],
        };
      }
      const item = {
        name: type === "Cost" ? `E-${activityId.split("-")[1]}` : activityId,
        attributes: {
          desc:
            type === "Cost"
              ? expenseData[`E-${activityId.split("-")[1]}`]
              : activityDesc,
          type: type,
        },
      };
      phaseMap[phaseTaskId].children.push(item);
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
                <div
                  key={actIndex}
                  className={`text-sm ${
                    activity.attributes.type === "Cost"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  └── {activity.name}: {activity.attributes.desc}
                  {activity.attributes.type === "Cost" && (
                    <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                      Expense
                    </span>
                  )}
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
  const [referenceId, setReferenceId] = useState("");
  const [records, setRecords] = useState([]);
  const [activeTab, setActiveTab] = useState("records");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("Fee"); // New state for type (Fee/Cost)
  const [expenseId, setExpenseId] = useState("");
  const [expenseDesc, setExpenseDesc] = useState("");

  // Search states for each column
  const [searchFilters, setSearchFilters] = useState({
    refId: "",
    organisation: "",
    phaseTaskId: "",
    phaseTaskDesc: "",
    activityId: "",
    activityDesc: "",
    clientTask: "",
    clientActivity: "",
    type: "",
  });

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
    if (type === "Fee") {
      if (activityId && activityData[activityId]) {
        setActivityDesc(activityData[activityId]);
      } else {
        setActivityDesc("");
      }
    } else {
      // For Cost type, we'll use expense data
      // We'll map the expense ID similarly to how we did with activity ID
      if (expenseId && expenseData[expenseId]) {
        setActivityDesc(expenseData[expenseId]);
        setActivityId(expenseId); // Store expense ID in activityId field for consistency
      } else {
        setActivityDesc("");
      }
    }
  }, [activityId, expenseId, type]);

  // Generate and update reference ID when phase task ID or activity ID changes
  useEffect(() => {
    if (phaseTaskId && activityId) {
      const generatedRefId = generateRefId(phaseTaskId, activityId);
      setReferenceId(generatedRefId);
    } else {
      setReferenceId("");
    }
  }, [phaseTaskId, activityId]);

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
    setReferenceId("");
    setType("Fee");
    setExpenseId("");
    setExpenseDesc("");
  };

  const generateRefId = (phaseId, actId) => `REF-${phaseId}-${actId}`;

  // Function to check if a record already exists
  const isDuplicateRecord = (newRecord) => {
    return records.some((record) => {
      return (
        record.phaseTaskId === newRecord.phaseTaskId &&
        record.activityId === newRecord.activityId &&
        record.organisation === newRecord.organisation &&
        record.type === newRecord.type
      );
    });
  };

  const handleInsertData = (e) => {
    e.preventDefault();

    // Check for required fields
    if (
      !organisation ||
      !phaseTaskId ||
      !activityId ||
      !clientTask ||
      !clientActivity ||
      !referenceId ||
      !type
    ) {
      showToast("Please fill in all required fields!", "error");
      return;
    }

    // Create the record object
    const record = {
      id: Date.now(),
      organisation,
      phaseTaskId,
      phaseTaskDesc,
      activityId,
      activityDesc,
      clientTask,
      clientActivity,
      refId: referenceId,
      type, // Add type to the record
    };

    // Check for duplicates
    if (isDuplicateRecord(record)) {
      showToast("A record with this combination already exists!", "error");
      return;
    }

    setRecords((prev) => [...prev, record]);
    showToast("Data inserted & Reference ID Created!");
    resetAll();
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    showToast("Record deleted", "info");
  };

  // Fixed search change handler
  const handleSearchChange = useCallback((column, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [column]: value,
    }));
  }, []);

  const clearAllFilters = () => {
    setSearchFilters({
      refId: "",
      organisation: "",
      phaseTaskId: "",
      phaseTaskDesc: "",
      activityId: "",
      activityDesc: "",
      clientTask: "",
      clientActivity: "",
      type: "",
    });
  };

  // Filter records based on search criteria
  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      return (
        record.refId
          .toLowerCase()
          .includes(searchFilters.refId.toLowerCase()) &&
        record.organisation
          .toLowerCase()
          .includes(searchFilters.organisation.toLowerCase()) &&
        record.phaseTaskId
          .toLowerCase()
          .includes(searchFilters.phaseTaskId.toLowerCase()) &&
        record.phaseTaskDesc
          .toLowerCase()
          .includes(searchFilters.phaseTaskDesc.toLowerCase()) &&
        record.activityId
          .toLowerCase()
          .includes(searchFilters.activityId.toLowerCase()) &&
        record.activityDesc
          .toLowerCase()
          .includes(searchFilters.activityDesc.toLowerCase()) &&
        record.clientTask
          .toLowerCase()
          .includes(searchFilters.clientTask.toLowerCase()) &&
        record.clientActivity
          .toLowerCase()
          .includes(searchFilters.clientActivity.toLowerCase()) &&
        (searchFilters.type === "" ||
          record.type.toLowerCase().includes(searchFilters.type.toLowerCase()))
      );
    });
  }, [records, searchFilters]);

  // Function to generate all possible pair combinations
  const generateAllCombinations = () => {
    const combinations = [];
    const phaseKeys = Object.keys(phaseTaskData);
    const activityKeys = Object.keys(activityData);
    const expenseKeys = Object.keys(expenseData);

    // Generate Fee combinations
    for (const phaseId of phaseKeys) {
      for (const activityId of activityKeys) {
        combinations.push({
          phaseTaskId: phaseId,
          phaseTaskDesc: phaseTaskData[phaseId],
          activityId,
          activityDesc: activityData[activityId],
          type: "Fee",
        });
      }
    }

    // Generate Cost combinations
    for (const phaseId of phaseKeys) {
      for (const expenseId of expenseKeys) {
        combinations.push({
          phaseTaskId: phaseId,
          phaseTaskDesc: phaseTaskData[phaseId],
          activityId: expenseId, // Using expense ID here
          activityDesc: expenseData[expenseId],
          type: "Cost",
        });
      }
    }

    return combinations;
  };

  const allCombinations = generateAllCombinations();

  const TableTabs = () => (
    <div className="flex justify-between items-center border-b border-gray-200 mb-4">
      <div className="flex">
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
        <button
          onClick={() => setActiveTab("combinations")}
          className={`flex items-center px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === "combinations"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          All Combinations
        </button>
      </div>
      {activeTab === "records" && (
        <button
          onClick={clearAllFilters}
          className="cursor-pointer text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  // Fixed SearchInput component
  // Memoized SearchInput component
  const SearchInput = React.memo(({ placeholder, value, onChange, column }) => {
    return (
      <div className="relative mb-2">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder={`Search ${placeholder}...`}
          value={value}
          onChange={(e) => onChange(column, e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
        />
      </div>
    );
  });

  // Memoized RecordsTable component
  const RecordsTable = React.memo(
    ({ filteredRecords, searchFilters, handleSearchChange, handleDelete }) => {
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Sr. No
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                {[
                  ["Reference ID", "refId"],
                  ["Organisation", "organisation"],
                  ["Phase ID", "phaseTaskId"],
                  ["Phase Desc", "phaseTaskDesc"],
                  ["Activity/Expense ID", "activityId"],
                  ["Activity/Expense Desc", "activityDesc"],
                  ["Client Task", "clientTask"],
                  ["Client Activity", "clientActivity"],
                ].map(([label, key]) => (
                  <th
                    key={key}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    <div className="mb-2">{label}</div>
                    <SearchInput
                      placeholder={label}
                      value={searchFilters[key]}
                      onChange={handleSearchChange}
                      column={key}
                    />
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((rec, idx) => (
                <tr
                  key={rec.id}
                  className={`hover:bg-gray-50 ${
                    rec.type === "Cost" ? "bg-red-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-3 text-sm">{idx + 1}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rec.type === "Fee"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {rec.type}
                    </span>
                  </td>
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
          {filteredRecords.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No records match your search criteria.
            </div>
          )}
        </div>
      );
    }
  );

  // Component to show all possible combinations
  const CombinationsTable = () => {
    return (
      <div className="overflow-x-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          All Possible Combinations ({allCombinations.length})
        </h3>
        <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Phase ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Phase Desc
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Activity/Expense ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Activity/Expense Desc
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allCombinations.map((comb, idx) => (
              <tr
                key={idx}
                className={`hover:bg-gray-50 ${
                  comb.type === "Cost" ? "bg-red-50" : "bg-white"
                }`}
              >
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      comb.type === "Fee"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {comb.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{comb.phaseTaskId}</td>
                <td className="px-4 py-3 text-sm">{comb.phaseTaskDesc}</td>
                <td className="px-4 py-3 text-sm">{comb.activityId}</td>
                <td className="px-4 py-3 text-sm">{comb.activityDesc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

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
    <div className="min-h-screen flex flex-col items-center justify-start py-5 px-4">
      <div
        className="opacity-0 animate-fade-in"
        style={{ animationDelay: "0s", animationFillMode: "forwards" }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Reference Data Management
        </h1>
        {/* Improved Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="mt-[30vh] bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Add New Reference Data
                </h2>
                <button
                  onClick={() => {
                    resetAll();
                    setShowModal(false);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Organisation Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organisation <span className="text-red-500">*</span>
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

                {/* Type Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                      // Reset activity/expense fields when type changes
                      setActivityId("");
                      setActivityDesc("");
                      setExpenseId("");
                      setExpenseDesc("");
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="Fee">Fee</option>
                    <option value="Cost">Cost</option>
                  </select>
                </div>

                {/* Phase Task Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phase Task ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Phase Task ID"
                      value={phaseTaskId}
                      onChange={(e) => setPhaseTaskId(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phase Task Description
                    </label>
                    <input
                      placeholder="Enter Phase Task Description"
                      value={phaseTaskDesc}
                      onChange={(e) => setPhaseTaskDesc(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Activity or Expense Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {type === "Cost" ? "Expense ID" : "Activity ID"}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={`Enter ${
                        type === "Cost" ? "Expense" : "Activity"
                      } ID`}
                      value={type === "Cost" ? expenseId : activityId}
                      onChange={(e) => {
                        if (type === "Cost") {
                          setExpenseId(e.target.value);
                          setActivityId(e.target.value); // Store in activityId for consistency
                        } else {
                          setActivityId(e.target.value);
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {type === "Cost"
                        ? "Expense Description"
                        : "Activity Description"}
                    </label>
                    <input
                      placeholder={`Enter ${
                        type === "Cost" ? "Expense" : "Activity"
                      } Description`}
                      value={activityDesc}
                      onChange={(e) => setActivityDesc(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Client Billable Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Client Billable Task{" "}
                      <span className="text-red-500">*</span>
                      {getExampleText("task") && (
                        <div className="text-xs text-gray-500 mt-1">
                          {getExampleText("task")}
                        </div>
                      )}
                    </label>
                    <input
                      placeholder="Enter client billable task"
                      value={clientTask}
                      onChange={handleClientTaskChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Client Billable Activity{" "}
                      <span className="text-red-500">*</span>
                      {getExampleText("activity") && (
                        <div className="text-xs text-gray-500 mt-1">
                          {getExampleText("activity")}
                        </div>
                      )}
                    </label>
                    <input
                      placeholder="Enter client billable activity"
                      value={clientActivity}
                      onChange={handleClientActivityChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Reference ID Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reference ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    placeholder="Auto-generated reference ID (editable)"
                    value={referenceId}
                    onChange={(e) => setReferenceId(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-purple-50"
                  />
                </div>
              </div>
              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                <button
                  onClick={() => {
                    resetAll();
                    setShowModal(false);
                  }}
                  className="cursor-pointer px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInsertData}
                  className="cursor-pointer px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                >
                  Insert Data
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Records Section - Fixed Width */}
        <div className="w-full max-w-6xl">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-6">
              <h2 className="text-lg font-semibold">
                All Records ({filteredRecords.length}/{records.length})
              </h2>
              <button
                onClick={() => {
                  resetAll();
                  setShowModal(true);
                }}
                className="cursor-pointer bg-[var(--primary)] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow-sm transition-colors"
              >
                New Entry
              </button>
            </div>
            <div className="px-6 pb-6">
              <TableTabs />
              {activeTab === "records" ? (
                <RecordsTable
                  filteredRecords={filteredRecords}
                  handleDelete={handleDelete}
                  searchFilters={searchFilters}
                  handleSearchChange={handleSearchChange}
                />
              ) : activeTab === "visualizations" ? (
                <PhaseActivityTree records={records} />
              ) : (
                <CombinationsTable />
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
