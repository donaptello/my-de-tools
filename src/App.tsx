import { useEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { LayoutContextType } from "./components/main/Layout";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Database,
  FolderTree,
  Gauge,
  GitBranch,
  LineChart,
  ShieldCheck,
  Table,
  Workflow,
  Zap,
} from "lucide-react";
import CardHome from "./components/home/CardHome";
import { useMonitoringPipelineStatus } from "./services/hooks/useMonitoring";
import { useHopManagementStatus } from "./services/hooks/useHopManagement";
import { convertUpTimeToMinutes } from "./helpers/time";

export default function App() {
  const { darkMode, setTitle } = useOutletContext<LayoutContextType>();
  const { data: dataPipelineStatus } = useMonitoringPipelineStatus();
  const { data: dataHopStatus } = useHopManagementStatus();
  const navigate = useNavigate();
  setTitle("Home");

  const percentage = (success: number, total: number) => {
    return (success / total) * 100;
  };
  const stats = useMemo(
    () => [
      {
        label: "Pipeline Aktif",
        value: `${dataPipelineStatus?.data.success ?? 0}`,
        icon: Activity,
        countTo: dataPipelineStatus?.data.success ?? 0,
      },
      {
        label: "Hop Pipeline Success",
        value: `${dataHopStatus?.data.pipelineStatus.totalFinished ?? 0}`,
        icon: GitBranch,
        countTo: dataHopStatus?.data.pipelineStatus.totalFinished ?? 0,
      },
      {
        label: "Success Rate Pipeline",
        value: `${percentage(dataPipelineStatus?.data.success ?? 0, dataPipelineStatus?.data.total ?? 0)}%`,
        icon: CheckCircle2,
        countTo: percentage(
          dataPipelineStatus?.data.success ?? 0,
          dataPipelineStatus?.data.total ?? 0,
        ),
        suffix: "%",
      },
      {
        label: "Uptime",
        value: dataHopStatus?.data.uptime,
        icon: Zap,
        countTo: convertUpTimeToMinutes(dataHopStatus?.data.uptime),
        isTime: true,
      },
    ],
    [
      dataPipelineStatus?.data.success,
      dataPipelineStatus?.data.total,
      dataHopStatus?.data.pipelineStatus.totalFinished,
      dataHopStatus?.data.uptime,
    ],
  );

  const [animatedStats, setAnimatedStats] = useState<string[]>(
    stats.map((stat) => {
      if (stat.isTime) return "0h 0m";
      if (stat.suffix) return `0${stat.suffix}`;
      return "0";
    }),
  );

  useEffect(() => {
    const duration = 800;
    const start = performance.now();

    const animate = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);

      setAnimatedStats(
        stats.map((stat) => {
          if (stat.isTime) {
            const totalMinutes = Math.round(stat.countTo * progress);
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            return `${hours}h ${minutes}m`;
          }
          const value = stat.countTo * progress;
          const formatted = Number.isInteger(stat.countTo)
            ? Math.round(value)
            : value.toFixed(1);
          return `${formatted}${stat.suffix ?? ""}`;
        }),
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [stats]);

  const features = [
    {
      icon: Activity,
      title: "Real-time Monitoring",
      desc: "Pantau status pipeline & workflow secara langsung dengan auto-refresh interval.",
    },
    {
      icon: Workflow,
      title: "Pipeline Visualization",
      desc: "Visualisasi graph file .hpl dengan node interaktif berbasis React Flow.",
      disabled: true,
    },
    {
      icon: Database,
      title: "Row Count Comparison",
      desc: "Bandingkan jumlah baris antar tabel sumber dan target dengan mudah.",
    },
    {
      icon: ShieldCheck,
      title: "Error Tracking",
      desc: "Identifikasi pipeline gagal beserta pesan error untuk diagnosa cepat.",
    },
    {
      icon: Gauge,
      title: "Server Health",
      desc: "Pantau memory, CPU, threads, dan uptime Hop Server.",
    },
    {
      icon: FolderTree,
      title: "File Directory",
      desc: "Jelajahi struktur folder dan preview konfigurasi pipeline.",
      disabled: true,
    },
  ];

  return (
    <div className="min-h-screen border-border">
      <section className="overflow-hidden -mx-6 px-6">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-4xl">
            <h1
              className={`text-4xl md:text-6xl ${darkMode ? "text-gray-100" : "text-gray-800"} font-bold tracking-tight text-foreground mb-5 leading-tight`}
            >
              Monitoring & Row Count Table
              <br />
              <span className="text-blue-500">Data Warehouse</span>
            </h1>
            <p
              className={`${darkMode ? "text-gray-400" : "text-gray-500"} md:text-lg font-light mb-8 max-w-2xl leading-relaxed`}
            >
              Satu dashboard untuk memantau eksekusi pipeline, menganalisis log
              error, membandingkan row count, dan menjelajahi struktur file ETL
              Anda secara real-time.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate("/hop-management")}
                className="gap-2 group cursor-pointer inline-flex items-center rounded-xl px-9 py-3 text-sm font-medium transition focus:outline-none focus:ring-2 bg-blue-500 text-white hover:bg-blue-400 focus:ring-blue-300"
              >
                <Activity className="w-4 h-4" />
                Buka Hop Monitoring
                <ArrowRight className="w-4 h-4 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </button>
              <button
                onClick={() => navigate("/monitoring")}
                className={`gap-2 group inline-flex cursor-pointer items-center rounded-xl px-9 py-3 text-sm font-medium transition focus:outline-none focus:ring-2 border ${darkMode ? "border-gray-600 bg-gray-900 text-gray-500 hover:bg-gray-800 focus:ring-gray-800" : "border-gray-300 bg-gray-100 text-gray-500 hover:bg-gray-100 focus:ring-gray-200"}`}
              >
                <Table className="w-4 h-4" />
                Buka Row Count
                <ArrowRight className="w-4 h-4 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`${darkMode ? "bg-gray-800" : "bg-white"} bg-card/40 -mx-6 px-6`}
      >
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, index) => (
              <div key={s.label} className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg ${darkMode ? "bg-blue-900/40" : "bg-blue-100"} flex items-center justify-center shrink-0`}
                >
                  <s.icon
                    className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                  />
                </div>
                <div>
                  <p
                    className={`text-xs ${darkMode ? "text-gray-200" : "text-gray-800"}`}
                  >
                    {s.label}
                  </p>
                  <p
                    className={`text-xl ${darkMode ? "text-gray-200" : "text-gray-800"} font-semibold`}
                  >
                    {animatedStats[index]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h2
            className={`text-2xl md:text-3xl font-bold ${darkMode ? "text-gray-100" : "text-gray-800"} mb-2`}
          >
            Kebutuhan untuk Informasi Data Warehouse
          </h2>
          <p
            className={`${darkMode ? "text-gray-400" : "text-gray-500"} font-light`}
          >
            Tools terintegrasi operasional data pipeline harian.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <CardHome
              darkMode={darkMode}
              title={f.title}
              description={f.desc}
              icon={
                <f.icon
                  className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                />
              }
              disabled={f.disabled}
            />
          ))}
        </div>
      </section>

      {/* Quick Access */}
      <section
        className={`border-t ${darkMode ? "border-gray-600 bg-gray-800/40" : "border-gray-200 bg-gray-50/40"} -mx-6`}
      >
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/hop-management")}
              className={`rounded-xl text-left border p-6 transition group hover:border-blue-300 ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-11 h-11 rounded-lg ${darkMode ? "bg-blue-900/40" : "bg-blue-100"} flex items-center justify-center`}
                >
                  <LineChart
                    className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-500"}`}
                  />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-300 group-hover:translate-x-1 transition-all" />
              </div>
              <h3
                className={`font-semibold ${darkMode ? "text-gray-100" : "text-gray-800"} mb-1`}
              >
                Hop Monitoring
              </h3>
              <p
                className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}
              >
                Lihat status real-time, log eksekusi, dan kesehatan server
                Apache Hop.
              </p>
            </button>

            <button
              disabled
              className={`rounded-xl text-left border p-6 transition group ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } cursor-not-allowed opacity-70`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-11 h-11 rounded-lg ${darkMode ? "bg-blue-900/40" : "bg-blue-100"} flex items-center justify-center`}>
                  <FolderTree className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-500"}`} />
                </div>
                <span className={`text-xs font-semibold uppercase tracking-[0.16em] ${darkMode ? "text-gray-300": "text-gray-500"}`}>
                  Coming Soon
                </span>
              </div>
              <h3
                className={`font-semibold ${darkMode ? "text-gray-100" : "text-gray-800"} mb-1`}
              >
                Root File Directory
              </h3>
              <p
                className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}
              >
                Jelajahi file .hpl dan visualisasikan graph pipeline.
              </p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
