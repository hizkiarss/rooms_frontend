import React from "react";
import BecomeTenantHero from "./component/BecomeTenantHero";
import Cta from "./component/Cta";
import Faq from "./component/Faq";
import WhyRooms from "./component/WhyRooms";

const page = () => {
  return (
    <div>
      <BecomeTenantHero />
      <WhyRooms />
      <Faq />
      <Cta
        title="Ready to Make Your Space Work for You?"
        desc="Join us today and let your space be the place guests love to come back to."
      />
    </div>
  );
};

export default page;
