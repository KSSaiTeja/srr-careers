import svgPaths from "./svg-f5bgrsform";
import imgUntitledDesign2752X15362 from "./9b8a2cbf0cbd293e7764ab649d902ee79cc5de1d.png";
import { imgUntitledDesign2752X15361 } from "./svg-psy7x";

function Frame() {
  return (
    <div className="bg-[#fff3da] content-stretch flex items-center justify-center px-[24px] py-[10px] relative rounded-[44px] shrink-0">
      <div aria-hidden className="absolute border border-[#ffd549] border-solid inset-0 pointer-events-none rounded-[44px]" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#7c5f00] text-[16px] text-center tracking-[2.56px] whitespace-nowrap" style={{ fontFeatureSettings: "'cv01', 'cv03', 'cv04'" }}>
        <p className="leading-[1.45]">#1 SAP FICO TRAINING INSTITUTE</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[222px] items-start px-[179px] py-[85px] relative shrink-0 w-[772px]">
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Proxima_Nova:Bold',sans-serif] justify-center leading-[0] left-1/2 not-italic text-[76.87px] text-black text-center top-[111px] whitespace-nowrap">
        <p className="font-['DM_Serif_Text:Regular',sans-serif] leading-[1.45] mb-0">Master SAP FICO with</p>
        <p className="font-['DM_Serif_Text:Italic',sans-serif] italic leading-[1.45] text-[#083f88]">S4 HANA</p>
      </div>
      <div className="absolute h-[10.461px] left-[268.25px] top-[88px] w-[320.085px]">
        <div className="absolute inset-[-17.64%_0_-42.83%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 320.425 16.786">
            <path d={svgPaths.p7dc7a80} fill="var(--stroke-0, #FFD549)" id="Vector 3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Mask group">
      <div className="col-1 h-[641px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[1672px_641px] ml-0 mt-0 relative row-1 w-[1672px]" style={{ maskImage: `url('${imgUntitledDesign2752X15361}')` }} data-name="Untitled Design 2752x1536 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[145.59%] left-0 max-w-none top-[-45.53%] w-full" src={imgUntitledDesign2752X15362} />
        </div>
      </div>
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[34px] items-center relative size-full">
      <Frame />
      <Frame1 />
      <MaskGroup />
    </div>
  );
}