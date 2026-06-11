import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export function FAQs() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "Do I need prior SAP experience to join?",
      answer: "No prior SAP experience is required. Our comprehensive curriculum is designed for beginners as well as professionals. We start with fundamentals and progressively build your expertise to consultant-level proficiency."
    },
    {
      id: 2,
      question: "What are the prerequisites for SAP training?",
      answer: "Basic understanding of accounting principles and business processes is helpful but not mandatory. A bachelor's degree in finance, accounting, or related field is recommended. Most importantly, you need dedication and willingness to learn."
    },
    {
      id: 3,
      question: "How long does the SAP certification process take?",
      answer: "The complete consultant track typically takes 3-4 months with live sessions and hands-on practice. The pace can be adjusted based on your learning speed and availability. Certification preparation is included in the program."
    },
    {
      id: 4,
      question: "Are there online resources available for SAP learning?",
      answer: "Yes, enrolled students get lifetime access to recorded sessions, course materials, practice environments, and exclusive community forums. We also provide regular updates on SAP S/4 HANA changes and industry trends."
    },
    {
      id: 5,
      question: "What is the average salary for SAP consultants?",
      answer: "Entry-level SAP FICO consultants in India typically earn ₹6-10 LPA. With 2-3 years of experience, this can grow to ₹12-18 LPA. Senior consultants and solution architects can earn ₹20+ LPA depending on expertise and project complexity."
    },
    {
      id: 6,
      question: "Can I specialize in a specific module of SAP?",
      answer: "Absolutely! While our consultant track covers comprehensive FICO (Finance and Controlling), you can choose to specialize in specific areas like Asset Accounting, Controlling, or Taxation based on your career goals and market demand."
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-[64px] px-[112px] max-w-[1440px] mx-auto">
      <div className="flex gap-[22px] items-start">
        {/* Left Content */}
        <div className="flex flex-col gap-[24px] w-[494px]">
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[24px] w-[419px]">
              <p className="font-['Geist:Medium',sans-serif] font-medium text-[20px] text-[#083f88] tracking-[5px] uppercase leading-[16.5px]">
                FAQs
              </p>
              <div className="font-['Geist:SemiBold',sans-serif] font-semibold text-[48px] tracking-[-1.5px] leading-[63px] whitespace-pre-wrap">
                <p className="mb-0 text-black">Questions we hear,</p>
                <p className="text-[#083f88]">before the demo.</p>
              </div>
            </div>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[20px] text-black leading-[26px]">
              Can't find the answer you're looking for? Drop us a note - a senior counsellor responds within a working day.
            </p>
          </div>
          <a
            href="#contact"
            className="font-['Geist:Bold',sans-serif] font-bold text-[24px] text-[#083f88] leading-[1.45] underline decoration-solid hover:text-[#0a4a9e] transition-colors"
          >
            Ask us anything →
          </a>
        </div>

        {/* Right - FAQ List */}
        <div className="flex flex-col gap-[16px] w-[699px]">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white border border-[#eaebf6] rounded-[8px]">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between px-[16px] py-[12px] hover:bg-[#f9f9fb] transition-colors"
              >
                <p className="font-['Geist:Medium',sans-serif] font-medium text-[20px] text-[#2d2d2d] leading-[normal] text-left">
                  {faq.question}
                </p>
                <ChevronDown
                  className={`w-[32px] h-[32px] text-[#083F88] transition-transform ${openFAQ === faq.id ? 'rotate-180' : ''}`}
                />
              </button>

              {openFAQ === faq.id && (
                <div className="px-[16px] pb-[16px] pt-[4px] animate-in slide-in-from-top-2">
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[16px] text-[#5a637b] leading-[24px]">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
