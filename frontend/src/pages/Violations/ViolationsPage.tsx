const ViolationsPage = () => {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Violations</h2>
        <p className="text-slate-500">Monitor traffic violations, fines, and driver demerit points.</p>
      </div>
      
      <div className="h-[400px] w-full rounded-3xl border-2 border-dashed border-slate-200 bg-white/50 flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold text-slate-400 uppercase tracking-widest">Violations Tracker Coming Soon</p>
          <p className="text-sm text-slate-400">Issue new citations and track payment status.</p>
        </div>
      </div>
    </div>
  );
};

export default ViolationsPage;
