import { useNavigate, useOutletContext } from "react-router-dom";
import { LayoutContextType } from "./components/main/Layout";
import { useEffect } from "react";
import { Activity, ArrowRight, Wifi } from "lucide-react";

export default function App() {
  const { darkMode, setTitle } = useOutletContext<LayoutContextType>();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Connection",
      description: "Kelola dan pantau semua koneksi server Anda. Tambah koneksi baru, lihat status koneksi yang aktif, dan konfigurasi pengaturan jaringan dengan mudah.",
      icon: Wifi,
      href: "/connection",
      features: ["Tambah koneksi baru", "Monitor status real-time", "Konfigurasi jaringan"],
    },
    {
      title: "Monitoring Row Count",
      description: "Memantau total row table dari source dan target dengan statistik untuk mengetahui perbedaannya.",
      icon: Activity,
      href: "/monitoring",
      features: ["Row Different", "Row dashboard"],
      subMenus: [
        { name: "Real-time Status", icon: Activity, href: "/monitoring/realtime" },
      ],
    },
  ];

  useEffect(() => {
    setTitle("Home");
  }, [setTitle]);
  return (
    <div className="grid grid-cols-1 p-11 flex-1 items-stretch">
      <div className="max-w-2xl mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Welcome back!
        </h1>
        <p className="text-lg text-muted-foreground">
          Kelola table dan memantau total data table dari berbagai source target dengan level Medallion.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {menuItems.map((item, index) => (
              <div
                key={item.title}
                className={`${darkMode ? "bg-gray-800" : "border-gray-200 bg-white"} group relative overflow-hidden bg-card duration-300 rounded-xl border  p-4 shadow-sm transition hover:shadow-2xl hover:-translate-y-1`}
                style={{ animationDelay: `${(index + 1) * 0.15}s` }}
              >
                {/* Icon */}
                <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-4 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-8 w-8" />
                </div>

                {/* Title & Description */}
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  {item.title}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-8">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Sub Menus (if any) */}
                {item.subMenus && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {item.subMenus.map((sub) => (
                      <button
                        key={sub.name}
                        onClick={() => navigate(sub.href)}
                        className="inline-flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground"
                      >
                        <sub.icon className="h-4 w-4" />
                        {sub.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() => navigate(item.href)}
                  className="group/btn bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Buka {item.title}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </button>

                {/* Decorative gradient */}
                <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />
              </div>
            ))}
          </div>
    </div>
  );
}
