export default function StatsCard({ title, value, subtext, icon, color }) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600",
    green: "bg-emerald-50 text-emerald-600",
    yellow: "bg-amber-50 text-amber-600",
    red: "bg-rose-50 text-rose-600",
    blue: "bg-blue-50 text-blue-600",
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h4 className="text-3xl font-bold text-gray-800 mt-2">{value}</h4>
        </div>
        <div className={`p-3 rounded-lg ${colors[color] || colors.indigo}`}>
          {icon}
        </div>
      </div>
      {subtext && <p className="text-xs text-gray-400 mt-4">{subtext}</p>}
    </div>
  );
}
