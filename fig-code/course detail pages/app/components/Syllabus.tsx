import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface SyllabusItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export function Syllabus() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const syllabusItems: SyllabusItem[] = [
    {
      id: '01',
      number: '01',
      title: 'SAP & ERP Fundamentals',
      description: 'Core concepts, navigation, and the SAP landscape.'
    },
    {
      id: '02',
      number: '02',
      title: 'Organizational Structure',
      description: 'Company codes, business areas, and chart of accounts.'
    },
    {
      id: '03',
      number: '03',
      title: 'Financial Accounting (FI)',
      description: 'General ledger, journal entries, and reporting.'
    },
    {
      id: '04',
      number: '04',
      title: 'Accounts Payable (AP)',
      description: 'Vendor master, invoices, and payment processing.'
    },
    {
      id: '05',
      number: '05',
      title: 'Accounts Receivable (AR)',
      description: 'Customer master, billing, and collections.'
    },
    {
      id: '06',
      number: '06',
      title: 'Asset Accounting (AA)',
      description: 'Asset lifecycle, depreciation, and reporting.'
    },
    {
      id: '07',
      number: '07',
      title: 'Controlling (CO)',
      description: 'Cost centers, profit centers, and internal orders.'
    },
    {
      id: '08',
      number: '08',
      title: 'Integration MM / SD / HR',
      description: 'End-to-end cross-module business flows.'
    },
    {
      id: '09',
      number: '09',
      title: 'Real-Time Scenarios',
      description: 'Hands-on projects mirroring live SAP environments.'
    }
  ];

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="py-[64px] px-[112px] max-w-[1440px] mx-auto">
      <div className="flex flex-col gap-[43px] items-center">
        {/* Header */}
        <div className="flex flex-col gap-[24px] text-center w-[781px]">
          <p className="font-['Geist:Medium',sans-serif] font-medium text-[20px] text-[#083f88] tracking-[5px] uppercase leading-[16.5px]">
            Curriculum
          </p>
          <p className="font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold text-[48px] text-black tracking-[-1.5px] leading-[63px]">
            Full Syllabus
          </p>
        </div>

        {/* Syllabus List */}
        <div className="flex flex-col w-full">
          {syllabusItems.map((item, index) => (
            <div
              key={item.id}
              className="border-b border-[#e3e3f2]"
            >
              <div className="grid grid-cols-[80px_1fr_96px] gap-x-[40px] gap-y-[8px] py-[20px]">
                {/* Number */}
                <div className="flex flex-col">
                  <p className="font-['Inter:Bold',sans-serif] font-bold text-[12px] text-[#5a637b] tracking-[0.6px] leading-[16px]">
                    {item.number}
                  </p>
                </div>

                {/* Title and Description */}
                <div className="flex flex-col gap-[8px]">
                  <h3 className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[30px] text-[#0b1023] tracking-[-0.75px] leading-[36px]">
                    {item.title}
                  </h3>
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[16px] text-[#5a637b] leading-[22.75px]">
                    {item.description}
                  </p>
                </div>

                {/* Toggle Button */}
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="bg-white border border-[#b1b1b1] rounded-full p-[8px] hover:bg-[#f5f5f5] transition-colors"
                    aria-label={`Toggle ${item.title}`}
                  >
                    {openItem === item.id ? (
                      <Minus className="w-[18px] h-[18px] text-[#083F88]" />
                    ) : (
                      <Plus className="w-[18px] h-[18px] text-[#083F88]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              {openItem === item.id && (
                <div className="pb-[20px] px-[120px] animate-in slide-in-from-top-2">
                  <div className="bg-[#f9f9fb] p-[24px] rounded-[12px]">
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[16px] text-[#5a637b] leading-[24px]">
                      Detailed curriculum content for {item.title} will be covered in depth during the course. This module includes hands-on exercises, real-world scenarios, and practical implementation examples.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
