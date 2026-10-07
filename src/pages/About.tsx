export function About() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Sanjeevani Pharmacy</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-6 text-gray-600 leading-relaxed">
        <p>
          Established in 2010, <strong className="text-gray-900">Sanjeevani Pharmacy</strong> has been at the forefront of providing genuine and authentic healthcare products to millions of customers.
        </p>
        <p>
          Our mission is to make healthcare accessible, affordable, and safe for everyone. We believe that buying medicines online should be as simple and trustworthy as buying them from your neighborhood pharmacy.
        </p>
        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Why Choose Us?</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>100% Genuine Products:</strong> All our medicines and products are sourced directly from authorized manufacturers and distributors.</li>
          <li><strong>Prescription Verification:</strong> We take your health seriously. Every prescription is verified by registered pharmacists before processing.</li>
          <li><strong>Fast & Reliable Delivery:</strong> We offer express delivery options to ensure you receive your medicines when you need them most.</li>
          <li><strong>Dedicated Support:</strong> Our customer support and pharmacy team are available 24/7 to answer your queries and assist with your orders.</li>
        </ul>
        <div className="mt-12 p-6 bg-primary-50 rounded-xl border border-primary-100 text-center">
          <p className="font-medium text-primary-800">
            "Your health is our priority. Thank you for trusting Sanjeevani Pharmacy."
          </p>
        </div>
      </div>
    </div>
  );
}
