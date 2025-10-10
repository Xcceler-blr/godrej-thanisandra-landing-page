import React, { useEffect } from "react";

const sectionClass = "mb-8";
const headingClass = "text-2xl md:text-3xl font-bold mb-4 text-primary";
const subheadingClass = "text-xl font-semibold mb-2 text-secondary";
const paragraphClass = "text-base md:text-lg text-muted-foreground mb-4";
const listClass = "list-disc pl-6 mb-4 text-base md:text-lg text-muted-foreground";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | Godrej Thanisandra";
    const metaDescription = document.querySelector('meta[name="description"]');
    const content = "Privacy Policy for Godrej Thanisandra - Learn about our data collection, usage, and protection practices for your personal information.";
    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, []);

  return (
  <div className="min-h-screen bg-background py-12 px-4 md:px-0 flex justify-center">
    <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary text-center">Privacy Policy</h1>
      <div className={sectionClass}>
        <p className={paragraphClass}>
          Metro Experts a Real Estate Regulatory Authority (“RERA”) Registered Agent bearing RERA No: AGENT RERA:PRM/KA/RERA/1251/446/AG/171011/001148. We prioritize your privacy. Our concise Privacy Policy outlines the personal information we collect through our website, including sub-domains and microsites, the purposes of collection we may share it with, and security measures in place. It also informs you about your rights, choices, and how to contact us regarding privacy concerns. We highly recommend reading this Privacy Policy before using services and/or providing personal information.
        </p>
      </div>
      <div className={sectionClass}>
        <h2 className={headingClass}>Interpretations and Definitions</h2>
        <ul className={listClass}>
          <li><b>Data</b> shall mean personal information, including sensitive personal information and special category personal data (as defined under Data Protection Laws) about you, which we collect, receive, or otherwise process in connection with your use of our website and/or the Platform.</li>
          <li><b>Data Protection Laws</b> shall mean any applicable law for the time being in force relating to the processing of Data.</li>
          <li><b>Service Providers</b> includes entities which provide services to and to whom we may disclose your Data for a specific purpose pursuant to a written contract.</li>
          <li><b>Narayanan Rajesh/We</b> shall mean Narayanan Rajesh, and its subsidiaries, affiliates and associate companies.</li>
          <li><b>User or You</b> shall mean the natural person who accesses our website/pages or Platform.</li>
        </ul>
      </div>
      <div className={sectionClass}>
        <h2 className={headingClass}>Website Content Overview</h2>
        <p className={paragraphClass}>
          The contents of this landing page, containing details of properties, property photos, costs, and availability, are provided for informational and illustrative purposes only. This information is subject to change at any time. Users are hereby advised that the actual properties may differ from what is shown in photos and cost on the website and pages, and as such, no claims shall be entertained based on such representations.
        </p>
        <h3 className={subheadingClass}>Uses of Developer Information</h3>
        <p className={paragraphClass}>
          All images, cost descriptions, logos, and other project materials featured on this landing page are presented in accordance with the respective project developer or its licensors. We are in legal agreements and established legal relationships with the said respective developer, thereby possessing the authority to advertise, market for sale, and generate leads for the respective project.
        </p>
      </div>
      <div className={sectionClass}>
        <h2 className={headingClass}>Types of Data Collected</h2>
        <h3 className={subheadingClass}>Personal Data</h3>
        <p className={paragraphClass}>
          While visiting to this website, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
        </p>
        <ul className={listClass}>
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Phone number</li>
          <li>Address, State, Province, ZIP/Postal code, City</li>
        </ul>
        <p className={paragraphClass}>
          We may use Personal Data for the following purposes:
        </p>
        <ul className={listClass}>
          <li>To provide and maintain our Service, including to monitor the usage of our Service.</li>
          <li>To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication.</li>
          <li>To provide Information related to the property’s sale, purchase etc. with, special offers and general information about properties, real estate services which we offer that are similar to those that you have already purchased or enquired about.</li>
          <li>To manage Your requests: To attend and manage Your requests to Us.</li>
        </ul>
        <p className={paragraphClass}>
          We may share Your personal information in the following situations:
        </p>
        <ul className={listClass}>
          <li>With Affiliates: We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our associates and any other subsidiaries, that We control or that are under common control with Us.</li>
          <li>With Authorized Developers: We may disclose Your personal information with Real Estate Regulatory Authority (RERA) registered Developers for further processing as necessary.</li>
          <li>With Your consent: We may disclose Your personal information for any other purpose with Your consent.</li>
        </ul>
      </div>
      <div className={sectionClass}>
        <h2 className={headingClass}>Retention of Your Personal Data</h2>
        <p className={paragraphClass}>
          We shall retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws).
        </p>
      </div>
      <div className={sectionClass}>
        <h2 className={headingClass}>Disclosure of Your Personal Data</h2>
        <h3 className={subheadingClass}>User's Consent</h3>
        <p className={paragraphClass}>
          By using the Website/Landing Page and/or by providing information to Us through this Website/Landing Page, the User consents to the collection and use of the information disclosed by the User on the Website in accordance with this Privacy Policy.
        </p>
        <h3 className={subheadingClass}>Law Enforcement</h3>
        <p className={paragraphClass}>
          Under certain circumstances, the We may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).
        </p>
        <h3 className={subheadingClass}>Other Legal Requirements</h3>
        <p className={paragraphClass}>
          The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:
        </p>
        <ul className={listClass}>
          <li>Comply with a legal obligation.</li>
          <li>Prevent or investigate possible wrongdoing in connection with the Service.</li>
          <li>Protect the personal safety of Users of the Service or the public.</li>
          <li>Protect against legal liability.</li>
        </ul>
      </div>
      <div className={sectionClass}>
        <h2 className={headingClass}>Security of Your Personal Data</h2>
        <p className={paragraphClass}>
          The security of Your Personal Data is important to Us but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, we cannot guarantee its absolute security.
        </p>
      </div>
      <div className={sectionClass}>
        <h2 className={headingClass}>Children's Privacy</h2>
        <p className={paragraphClass}>
          Our Service does not address anyone under the age of 18. We do not knowingly collect personally identifiable information from anyone under the age of 18. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 18 without verification of parental consent, we take steps to remove that information from Our servers.
        </p>
      </div>
      <div className={sectionClass}>
        <h2 className={headingClass}>Changes to This Privacy Policy</h2>
        <p className={paragraphClass}>
          We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </p>
      </div>
      <div className={sectionClass}>
        <h2 className={headingClass}>Contact Us</h2>
        <p className={paragraphClass}>
          To request to review, update, or delete your personal information or to otherwise reach us, please submit a request by contacting us Directly Through The Provided Contact Information On This Website.
        </p>
      </div>
    </div>
  </div>
  );
};

export default PrivacyPolicy; 