const ReportsPage = () => {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Reports</h2>
        <p className="text-slate-500">Generate analytics and detailed reports for administration.</p>
      </div>
      
      <div className="h-[400px] w-full rounded-3xl border-2 border-dashed border-slate-200 bg-white/50 flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold text-slate-400 uppercase tracking-widest">Analytics Dashboard Coming Soon</p>
          <p className="text-sm text-slate-400">Export data and view statistical trends.</p>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
