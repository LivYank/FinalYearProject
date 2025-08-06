
import React, { useState } from "react";
import MainLayout from "@/components/ui/MainLayout";

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState("");

const adminVideos = [
{ id: "2001", description: "Can I help with your billing questions?" },
{ id: "2002", description: "Please share your insurance card for processing." },
{ id: "2003", description: "Pay your bill at the front desk before leaving." },
{ id: "2004", description: "Payment is due 30 days after your visit." },
{ id: "2005", description: "We accept cash, mobile money, or credit cards." },
{ id: "2006", description: "Check your invoice for a list of charges." },
{ id: "2007", description: "Let me confirm your insurance coverage." },
{ id: "2008", description: "Is this your first time here?" },
{ id: "2009", description: "Your bill will arrive in the mail." },
{ id: "2010", description: "Confirm your name and address for our records." },
{ id: "2011", description: "We need your ID to update your file." },
{ id: "2012", description: "Please ask questions if your bill is unclear." },
{ id: "2013", description: "Pay your co-pay at your appointment (next visit)." },
{ id: "2014", description: "Please update your phone number if it has changed." },
{ id: "2015", description: "Insurance covers part of the cost; you must pay the rest." },
{ id: "2016", description: "Do you have a referral letter from your doctor?" },
{ id: "2017", description: "Your next appointment is booked; billing updated." },
{ id: "2018", description: "We can split your bill into smaller payments." },
{ id: "2019", description: "Pay online, by phone, or in person." },
{ id: "2020", description: "Ensure your insurance details are current." },
{ id: "2021", description: "Late payments may include additional fees." },
{ id: "2022", description: "A receipt will be sent after payment." },
{ id: "2023", description: "Sign this form for treatment approval." },
{ id: "2024", description: "Your insurance claim is being reviewed." },
{ id: "2025", description: "Check your bill for errors and inform us." },
{ id: "2026", description: "Insurance coverage can change—verify each visit." },
{ id: "2027", description: "Clinic fees are listed in this document." },
{ id: "2028", description: "We’ll bill your insurance first." },
{ id: "2029", description: "Pay now or later in installments." },
{ id: "2030", description: "Your bill includes doctor visits and tests." },
{ id: "2031", description: "Check your insurance benefits for covered services." },
{ id: "2032", description: "Pay consultation fees before treatment." },
{ id: "2033", description: "Did your insurance send you a benefits summary?" },
{ id: "2034", description: "Contact billing for payment issues." },
{ id: "2035", description: "Confirm appointment details before paying." },
{ id: "2036", description: "Payment must be confirmed before treatment." },
{ id: "2037", description: "We’ll notify you if payment has issues." },
{ id: "2038", description: "Your costs for this procedure are listed here." },
{ id: "2039", description: "Lab fees are separate from consultation fees." },
{ id: "2040", description: "Review billing details for accuracy." },
{ id: "2041", description: "Ask about payment discounts or support." },
{ id: "2042", description: "Your bill includes prescribed medications." },
{ id: "2043", description: "Provide your billing address for invoices." },
{ id: "2044", description: "Do you need help paying for this visit?" },
{ id: "2045", description: "Your insurance summary will arrive soon." },
{ id: "2046", description: "Review your charges for accuracy." },
{ id: "2047", description: "Insurance may cover some or all costs." },
{ id: "2048", description: "Request a detailed list of services." },
{ id: "2049", description: "Update us if your insurance changes." },
{ id: "2050", description: "Our billing team will contact you for unpaid bills." }

];


  const filteredVideos = adminVideos.filter((video) =>
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-4 space-y-4 bg-[#f0fdf4] min-h-screen">
        <h1 className="text-xl font-bold text-[#1a1a1a] mb-4 border-l-4 border-[#4ade80] pl-3">
          Admin And Billing Videos
        </h1>

        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-[#4ade80] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredVideos.map((video) => (
            <a
              key={video.id}
              href={`/VideoPage/${video.id}`}
              className="block border rounded-xl p-4 bg-green-100 hover:scale-[1.01]"
              >
            <h2 className="text-lg font-semibold text-black">{video.description}</h2>
            </a>

          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Admin;