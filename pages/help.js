import Link from "next/link";

export default function Help() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Help Center</h1>
      <p className="text-gray-600 mb-8">
        Welcome to the Help Center. Choose an option below to find the
        information you need.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">FAQs</h2>
          <p className="text-gray-600 mb-4">Answers to common questions.</p>
          <Link href="/help/faqs" className="text-blue-500 hover:underline">
            Go to FAQs
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Contact Us
          </h2>
          <p className="text-gray-600 mb-4">
            Get in touch with our support team.
          </p>
          <Link href="/help/contact" className="text-blue-500 hover:underline">
            Contact Support
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Privacy Policy
          </h2>
          <p className="text-gray-600 mb-4">
            Details on how we manage your data.
          </p>
          <Link href="/help/privacy" className="text-blue-500 hover:underline">
            Read Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
