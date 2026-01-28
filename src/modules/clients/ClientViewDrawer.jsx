import { useMemo, useState } from "react";
import {
  Building2,
  Globe,
  Clock,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

export default function ClientViewDrawer({ open, onClose, data }) {
  if (!open || !data) return null;

  const privileges = useMemo(() => {
    try {
      return data?.privilegeJson ? JSON.parse(data.privilegeJson) : [];
    } catch {
      return [];
    }
  }, [data]);

  const uiActions = useMemo(() => {
    try {
      if (!data?.uiActionsJson) return [];

      const parsed = JSON.parse(data.uiActionsJson);
      if (Array.isArray(parsed)) return parsed;
      return Object.entries(parsed).map(([key, value]) => {
        const children = Array.isArray(value.actions)
          ? value.actions.map((a) => ({
              key: a.key,
              displayName: a.displayName,
              enabled: !!a.enabled,
            }))
          : [];

        const parentEnabled =
          !!value.enabled || children.some((c) => c.enabled);

        return {
          id: key,
          displayName: key,
          enabled: parentEnabled,
          children,
        };
      });
    } catch {
      return [];
    }
  }, [data]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white w-[1000px] max-h-[90vh] rounded-xl shadow-xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="px-6 py-4 bg-[#e8f0f2] border-b flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-brand-dark">
              Client Details
            </h2>
            <p className="text-xs text-slate-500">
              View client configuration & permissions
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-lg text-slate-500 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {/* BASIC INFO */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-brand-dark/10 grid grid-cols-2 gap-6">
            <Info icon={Building2} label="Partner Name" value={data.partnerName} />
            <Info icon={Globe} label="Domain" value={data.domain} />
            <Info icon={Clock} label="Cooling Off" value={`${data.coolOffPeriodDays} days`} />
            <Info
              icon={ShieldCheck}
              label="Status"
              value={data.activeFlag ? "Active" : "Inactive"}
              badge
            />
          </div>

          {/* PRIVILEGES */}
          <Section title="Privileges">
            <div className="flex flex-wrap gap-4">
              {privileges
                .filter((p) => p.children?.some((c) => c.enabled))
                .map((p) => (
                  <div key={p.id} className="w-[280px]">
                    <Tree parent={p} />
                  </div>
                ))}
            </div>
          </Section>

          {/* UI ACTIONS */}
          <Section title="UI Actions">
            <div className="flex flex-wrap gap-4">
              {uiActions
                .filter((p) => p.children?.some((c) => c.enabled))
                .map((p) => (
                  <div key={p.id} className="w-[280px]">
                    <Tree parent={p} />
                  </div>
                ))}
            </div>
          </Section>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 bg-white border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-slate-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

const Info = ({ icon: Icon, label, value, badge }) => (
  <div className="flex items-start gap-3">
    <Icon className="h-4 w-4 text-brand-dark mt-0.5" />
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      {badge ? (
        <span
          className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold
            ${
              value === "Active"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-600"
            }`}
        >
          {value}
        </span>
      ) : (
        <p className="font-medium text-slate-800">{value || "-"}</p>
      )}
    </div>
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
    <h3 className="font-semibold text-brand-dark text-sm uppercase tracking-wide mb-4">
      {title}
    </h3>
    {children}
  </div>
);

const Tree = ({ parent }) => {
  const [open, setOpen] = useState(true);

  if (!parent?.children?.some((c) => c.enabled)) return null;

  const enabledChildren = parent.children.filter((c) => c.enabled);

  return (
    <div className="rounded-lg bg-white border border-slate-200 transition-all duration-300 ease-in-out">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-brand-bg/40 select-none"
      >
        <div className="flex items-center gap-2 font-semibold text-brand-dark">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              open ? "bg-brand-dark" : "bg-slate-400"
            }`}
          />
          {parent.displayName}
          <span className="text-xs text-slate-500">
            ({enabledChildren.length})
          </span>
        </div>

        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {open && (
        <div className="relative ml-4 pl-4 pt-1 pb-2 space-y-1 text-sm text-slate-700">
          <span className="absolute left-0 top-0 h-full w-px bg-slate-300" />
          {enabledChildren.map((c) => (
            <div
              key={c.id || c.key}
              className="relative flex items-center gap-2 py-0.5"
            >
              <span className="absolute -left-4 top-1/2 h-px w-3 bg-slate-300" />
              {c.displayName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
