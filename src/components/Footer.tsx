import React from "react";

const Footer = () => (
  <footer style={{ background: '#3b3b3b' }} className="w-full py-6 flex justify-center items-center">
    <div className="text-white text-[10px] text-center max-w-2xl px-4">
      <div>Marketed by authorized channel partner</div>
      <div className="mt-2">
        Disclaimer : The content is for information purposes only and does not constitute an offer to avail of any service. Prices mentioned are subject to change without notice and properties mentioned are subject to availability. Images for representation purposes only. This is the official website of authorized marketing partner. We may share data with RERA registered brokers/companies for further processing. We may also send updates to the mobile number/email id registered with us. All Rights Reserved. AGENT RERA:PRM/KA/RERA/1251/446/AG/171011/001148
      </div>
      <div className="mt-4 text-xs font-semibold tracking-widest text-gray-300">
        Powered by <a href="https://xcceler.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">XCCELER</a>
      </div>
    </div>
  </footer>
);

export default Footer; 