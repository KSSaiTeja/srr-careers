import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  rating: number;
  text: string;
  name: string;
  role: string;
  initials: string;
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      rating: 5,
      text: '"SRR Careers gave me a rock-solid foundation in FICO. The integration with MM and SD modules clicked for me only because of how Kumar sir teaches with live data."',
      name: 'Rahul S.',
      role: 'SAP FICO Consultant',
      initials: 'RS'
    },
    {
      id: 2,
      rating: 5,
      text: '"Within 3 months I switched from core accounting to an SAP consultant role. The placement team genuinely fought for me until I landed the offer."',
      name: 'Sneha R.',
      role: 'Finance Manager',
      initials: 'SR'
    },
    {
      id: 3,
      rating: 5,
      text: '"The hands-on approach and real-world scenarios helped me transition smoothly from theory to practice. Best investment in my career so far."',
      name: 'Amit K.',
      role: 'Implementation Consultant',
      initials: 'AK'
    }
  ];

  return (
    <section className="py-[64px] px-[112px] max-w-[1440px] mx-auto">
      <div className="flex flex-col gap-[43px] items-center">
        {/* Header */}
        <div className="flex flex-col gap-[24px] text-center w-[781px]">
          <p className="font-['Geist:Medium',sans-serif] font-medium text-[20px] text-[#083f88] tracking-[5px] uppercase leading-[16.5px]">
            Testimonials
          </p>
          <div className="font-['Geist:SemiBold',sans-serif] font-semibold text-[48px] tracking-[-1.5px] leading-[63px]">
            <p className="mb-0 text-black">Stories from our</p>
            <p className="text-[#083f88]">satisfied students</p>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-3 gap-[24px] w-full">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white border border-[rgba(227,227,242,0.6)] rounded-[30px] p-[33px] flex flex-col gap-[20px] relative shadow-[0px_4px_20px_-8px_rgba(55,30,203,0.12)]"
            >
              {/* Quote Icon */}
              <Quote className="absolute right-[25px] top-[25px] w-[40px] h-[40px] text-[#371ECB] opacity-10" strokeWidth={3} />

              {/* Rating */}
              <div className="flex gap-[4px]">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-[16px] h-[16px] fill-[#FFC31A] text-[#FFC31A]" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[16px] text-[rgba(11,16,35,0.85)] leading-[26px]">
                {testimonial.text}
              </p>

              {/* Author */}
              <div className="border-t border-[#e3e3f2] pt-[25px] flex gap-[12px] items-center">
                <div
                  className="w-[44px] h-[44px] rounded-full flex items-center justify-center"
                  style={{ backgroundImage: "linear-gradient(135deg, rgb(55, 30, 203) 0%, rgb(109, 73, 244) 100%)" }}
                >
                  <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[14px] text-[#f7f8fc] leading-[20px]">
                    {testimonial.initials}
                  </p>
                </div>
                <div>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#0b1023] leading-[20px]">
                    {testimonial.name}
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#5a637b] leading-[16px]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
