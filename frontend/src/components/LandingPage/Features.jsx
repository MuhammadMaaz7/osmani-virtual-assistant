import { motion } from 'framer-motion';
import { Database, Search, MessageSquare, Shield, Clock, FileText } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Database className="h-8 w-8" />,
      title: "Centralized Data",
      description: "Access all company data in one place, from projects to financial records.",
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Advanced Querying",
      description: "Ask complex questions and get precise answers from the company's database.",
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Natural Language",
      description: "Interact with the AI assistant using simple, everyday language.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Access",
      description: "Your data is protected with enterprise-grade security and encryption.",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Instant Responses",
      description: "Get real-time answers to your queries without delays.",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Document Retrieval",
      description: "Quickly locate and retrieve important company documents and reports.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }} // Allow re-triggering on scroll
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
          >
            Features Tailored for Osmani & Company
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }} // Allow re-triggering on scroll
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Empower your team with an AI assistant that simplifies data access, enhances productivity, and ensures security.
          </motion.p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }} // Allow re-triggering on scroll
              transition={{ duration: 0.6, delay: index * 0.1 }} // Slow card display transition
              whileHover={{ scale: 1.02 }} // Immediate hover scaling
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform border border-gray-200 hover:border-emerald-500"
            >
              <div className="text-emerald-600 mb-6 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}