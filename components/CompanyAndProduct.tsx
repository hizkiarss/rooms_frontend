const CompanyAndProduct: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <div className="text-[11px] mt-8 flex flex-col gap-3 md:text-[13px]">
        <p className="font-semibold text-[13px]">Company</p>
        <p>Blog</p>
        <p>Careers</p>
        <p>Affiliate</p>
        <p>Protection</p>
      </div>

      <div className="text-[11px] flex flex-col gap-3 md:text-[13px]">
        <p className="font-semibold text-[13px]">Product</p>
        <p>Hotels</p>
        <p>Apartment</p>
      </div>
    </div>
  );
};
export default CompanyAndProduct;
