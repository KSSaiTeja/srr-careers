import { Star, CircleCheck } from 'lucide-react';

export function WhoIsItFor() {
  const audience = [
    "Finance graduates targeting an SAP consulting career",
    "Working CAs, CMAs and finance professionals",
    "SAP end-users moving into a consultant role",
    "Support consultants stepping into implementation"
  ];

  const features = [
    "Full configuration on S/4 HANA (Incl. ECC vs S/4 HANA differences)",
    "GST & TDS configuration + posting",
    "Asset According end-to-end with AUC capitalisation"
  ];

  return (
    <section className="py-[64px] px-[112px] max-w-[1440px] mx-auto">
      <div className="flex gap-[29px] items-center">
        {/* Left Content */}
        <div className="flex flex-col gap-[56px] w-[726px]">
          <div className="flex flex-col gap-[24px]">
            <p className="font-['Geist:Medium',sans-serif] font-medium text-[20px] text-[#083f88] tracking-[5px] uppercase leading-[16.5px]">
              who is it for
            </p>
            <div className="font-['Geist:SemiBold',sans-serif] font-semibold text-[48px] text-black tracking-[-1.5px] leading-[63px]">
              Designed for serious <span className="text-[#083f88]">learners.</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-[24px]">
            {audience.map((item, index) => (
              <div key={index} className="bg-white flex gap-[12px] items-center px-[16px] py-[12px] rounded-[16px] border border-[#dfdfdf]">
                <Star className="w-[18px] h-[18px] text-[#083f88] fill-[#083f88]" />
                <p className="font-['Geist:Medium',sans-serif] font-medium text-[20px] text-black leading-[normal] w-[289px]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card - Hands-on */}
        <div className="bg-[#0b1023] flex flex-col h-[336px] px-[32px] py-[24px] rounded-[16px] w-[461px]">
          <div className="flex flex-col gap-[24px]">
            <div className="text-white">
              <p className="font-['Geist:SemiBold',sans-serif] font-semibold text-[32px] tracking-[-1.5px] leading-[63px]">
                Hands-on with real systems.
              </p>
              <p className="font-['Geist:Regular',sans-serif] font-normal text-[16px] leading-[normal] w-[394px]">
                End-to-end SAP S/4 HANA Finance & Controlling configuration.
              </p>
            </div>

            <div className="flex flex-col gap-[16px]">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-[8px] items-center">
                  <CircleCheck className="w-[20px] h-[20px] text-[#FFC31A]" strokeWidth={2} />
                  <p className="font-['Geist:Regular',sans-serif] font-normal text-[16px] text-[#e3e3f2] leading-[normal] max-w-[370px]">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
