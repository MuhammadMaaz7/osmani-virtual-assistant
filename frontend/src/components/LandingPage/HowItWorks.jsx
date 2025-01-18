import { motion } from 'framer-motion';
import { MessageCircle, Search, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Ask a Question",
      description: "Type or speak your query about Osmani & Company.",
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "AI Processing",
      description: "Our AI analyzes your question using our comprehensive database.",
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Get Answer",
      description: "Receive accurate, relevant information instantly.",
    },
  ];

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each step's animation
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }} // Allow re-triggering on scroll
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }} // Allow re-triggering on scroll
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Get started with our AI assistant in three simple steps.
          </motion.p>
        </div>

        {/* Steps with Staggered Animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }} // Allow re-triggering on scroll
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }} // Hover effect
              transition={{ type: "spring", stiffness: 300 }} // Smooth spring animation
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform border border-gray-200 hover:border-emerald-500 text-center"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }} // Icon hover effect
                transition={{ type: "spring", stiffness: 300 }}
                className="text-emerald-600 mb-6 flex justify-center"
              >
                {step.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}