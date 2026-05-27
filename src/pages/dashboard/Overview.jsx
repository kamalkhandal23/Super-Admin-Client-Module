import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  IndianRupee,
  Package,
  Users,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { fetchPartnerCount } from "../../services/clientService";

const metrics = [
  {
    label: "Total Products",
    value: "128",
    icon: Package,
    iconColor: "text-sky-600",
    chip: "+5.2%",
    chipTone: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Total Revenue",
    value: "Rs 12.4L",
    icon: IndianRupee,
    iconColor: "text-emerald-600",
    chip: "+2.1%",
    chipTone: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Total Clients",
    value: "0",
    icon: Users,
    iconColor: "text-orange-500",
    chip: "--",
    chipTone: "bg-rose-50 text-rose-500",
    dynamic: true,
  },
  {
    label: "Total Services",
    value: "24",
    icon: BriefcaseBusiness,
    iconColor: "text-violet-600",
    chip: "+25%",
    chipTone: "bg-emerald-50 text-emerald-600",
  },
];

export default function DashboardOverview() {
  const [clientCount, setClientCount] = useState("--");

  useEffect(() => {
    let isMounted = true;

    const loadClientCount = async () => {
      const count = await fetchPartnerCount();
      if (isMounted) {
        setClientCount(String(count));
      }
    };

    loadClientCount();

    return () => {
      isMounted = false;
    };
  }, []);

  const cards = metrics.map((metric) =>
    metric.dynamic ? { ...metric, value: clientCount } : metric
  );

  return (
    <div className="min-h-full bg-grey-900 px-6 pt-6 pb-6 lg:px-8 lg:pt-8 lg:pb-8">
      <div className="min-h-screen bg-gray-100 p-4">
      
        <section className="rounded-[28px] border rounded-xl border-slate-200 bg-white p-6 shadow-[0_12px_48px_rgba(15,23,42,0.08)]">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1b6983]/10 text-[#1b6983]">
              <Sparkles size={18} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                Dashboard Overview
              </h1>
              <p className="mt-1 text-xs text-gray-600">
                A compact summary of the most important product metrics.
              </p>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-4">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.label}
                  className="rounded-[10px] border border-slate-100 bg-slate-50/70 px-5 py-4 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <Icon size={22} className={`mt-0.5 ${card.iconColor}`} strokeWidth={2} />
                    <div className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${card.chipTone}`}>
                      {card.chip === "--" ? "Live" : card.chip}
                      {card.chip !== "--" && <ArrowUpRight size={12} />}
                    </div>
                  </div>

                  <p className="text-2xl font-semibold leading-none tracking-tight text-gray-800">
                    {card.value}
                  </p>
                  <p className="mt-3 text-xs text-gray-600">{card.label}</p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
      </div>
    
  );
}
