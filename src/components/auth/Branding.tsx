import { motion } from "framer-motion";
import { Zap, Lock, BarChart3 } from "lucide-react";

interface BrandingLoginProps {
  darkMode: boolean;
}

export default function BrandingLogin({ darkMode }: BrandingLoginProps) {
  const title = "Tools Management";
  const description = "Manage store connections and monitor data flow between source and target systems.";
  const features = [
    {
      icon: Zap,
      title: "Connection Setup",
      desc: "Configure and maintain store connections.",
    },
    {
      icon: Lock,
      title: "Source Monitoring",
      desc: "Track data from source tables.",
    },
    {
      icon: BarChart3,
      title: "Target Monitoring",
      desc: "Monitor target table synchronization.",
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex flex-col justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              darkMode ? "bg-blue-900/40" : "bg-blue-100"
            }`}>
              <BarChart3 className={`w-7 h-7 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            </div>
            <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
              {title}
            </h1>
          </div>
          <p className={`text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {description}
          </p>
        </motion.div>

        <div className="space-y-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex gap-4 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    darkMode 
                      ? "bg-blue-900/30 group-hover:bg-blue-900/60" 
                      : "bg-blue-100 group-hover:bg-blue-200"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
