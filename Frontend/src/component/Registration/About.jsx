import { motion } from "framer-motion";
 
export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Our System</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our Auto Insurance Management System is a comprehensive platform designed to manage
          policies, claims, payments, and support tickets efficiently. Built with modern
          technologies, it ensures a smooth and secure experience for both customers and agents.
        </p>
      </div>
 
      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          {
            title: "Policy Management",
            description:
              "Easily create, update, and manage all your insurance policies in one place."
          },
          {
            title: "Claim Tracking",
            description:
              "Submit and monitor your claims with real-time updates and transparency."
          },
          {
            title: "Secure Payments",
            description:
              "Process premium payments quickly and securely with multiple payment options."
          },
          {
            title: "Support Tickets",
            description:
              "Raise and track support tickets to resolve issues faster with our agents."
          },
          {
            title: "24/7 Support",
            description:
              "Round-the-clock assistance to help with policies, claims, and payments anytime."
          },
          {
            title: "Admin Dashboard",
            description:
              "Comprehensive dashboard to manage users, policies, claims, and reports."
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-2xl p-6 text-center border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h2>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
 
      {/* Mission & Vision Section */}
      <div className="mt-16 text-center max-w-3xl mx-auto">
        {/* <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600">
          To simplify auto insurance processes by providing a seamless digital platform that
          benefits both customers and administrators.
        </p> */}
 
        {/* <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">Our Vision</h2>
        <p className="text-gray-600">
          To become the leading auto insurance platform with cutting-edge technology, IoT
          integration, and customer-focused services.
        </p> */}
      </div>
    </div>
  );
}