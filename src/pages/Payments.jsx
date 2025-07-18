import React, { useState, useMemo } from "react";
import { FiPlus, FiSearch, FiChevronDown } from "react-icons/fi";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const pieData = [
  { name: "Completed", value: 400 },
  { name: "Remaining", value: 100 },
];

const COLORS = ["#34D399", "#F87171"];

const barData = [
  { month: "Jan", amount: 3000 },
  { month: "Feb", amount: 2000 },
  { month: "Mar", amount: 2780 },
  { month: "Apr", amount: 1890 },
  { month: "May", amount: 2390 },
  { month: "Jun", amount: 3490 },
];

const initialPayments = [
  {
    date: "2025-06-01",
    number: "PMT-001",
    client: "Matterhorn Legal",
    amount: 1200,
    reference: "REF-123",
    status: "Completed",
  },
  {
    date: "2025-06-10",
    number: "PMT-002",
    client: "Legal Edge",
    amount: 800,
    reference: "REF-456",
    status: "Pending",
  },
  {
    date: "2025-05-21",
    number: "PMT-003",
    client: "TrialWorks Ltd",
    amount: 1500,
    reference: "REF-789",
    status: "Completed",
  },
  {
    date: "2025-05-18",
    number: "PMT-004",
    client: "Courtify Solutions",
    amount: 950,
    reference: "REF-321",
    status: "Completed",
  },
  {
    date: "2025-04-22",
    number: "PMT-005",
    client: "Justice Corp",
    amount: 1800,
    reference: "REF-654",
    status: "Pending",
  },
  {
    date: "2025-03-15",
    number: "PMT-006",
    client: "Legal Bridge",
    amount: 2200,
    reference: "REF-777",
    status: "Completed",
  },
  {
    date: "2025-06-05",
    number: "PMT-007",
    client: "InHouse Legal",
    amount: 500,
    reference: "REF-909",
    status: "Pending",
  },
  {
    date: "2025-05-30",
    number: "PMT-008",
    client: "LexTech",
    amount: 1350,
    reference: "REF-601",
    status: "Completed",
  },
  {
    date: "2025-04-11",
    number: "PMT-009",
    client: "Matterhorn Legal",
    amount: 1750,
    reference: "REF-221",
    status: "Completed",
  },
  {
    date: "2025-06-12",
    number: "PMT-010",
    client: "Legal Edge",
    amount: 930,
    reference: "REF-832",
    status: "Pending",
  },
  {
    date: "2025-06-03",
    number: "PMT-011",
    client: "TrialWorks Ltd",
    amount: 1480,
    reference: "REF-992",
    status: "Completed",
  },
  {
    date: "2025-05-08",
    number: "PMT-012",
    client: "Courtify Solutions",
    amount: 860,
    reference: "REF-331",
    status: "Completed",
  },
  {
    date: "2025-04-25",
    number: "PMT-013",
    client: "Justice Corp",
    amount: 1100,
    reference: "REF-544",
    status: "Pending",
  },
  {
    date: "2025-03-10",
    number: "PMT-014",
    client: "LexPro Advisors",
    amount: 2050,
    reference: "REF-800",
    status: "Completed",
  },
  {
    date: "2025-02-20",
    number: "PMT-015",
    client: "InHouse Legal",
    amount: 975,
    reference: "REF-405",
    status: "Pending",
  },
  {
    date: "2025-01-18",
    number: "PMT-016",
    client: "LegalTech Co.",
    amount: 2400,
    reference: "REF-260",
    status: "Completed",
  },
  {
    date: "2025-03-29",
    number: "PMT-017",
    client: "Lawgenics",
    amount: 1430,
    reference: "REF-102",
    status: "Pending",
  },
  {
    date: "2025-02-14",
    number: "PMT-018",
    client: "Matterhorn Legal",
    amount: 1290,
    reference: "REF-678",
    status: "Completed",
  },
  {
    date: "2025-05-05",
    number: "PMT-019",
    client: "Legal Edge",
    amount: 990,
    reference: "REF-988",
    status: "Completed",
  },
  {
    date: "2025-06-09",
    number: "PMT-020",
    client: "TrialWorks Ltd",
    amount: 1650,
    reference: "REF-301",
    status: "Pending",
  },
  {
    date: "2025-04-01",
    number: "PMT-021",
    client: "Courtify Solutions",
    amount: 1230,
    reference: "REF-432",
    status: "Completed",
  },
  {
    date: "2025-06-14",
    number: "PMT-022",
    client: "Justice Corp",
    amount: 800,
    reference: "REF-245",
    status: "Pending",
  },
  {
    date: "2025-06-07",
    number: "PMT-023",
    client: "LexTech",
    amount: 1400,
    reference: "REF-356",
    status: "Completed",
  },
];

const Payments = () => {
  const [sortOption, setSortOption] = useState("");
  const [search, setSearch] = useState("");

  const sortedData = useMemo(() => {
    let data = [...initialPayments];

    if (search) {
      data = data.filter(
        (p) =>
          p.client.toLowerCase().includes(search.toLowerCase()) ||
          p.number.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (sortOption) {
      case "date-asc":
        return data.sort((a, b) => new Date(a.date) - new Date(b.date));
      case "date-desc":
        return data.sort((a, b) => new Date(b.date) - new Date(a.date));
      case "alphabet":
        return data.sort((a, b) => a.client.localeCompare(b.client));
      case "status":
        return data.sort((a, b) => a.status.localeCompare(b.status));
      default:
        return data;
    }
  }, [sortOption, search]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <div className="min-h-screen bg-blue-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
            <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <FiPlus />
              <span>New Payment</span>
            </button>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h2 className="text-lg font-semibold mb-4">Payment Status</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h2 className="text-lg font-semibold mb-4">Monthly Payments</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <XAxis dataKey="month" />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#60A5FA" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Filters */}
          <div className="flex justify-between items-center bg-white p-4 rounded shadow">
            <div className="relative w-full max-w-sm">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by client or number..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="relative ml-4">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Sort By</option>
                <option value="date-asc">Date (Asc)</option>
                <option value="date-desc">Date (Desc)</option>
                <option value="alphabet">Client Name (A-Z)</option>
                <option value="status">Payment Status</option>
              </select>
              <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Payments Table */}

          <div className="bg-white rounded-lg shadow">
            <div className="h-96 overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 text-left text-sm font-medium text-gray-600 uppercase tracking-wide sticky top-0">
                  <tr>
                    <th className="px-6 py-3 bg-gray-50">Date</th>
                    <th className="px-6 py-3 bg-gray-50">Number</th>
                    <th className="px-6 py-3 bg-gray-50">Client</th>
                    <th className="px-6 py-3 bg-gray-50">Amount</th>
                    <th className="px-6 py-3 bg-gray-50">Reference</th>
                    <th className="px-6 py-3 bg-gray-50">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {sortedData.map((payment) => (
                    <tr
                      key={payment.number}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">{payment.date}</td>
                      <td className="px-6 py-4">{payment.number}</td>
                      <td className="px-6 py-4">{payment.client}</td>
                      <td className="px-6 py-4 text-green-600 font-semibold">
                        ₹{payment.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">{payment.reference}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
                            payment.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {/* Add blank rows if needed to maintain height */}
                  {sortedData.length < 8 &&
                    Array.from({ length: 8 - sortedData.length }).map(
                      (_, idx) => (
                        <tr key={`empty-${idx}`}>
                          <td colSpan={6} className="px-6 py-4">
                            &nbsp;
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Payments;
