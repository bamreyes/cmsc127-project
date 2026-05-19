import { useState } from "react";
import { FileText, Download } from "lucide-react";
import { toast } from "sonner";

// ----- REPORT TYPE ----------------------------------------------------------------------------------------------------------------------------------------------------
// restricts reportType to only these values
type ReportType =
  | "Drivers by Filter"
  | "Vehicles by Driver"
  | "Expired Vehicle Registrations"
  | "Expired or Suspended Licenses"
  | "Violations by Driver"
  | "Violations by Type"
  | "Violations by Location";
// ---------------------------------------------------------------------------------------------------------------------------------------------------------

// ----- DROPDOWN VAL ----------------------------------------------------------------------------------------------------------------------------------------------------
// list of values in the dropdown
const REPORT_TYPES: ReportType[] = [
  "Drivers by Filter",
  "Vehicles by Driver",
  "Expired Vehicle Registrations",
  "Expired or Suspended Licenses",
  "Violations by Driver",
  "Violations by Type",
  "Violations by Location",
];
// ---------------------------------------------------------------------------------------------------------------------------------------------------------

// ----- REPORT DESC PER FILTER ----------------------------------------------------------------------------------------------------------------------------------------------------
// descriptions per report
const REPORT_DESCRIPTIONS: Record<ReportType, string> = {
  "Drivers by Filter": "Filter and view drivers by license type, status, age range, and sex",
  "Vehicles by Driver": "View all vehicles registered under a specific driver",
  "Expired Vehicle Registrations": "View all vehicle registrations that have expired as of a given date",
  "Expired or Suspended Licenses": "View all driver licenses that are expired or suspended as of a given date",
  "Violations by Driver": "View all traffic violations committed by a given driver within a specified date range",
  "Violations by Type": "View all traffic violations filtered by violation type",
  "Violations by Location": "View all traffic violations filtered by location",
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------

// ----- TABLE COL ----------------------------------------------------------------------------------------------------------------------------------------------------
// columns per filter category
// CHANGE TO MATCH THE TABLE IN SQL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const COLUMNS: Record<ReportType, string[]> = {
  "Drivers by Filter": ["License Number", "Full Name", "License Type", "Status", "Age", "Sex"],
  "Vehicles by Driver": ["Plate Number", "Make", "Model", "Year", "Vehicle Type", "Owner"],
  "Expired Vehicle Registrations": ["Plate Number", "Owner Name", "Expiration Date", "Vehicle Type"],
  "Expired or Suspended Licenses": ["License Number", "Full Name", "License Type", "Status", "Expiry Date"],
  "Violations by Driver": ["Violation Type", "Date", "Location", "Fine Amount", "Status"],
  "Violations by Type": ["Violation Type", "Count", "Total Fines"],
  "Violations by Location": ["Location", "Violation Type", "Driver Name", "Date", "Fine Amount", "Status"],
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------

// ----- MOCK DATA ----------------------------------------------------------------------------------------------------------------------------------------------------
// remove everything after connecting the back end !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// generated lang ^__^ but can be filtered na in the website
const MOCK_DATA: Record<ReportType, Record<string, any>[]> = {
  "Drivers by Filter": [
    { "License Number": "N01-85-123456", "Full Name": "Juan Dela Cruz", "License Type": "Non-Professional", Status: "Valid", Age: 34, Sex: "Male" },
    { "License Number": "P02-90-789012", "Full Name": "Maria Santos", "License Type": "Professional", Status: "Valid", Age: 39, Sex: "Female" },
    { "License Number": "N03-78-345678", "Full Name": "Roberto Reyes", "License Type": "Non-Professional", Status: "Expired", Age: 52, Sex: "Male" },
    { "License Number": "P04-95-901234", "Full Name": "Ana Martinez", "License Type": "Professional", Status: "Valid", Age: 28, Sex: "Female" },
  ],
  "Vehicles by Driver": [
    { "Plate Number": "ABC 1234", Make: "Toyota", Model: "Vios", Year: 2021, "Vehicle Type": "Private Car", Owner: "Juan Dela Cruz" },
    { "Plate Number": "XYZ 5678", Make: "Honda", Model: "Click 125", Year: 2020, "Vehicle Type": "Motorcycle", Owner: "Juan Dela Cruz" },
    { "Plate Number": "DEF 9012", Make: "Mitsubishi", Model: "L300", Year: 2019, "Vehicle Type": "Utility Vehicle", Owner: "Maria Santos" },
  ],
  "Expired Vehicle Registrations": [
    { "Plate Number": "ABC 1234", "Owner Name": "Juan Dela Cruz", "Expiration Date": "2024-03-15", "Vehicle Type": "Private Car" },
    { "Plate Number": "JKL 7890", "Owner Name": "Ana Martinez", "Expiration Date": "2024-01-10", "Vehicle Type": "Motorcycle" },
    { "Plate Number": "MNO 2345", "Owner Name": "Pedro Lopez", "Expiration Date": "2023-12-01", "Vehicle Type": "Utility Vehicle" },
  ],
  "Expired or Suspended Licenses": [
    { "License Number": "N03-78-345678", "Full Name": "Roberto Reyes", "License Type": "Non-Professional", Status: "Expired", "Expiry Date": "2023-08-22" },
    { "License Number": "P06-88-112233", "Full Name": "Lito Fernandez", "License Type": "Professional", Status: "Suspended", "Expiry Date": "2024-02-14" },
    { "License Number": "N07-80-445566", "Full Name": "Nena Cruz", "License Type": "Non-Professional", Status: "Expired", "Expiry Date": "2023-05-30" },
  ],
  "Violations by Driver": [
    { "Violation Type": "Overspeeding", Date: "2024-04-15", Location: "EDSA, Quezon City", "Fine Amount": 1500, Status: "Unpaid" },
    { "Violation Type": "Illegal Parking", Date: "2024-02-10", Location: "BGC, Taguig", "Fine Amount": 500, Status: "Paid" },
    { "Violation Type": "Beating Red Light", Date: "2024-01-05", Location: "C5, Pasig", "Fine Amount": 1000, Status: "Unpaid" },
  ],
  "Violations by Type": [
    { "Violation Type": "Overspeeding", Count: 145, "Total Fines": 217500 },
    { "Violation Type": "Reckless Driving", Count: 87, "Total Fines": 261000 },
    { "Violation Type": "No Helmet", Count: 203, "Total Fines": 203000 },
    { "Violation Type": "Illegal Parking", Count: 64, "Total Fines": 32000 },
    { "Violation Type": "Beating Red Light", Count: 51, "Total Fines": 51000 },
  ],
  "Violations by Location": [
    { Location: "EDSA, Quezon City", "Violation Type": "Overspeeding", "Driver Name": "Juan Dela Cruz", Date: "2024-04-15", "Fine Amount": 1500, Status: "Unpaid" },
    { Location: "EDSA, Quezon City", "Violation Type": "Illegal Parking", "Driver Name": "Rosa Garcia", Date: "2024-03-10", "Fine Amount": 500, Status: "Paid" },
    { Location: "BGC, Taguig", "Violation Type": "Illegal Parking", "Driver Name": "Maria Santos", Date: "2024-02-10", "Fine Amount": 500, Status: "Paid" },
    { Location: "C5, Pasig", "Violation Type": "Beating Red Light", "Driver Name": "Ana Martinez", Date: "2024-01-05", "Fine Amount": 1000, Status: "Unpaid" },
  ],
};

// ----- EXPORT TO CSV ----------------------------------------------------------------------------------------------------------------------------------------------------
// joins all columns to export sa csv
// helper func!
const toCSV = (columns: string[], rows: Record<string, any>[]): string => {
  const header = columns.join(",");
  const body = rows.map(r => columns.map(c => `"${r[c] ?? ""}"`).join(",")).join("\n");
  return `${header}\n${body}`;
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------

// ----- DL CSV ----------------------------------------------------------------------------------------------------------------------------------------------------
const downloadCSV = (content: string, filename: string) => {
  const blob = new Blob([content], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------

// ----- CSS STYLE FOR THIS PAGE ----------------------------------------------------------------------------------------------------------------------------------------------------
// opted for this than external, not familiar with tailwind din na used sa other files
// constant 'S', will be used for the whole file and other atyling from index.ss
const S = {
  // layout ------------------------------------------------------------
  page: {
    width: "100%",
    padding: "24px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
  },
  topGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "24px",
  },
  // cards -------------------------------------------------------------
  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  cardTitle: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#1e293b",
    margin: 0,
  },
  cardSubtitle: {
    fontSize: "13px",
    color: "#64748b",
    marginTop: "2px",
    marginBottom: 0,
  },
  // form fields -------------------------------------------------------
  fieldWrap: { marginTop: "16px" },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: 500,
    color: "#374151",
    marginBottom: "4px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box" as const,
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    background: "#f8fafc",
    padding: "8px 12px",
    fontSize: "13px",
    color: "#1e293b",
    outline: "none",
  },
  select: {
    width: "100%",
    boxSizing: "border-box" as const,
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    background: "#f8fafc",
    padding: "8px 12px",
    fontSize: "13px",
    color: "#1e293b",
    outline: "none",
    appearance: "auto" as const,
  },
  row: { display: "flex", gap: "8px" },
  spaceY: { display: "flex", flexDirection: "column" as const, gap: "16px" },
  // dropdown ----------------------------------------------------------
  dropdownBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    background: "#f8fafc",
    padding: "8px 12px",
    fontSize: "13px",
    color: "#1e293b",
    cursor: "pointer",
  },
  dropdownList: {
    position: "absolute" as const,
    top: "calc(100% + 4px)",
    left: 0,
    right: 0,
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    zIndex: 20,
    overflow: "hidden",
  },
  dropdownItem: (active: boolean): React.CSSProperties => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 12px",
    fontSize: "13px",
    color: active ? "#3b5bdb" : "#374151",
    fontWeight: active ? 600 : 400,
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
  }),
  descText: {
    fontSize: "13px",
    color: "#64748b",
    marginTop: "12px",
    fontStyle: "italic",
  },
  // action buttons -------------------------------------------------------------------------
  btnRow: { display: "flex", alignItems: "center", gap: "12px" },
  btnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "#1e293b",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
  },
  btnSecondary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "#ffffff",
    color: "#374151",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    padding: "8px 16px",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
  },
  // table ---------------------------------------------------------------------------------
  tableWrap: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    overflow: "hidden",
  },
  tableScroll: { overflowX: "auto" as const },
  table: { width: "100%", borderCollapse: "collapse" as const, fontSize: "13px" },
  thead: { background: "#f8fafc", borderBottom: "1px solid #f1f5f9" },
  th: {
    padding: "10px 16px",
    textAlign: "left" as const,
    fontSize: "11px",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    color: "#64748b",
  },
  td: { padding: "10px 16px", color: "#374151", borderBottom: "1px solid #f1f5f9" },
  tableFooter: {
    borderTop: "1px solid #f1f5f9",
    padding: "6px 16px",
    fontSize: "11px",
    color: "#94a3b8",
  },
  // empty state -------------------------------------------------------------------------
  emptyBox: {
    background: "#ffffff",
    border: "1px dashed #e2e8f0",
    borderRadius: "12px",
    padding: "64px 0",
    textAlign: "center" as const,
  },
  emptyText: { fontSize: "13px", color: "#94a3b8", marginTop: "12px" },
};

// ----- STATUS ----------------------------------------------------------------------------------------------------------------------------------------------------
// CHECK IF VALUES MATCH W/ THE BACKEND TABLE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const statusStyle = (value: string): React.CSSProperties => {
  if (value === "Paid" || value === "Valid")
    return { background: "#f0fdf4", color: "#15803d", border: "1px solid #3cec7a", borderRadius: "999px", padding: "2px 8px", fontSize: "11px", fontWeight: 500, display: "inline-block" };
  if (value === "Unpaid" || value === "Expired")
    return { background: "#fef2f2", color: "#dc2626", border: "1px solid #ff6060", borderRadius: "999px", padding: "2px 8px", fontSize: "11px", fontWeight: 500, display: "inline-block" };
  if (value === "Suspended")
    return { background: "#fff1cf", color: "#c36319", border: "1px solid #f7ab48", borderRadius: "999px", padding: "2px 8px", fontSize: "11px", fontWeight: 500, display: "inline-block" };
  return { background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", borderRadius: "999px", padding: "2px 8px", fontSize: "11px", fontWeight: 500, display: "inline-block" };
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------

// ----- REUSABLE TEXT FIELDS ----------------------------------------------------------------------------------------------------------------------------------------------------
const Label = ({ children }: { children: React.ReactNode }) => (
  <label style={S.label}>{children}</label>
);

// text field --------------------------------------
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} style={S.input} />
);

// dropdown -----------------------------------------
const SelectField = ({ placeholder, options, value, onChange }: {
  placeholder?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <select value={value} onChange={e => onChange(e.target.value)} style={S.select}>
    {placeholder && <option value="">{placeholder}</option>}
    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);

// ----- FILTER STATE INTERFACE ----------------------------------------------------------------------------------------------------------------------------------------------------
// DOUBLE CHEKC VALUES 1!!!!!!!!!!!!!!!!!!!!!!!!
interface DriversFilter { license_type: string; license_status: string; min_age: string; max_age: string; sex: string; }
interface DateRangeFilter { extra_value: string; start_date: string; end_date: string; }

// driver -------------------------------------------------------------
const DriversFilterPanel = ({ value, onChange }: { value: DriversFilter; onChange: (v: DriversFilter) => void }) => (
  <div style={S.spaceY}>
    <div>
      {/* liscence type */}
      <Label>License Type</Label>
      <SelectField value={value.license_type} onChange={v => onChange({ ...value, license_type: v })}
        placeholder="Select license type"
        options={[
          { value: "Non-Professional", label: "Non-Professional" },
          { value: "Professional", label: "Professional" },
          { value: "Student Permit", label: "Student Permit" },
        ]}
      />
    </div>
    <div>
      {/* license status */}
      <Label>License Status</Label>
      <SelectField value={value.license_status} onChange={v => onChange({ ...value, license_status: v })}
        placeholder="Select status"
        options={[
          { value: "Valid", label: "Valid" },
          { value: "Expired", label: "Expired" },
          { value: "Suspended", label: "Suspended" },
          { value: "Revoked", label: "Revoked" },
        ]}
      />
    </div>
    <div>
      {/* age range */}
      <Label>Age Range</Label>
      <div style={S.row}>
        <Input type="number" placeholder="Min age" value={value.min_age} onChange={e => onChange({ ...value, min_age: e.target.value })} />
        <Input type="number" placeholder="Max age" value={value.max_age} onChange={e => onChange({ ...value, max_age: e.target.value })} />
      </div>
    </div>
    <div>
      {/* sex */}
      <Label>Sex</Label>
      <SelectField value={value.sex} onChange={v => onChange({ ...value, sex: v })}
        placeholder="Select sex"
        options={[
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
        ]}
      />
    </div>
  </div>
);

// for date only filters ----------------------------------------------------
const DateOnlyPanel = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div>
    <Label>As of Date</Label>
    <Input type="date" value={value} onChange={e => onChange(e.target.value)} />
  </div>
);

// for date range / start and end -----------------------------------------------------------
const DateRangePanel = ({ extraLabel, value, onChange }: {
  extraLabel: string;
  value: DateRangeFilter;
  onChange: (v: DateRangeFilter) => void;
}) => (
  <div style={S.spaceY}>
    <div>
      <Label>{extraLabel}</Label>
      <Input placeholder={`Enter ${extraLabel.toLowerCase()}`} value={value.extra_value} onChange={e => onChange({ ...value, extra_value: e.target.value })} />
    </div>
    <div>
      <Label>Start Date</Label>
      <Input type="date" value={value.start_date} onChange={e => onChange({ ...value, start_date: e.target.value })} />
    </div>
    <div>
      <Label>End Date</Label>
      <Input type="date" value={value.end_date} onChange={e => onChange({ ...value, end_date: e.target.value })} />
    </div>
  </div>
);

// ----- MAIN PAGE ----------------------------------------------------------------------------------------------------------------------------------------------------
const ReportsPage = () => {
  const [reportType, setReportType] = useState<ReportType>("Drivers by Filter");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [rows, setRows] = useState<Record<string, any>[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);

  const [driversFilter, setDriversFilter] = useState<DriversFilter>({ license_type: "", license_status: "", min_age: "", max_age: "", sex: "" });
  const [asOfDate, setAsOfDate] = useState("");
  const [vehicleDriver, setVehicleDriver] = useState("");
  const [violByDriver, setViolByDriver] = useState<DateRangeFilter>({ extra_value: "", start_date: "", end_date: "" });
  const [violByType, setViolByType] = useState<DateRangeFilter>({ extra_value: "", start_date: "", end_date: "" });
  const [violByLoc, setViolByLoc] = useState<DateRangeFilter>({ extra_value: "", start_date: "", end_date: "" });

  const handleSelectReport = (r: ReportType) => {
    setReportType(r);
    setDropdownOpen(false);
    setRows([]);
    setHasGenerated(false);
  };

  // CHANGE THIS ------------------------------------------------------
  const handleGenerate = () => {
    let data = MOCK_DATA[reportType];

    switch (reportType) {
      // DRIVERS BY FILTER
      // ----------------------------------------------------------------------------------------------------
      case "Drivers by Filter":
        data = data.filter(r => {
          if (driversFilter.license_type && r["License Type"] !== driversFilter.license_type) return false;
          if (driversFilter.license_status && r["Status"] !== driversFilter.license_status) return false;
          if (driversFilter.sex && r["Sex"] !== driversFilter.sex) return false;
          if (driversFilter.min_age && Number(r["Age"]) < Number(driversFilter.min_age)) return false;
          if (driversFilter.max_age && Number(r["Age"]) > Number(driversFilter.max_age)) return false;
          return true;
        });
        break;
      // ----------------------------------------------------------------------------------------------------

      // VEHICLES BY DRIVER
      // ----------------------------------------------------------------------------------------------------
      case "Vehicles by Driver":
        if (vehicleDriver.trim())
          data = data.filter(r => r["Owner"].toLowerCase().includes(vehicleDriver.trim().toLowerCase()));
        break;
      // ----------------------------------------------------------------------------------------------------

      // VIOLATIONS BY DRIVER
      // // ----------------------------------------------------------------------------------------------------
      case "Violations by Driver":
        if (violByDriver.extra_value.trim())
          data = data.filter(r => (r["Driver Name"] ?? "").toLowerCase().includes(violByDriver.extra_value.trim().toLowerCase()));
        break;
      // // ----------------------------------------------------------------------------------------------------

      // VIOLATIONS BY TYPE
      // ----------------------------------------------------------------------------------------------------
      case "Violations by Type":
        break;
      // ----------------------------------------------------------------------------------------------------

      // VIOLATIONS BY LOC
      // ----------------------------------------------------------------------------------------------------
      case "Violations by Location":
        if (violByLoc.extra_value.trim())
          data = data.filter(r => r["Location"].toLowerCase().includes(violByLoc.extra_value.trim().toLowerCase()));
        break;
      // ----------------------------------------------------------------------------------------------------
    }
    setRows(data);
    setHasGenerated(true);
    if (data.length === 0) toast.info("No results match the filter."); // when there is no result
    else toast.success("Report generated successfully"); // when there are results
  };

  // handles the csv export button
  const handleExportCSV = () => {
    if (rows.length === 0) { toast.info("No data to export."); return; }
    downloadCSV(toCSV(COLUMNS[reportType], rows), `${reportType.replace(/\s+/g, "_")}_report.csv`);
    toast.success("CSV exported");
  };

  // switch functions to det which ui controls to show in the screen
  const renderFilterPanel = () => {
    switch (reportType) {
      // -----------------------------------------
      case "Drivers by Filter":
        return <DriversFilterPanel value={driversFilter} onChange={setDriversFilter} />;
      // -----------------------------------------
      // -----------------------------------------
        case "Vehicles by Driver":
        return (
          <div>
            <Label>Driver Name</Label>
            <Input placeholder="Enter driver name" value={vehicleDriver} onChange={e => setVehicleDriver(e.target.value)} />
          </div>
        );
      // -----------------------------------------
      // -----------------------------------------
      case "Expired Vehicle Registrations":
      // -----------------------------------------
      // -----------------------------------------
      case "Expired or Suspended Licenses":
        return <DateOnlyPanel value={asOfDate} onChange={setAsOfDate} />;
      // -----------------------------------------
      // -----------------------------------------
      case "Violations by Driver":
        return <DateRangePanel extraLabel="Driver Name" value={violByDriver} onChange={setViolByDriver} />;
      // -----------------------------------------
      // -----------------------------------------
      case "Violations by Type":
        return (
          <div>
            <Label>Year</Label>
            <Input type="number" placeholder="e.g. 2024" value={violByType.start_date} onChange={e => setViolByType(p => ({ ...p, start_date: e.target.value }))} />
          </div>
        );
      // -----------------------------------------
      // -----------------------------------------
      case "Violations by Location":
        return (
          <div>
            <Label>City / Region</Label>
            <Input placeholder="Enter city or region" value={violByLoc.extra_value} onChange={e => setViolByLoc(p => ({ ...p, extra_value: e.target.value }))} />
          </div>
        );
      // -----------------------------------------
    }
  };

  // get headers based on the selected filter
  const columns = COLUMNS[reportType];

  return (
    <div style={S.page} onClick={() => dropdownOpen && setDropdownOpen(false)}>

      {/* top panels */}
      <div style={S.topGrid}>

        {/* select report */}
        <div style={S.card}>
          <p style={S.cardTitle}>Select Report</p>
          <p style={S.cardSubtitle}>Choose a report type to generate</p>

          <div style={S.fieldWrap}>
            <Label>Report Type</Label>

            {/* custom dropdown */}
            <div style={{ position: "relative" }} onClick={e => e.stopPropagation()}>
              <button style={S.dropdownBtn} onClick={() => setDropdownOpen(p => !p)}>
                {reportType}
                {/* not really necessary, can be removed */}
                <svg style={{ width: 16, height: 16, color: "#94a3b8", transform: dropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              {dropdownOpen && (
                <ul style={{ ...S.dropdownList, listStyle: "none", margin: 0, padding: 0 }}>
                  {REPORT_TYPES.map(r => (
                    <li key={r}>
                      <button style={S.dropdownItem(r === reportType)} onClick={() => handleSelectReport(r)}>
                        {r}
                        {/* not really necessary, can be removed */}
                        {r === reportType && (
                          <svg style={{ width: 14, height: 14 }} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p style={S.descText}>{REPORT_DESCRIPTIONS[reportType]}</p>
          </div>
        </div>

        {/* filter parameters */}
        <div style={S.card}>
          <p style={S.cardTitle}>Filter Parameters</p>
          <p style={S.cardSubtitle}>Specify filter criteria for the report</p>
          <div style={S.fieldWrap}>
            {renderFilterPanel()}
          </div>
        </div>
      </div>

      {/* action buttons */}
      <div style={S.btnRow}>
        <button style={S.btnPrimary} onClick={handleGenerate}>
          <FileText size={15} />
          Generate Report
        </button>
        <button style={S.btnSecondary} onClick={handleExportCSV}>
          <Download size={15} />
          Export to CSV
        </button>
      </div>

      {/* results table */}
      {rows.length > 0 && (
        <div style={S.tableWrap}>
          <div style={S.tableScroll}>
            <table style={S.table}>
              <thead style={S.thead}>
                <tr>
                  {columns.map(col => (
                    <th key={col} style={S.th}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    {columns.map(col => (
                      <td key={col} style={S.td}>
                        {col === "Status"
                          ? <span style={statusStyle(String(row[col] ?? ""))}>{row[col]}</span>
                          : (row[col] ?? "—")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={S.tableFooter}>
            {rows.length} record{rows.length !== 1 ? "s" : ""} found
          </div>
        </div>
      )}

      {/* empty state */}
      {!hasGenerated && (
        <div style={S.emptyBox}>
          <FileText size={40} color="#cbd5e1" style={{ margin: "0 auto" }} />
          <p style={S.emptyText}>
            Select a report type and click <strong style={{ color: "#475569" }}>Generate Report</strong> to view results.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;