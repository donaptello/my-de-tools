import { motion } from "framer-motion";
import { Zap, Lock, BarChart3 } from "lucide-react";

interface BrandingLoginProps {
  darkMode: boolean;
}

export default function BrandingLogin({ darkMode }: BrandingLoginProps) {
  const title = "Tools Management";
  const description =
    "Powerful tools management and monitoring platform for modern teams";
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Optimized performance for real-time monitoring",
    },
    {
      icon: Lock,
      title: "Secure by Default",
      desc: "Enterprise-grade encryption and security",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      desc: "Comprehensive insights and reporting tools",
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
            <div className="w-12 h-12 from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
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
                  className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors"
                >
                  <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
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
