import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
  BarChart3,
  Table,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tree from "react-d3-tree";

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

// Tree visualization component
const PhaseActivityTree = ({ records }) => {
  const treeData = buildPhaseTree(records);
  // Wrap in root if multiple roots
  const data =
    treeData.length > 1
      ? { name: "Phases", children: treeData }
      : treeData[0] || {};

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Tree
        data={data}
        orientation="vertical"
        translate={{ x: 200, y: 50 }}
        pathFunc="elbow"
      />
    </div>
  );
};

const RefDataMgt = () => {
  const [client, setClient] = useState("");
  const [matter, setMatter] = useState("");
  const [organisation, setOrganisation] = useState("");

  const [phaseTaskId, setPhaseTaskId] = useState("");
  const [phaseTaskDesc, setPhaseTaskDesc] = useState("");
  const [activityId, setActivityId] = useState("");
  const [activityDesc, setActivityDesc] = useState("");

  const [clientTask, setClientTask] = useState("");
  const [clientActivity, setClientActivity] = useState("");

  const [lawyerRecords, setLawyerRecords] = useState([]);
  const [clientRecords, setClientRecords] = useState([]);

  const [showLawyerRecords, setShowLawyerRecords] = useState(false);
  const [showClientRecords, setShowClientRecords] = useState(false);
  const [lawyerActiveTab, setLawyerActiveTab] = useState("records");
  const [clientActiveTab, setClientActiveTab] = useState("records");

  // Load data from localStorage
  useEffect(() => {
    const savedLawyers = JSON.parse(
      localStorage.getItem("lawyerRecords") || "[]"
    );
    const savedClients = JSON.parse(
      localStorage.getItem("clientRecords") || "[]"
    );
    setLawyerRecords(savedLawyers);
    setClientRecords(savedClients);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (lawyerRecords.length > 0) {
      localStorage.setItem("lawyerRecords", JSON.stringify(lawyerRecords));
    }
  }, [lawyerRecords]);

  useEffect(() => {
    if (clientRecords.length > 0) {
      localStorage.setItem("clientRecords", JSON.stringify(clientRecords));
    }
  }, [clientRecords]);

  const resetAll = () => {
    setClient("");
    setMatter("");
    setOrganisation("");
    setPhaseTaskId("");
    setPhaseTaskDesc("");
    setActivityId("");
    setActivityDesc("");
    setClientTask("");
    setClientActivity("");
  };

  const generateRefId = (phaseId, actId) => `REF-${phaseId}-${actId}`;

  const handleAddLawyer = (e) => {
    e.preventDefault();
    if (!client || !matter || !organisation || !phaseTaskId || !activityId) {
      toast.error("Please fill in all required fields!");
      return;
    }
    const record = {
      id: Date.now(),
      client,
      matter,
      organisation,
      phaseTaskId,
      phaseTaskDesc,
      activityId,
      activityDesc,
      refId: generateRefId(phaseTaskId, activityId),
    };
    setLawyerRecords((prev) => [...prev, record]);
    toast.success("Lawyer data inserted & Reference ID Created!");
    resetAll();
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    if (!client || !matter || !organisation || !clientTask || !clientActivity) {
      toast.error("Please fill in all required fields!");
      return;
    }
    const record = {
      id: Date.now(),
      client,
      matter,
      organisation,
      clientTask,
      clientActivity,
      refId: `REF-CLIENT-${Date.now()}`,
    };
    setClientRecords((prev) => [...prev, record]);
    toast.success("Client data inserted & Reference ID Created!");
    resetAll();
  };

  const handleDeleteLawyer = (id) => {
    setLawyerRecords((prev) => prev.filter((r) => r.id !== id));
    toast.info("Lawyer record deleted");
  };
  const handleDeleteClient = (id) => {
    setClientRecords((prev) => prev.filter((r) => r.id !== id));
    toast.info("Client record deleted");
  };

  const TableTabs = ({ activeTab, setActiveTab, type }) => (
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

  const LawyerTable = () => (
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
              Client
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Matter
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
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {lawyerRecords.map((rec, idx) => (
            <tr key={rec.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm">{idx + 1}</td>
              <td className="px-4 py-3 text-sm font-medium text-blue-600">
                {rec.refId}
              </td>
              <td className="px-4 py-3 text-sm">{rec.client}</td>
              <td className="px-4 py-3 text-sm">{rec.matter}</td>
              <td className="px-4 py-3 text-sm">{rec.organisation}</td>
              <td className="px-4 py-3 text-sm">{rec.phaseTaskId}</td>
              <td className="px-4 py-3 text-sm">{rec.phaseTaskDesc}</td>
              <td className="px-4 py-3 text-sm">{rec.activityId}</td>
              <td className="px-4 py-3 text-sm">{rec.activityDesc}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteLawyer(rec.id)}
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
      {lawyerRecords.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No lawyer records found.
        </div>
      )}
    </div>
  );

  const ClientTable = () => (
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
              Client
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Matter
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Organisation
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Task
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Activity
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clientRecords.map((rec, idx) => (
            <tr key={rec.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm">{idx + 1}</td>
              <td className="px-4 py-3 text-sm font-medium text-blue-600">
                {rec.refId}
              </td>
              <td className="px-4 py-3 text-sm">{rec.client}</td>
              <td className="px-4 py-3 text-sm">{rec.matter}</td>
              <td className="px-4 py-3 text-sm">{rec.organisation}</td>
              <td className="px-4 py-3 text-sm">{rec.clientTask}</td>
              <td className="px-4 py-3 text-sm">{rec.clientActivity}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClient(rec.id)}
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
      {clientRecords.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No client records found.
        </div>
      )}
    </div>
  );

  const VisualizationPlaceholder = ({ type }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
      <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {type} Visualizations
      </h3>
      <p className="text-gray-500">
        Charts and graphs for {type.toLowerCase()} data will appear here.
      </p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-start py-5 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Reference Data Management
        </h1>

        {/* Main Form Container */}
        <div className="bg-white rounded-2xl shadow-lg px-10 py-8 w-full max-w-6xl space-y-6 mb-8">
          {/* Top selectors */}
          <div className="grid grid-cols-3 gap-4">
            <select
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Select Client</option>
              <option>Client A</option>
              <option>Client B</option>
              <option>Client C</option>
            </select>
            <select
              value={matter}
              onChange={(e) => setMatter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Select Matter</option>
              <option>Matter X</option>
              <option>Matter Y</option>
              <option>Matter Z</option>
            </select>
            <select
              value={organisation}
              onChange={(e) => setOrganisation(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Select Organisation</option>
              <option>Org A</option>
              <option>Org B</option>
              <option>Org C</option>
            </select>
          </div>

          {/* Lawyer Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Lawyer</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="Phase Task ID: PA-100"
                value={phaseTaskId}
                onChange={(e) => setPhaseTaskId(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <input
                placeholder="Phase Task Description: Review"
                value={phaseTaskDesc}
                onChange={(e) => setPhaseTaskDesc(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <input
                placeholder="Activity ID: A-100"
                value={activityId}
                onChange={(e) => setActivityId(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <input
                placeholder="Activity Description"
                value={activityDesc}
                onChange={(e) => setActivityDesc(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <button
              onClick={handleAddLawyer}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
            >
              Add Lawyer Record
            </button>
          </div>

          <hr className="border-gray-200" />

          {/* Client Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Client</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="Client Billable Task"
                value={clientTask}
                onChange={(e) => setClientTask(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
              <input
                placeholder="Client Billable Activity"
                value={clientActivity}
                onChange={(e) => setClientActivity(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
            </div>
            <button
              onClick={handleAddClient}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
            >
              Add Client Record
            </button>
          </div>
        </div>

        {/* Records Section - Outside the white box */}
        <div className="w-full max-w-6xl space-y-6">
          {/* Lawyer Records */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <button
              onClick={() => setShowLawyerRecords(!showLawyerRecords)}
              className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-between transition-colors"
            >
              <span className="text-lg font-semibold">
                Lawyer Records ({lawyerRecords.length})
              </span>
              {showLawyerRecords ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {showLawyerRecords && (
              <div className="p-6">
                <TableTabs
                  activeTab={lawyerActiveTab}
                  setActiveTab={setLawyerActiveTab}
                  type="lawyer"
                />
                {lawyerActiveTab === "records" ? (
                  <LawyerTable
                    records={lawyerRecords}
                    onDelete={handleDeleteLawyer}
                  />
                ) : (
                  <PhaseActivityTree records={lawyerRecords} />
                )}
              </div>
            )}
          </div>

          {/* Client Records */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <button
              onClick={() => setShowClientRecords(!showClientRecords)}
              className="w-full px-6 py-4 bg-green-600 hover:bg-green-700 text-white flex items-center justify-between transition-colors"
            >
              <span className="text-lg font-semibold">
                Client Records ({clientRecords.length})
              </span>
              {showClientRecords ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {showClientRecords && (
              <div className="p-6">
                <TableTabs
                  activeTab={clientActiveTab}
                  setActiveTab={setClientActiveTab}
                  type="client"
                />
                {clientActiveTab === "records" ? (
                  <ClientTable
                    records={clientRecords}
                    onDelete={handleDeleteClient}
                  />
                ) : (
                  <PhaseActivityTree records={clientRecords} />
                )}
              </div>
            )}
          </div>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </motion.div>
  );
};

export default RefDataMgt;
