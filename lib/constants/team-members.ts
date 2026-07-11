/**
 * Team / faculty profiles for `/our-team`.
 *
 * Headshot assets — upload these under `public/` (square JPEG/PNG, 480×480):
 *
 * | File                                | Person            | Size    |
 * |-------------------------------------|-------------------|---------|
 * | `/images/team/kumar-arun.jpg`       | Kumar Arun        | 480×480 |
 * | `/images/team/dipti-chheda.jpg`     | Dipti Chheda      | 480×480 |
 * | `/images/team/ganesh-narwade.jpg`   | Ganesh Narwade    | 480×480 |
 * | `/images/team/ramesh-babu-n.jpg`    | Ramesh Babu N     | 480×480 |
 * | `/images/team/sai-rani-p.jpg`       | Dr Sai Rani P     | 480×480 |
 *
 * Keep images square (1:1). Displayed at 480×480 in the profile dialog and
 * cropped with object-cover on cards. Flip `TEAM_HEADSHOTS_READY` to true
 * after the files are in place.
 */

export const TEAM_HEADSHOTS_READY = true;

export const TEAM_HEADSHOT_SIZE = {
  width: 480,
  height: 480,
} as const;

export type TeamMember = {
  id: string;
  name: string;
  credential: string;
  /** Path under `public/` — see table above. */
  imageSrc: string;
  /** Tailwind gradient used until the headshot file is uploaded. */
  placeholderGradient: string;
  bio: string[];
  workshops: string[];
};

export const teamMembers: TeamMember[] = [
  {
    id: "kumar-arun",
    name: "Kumar Arun",
    credential: "SAP FICO Expert",
    imageSrc: "/images/team/kumar-arun.jpg",
    placeholderGradient: "from-brand-navy via-[#083f88] to-brand-purple",
    bio: [
      "Certified SAP FICO Expert with 5 years of experience in training.",
      "He has commendable knowledge in problem solving and has delivered SAP S/4HANA FICO to academic institutions and corporate professionals in India, UK, Philippines, USA, Middle East, and Malaysia.",
      "Developed self-paced video tutorials on SAP S/4HANA FICO for various organisations and Learning Management Systems (LMS).",
    ],
    workshops: [],
  },
  {
    id: "dipti-chheda",
    name: "Dipti Chheda",
    credential: "CA",
    imageSrc: "/images/team/dipti-chheda.jpg",
    placeholderGradient: "from-brand-navy via-[#0a4fa8] to-brand-purple",
    bio: [
      "Dedicated and highly experienced facilitator, CA Dipti Chheda, brings over two decades of expertise to the CA and CMA fraternity.",
      "With a personable approach, conceptual teaching style, and a talent for daily motivation, she has successfully educated over 10,000 students in Hyderabad and through online platforms across India and abroad.",
      'Dipti is renowned for her unique teaching method, "Booster Notes," which empowers students to become independent question solvers over time.',
    ],
    workshops: [],
  },
  {
    id: "ganesh-narwade",
    name: "Ganesh Narwade",
    credential: "CMA",
    imageSrc: "/images/team/ganesh-narwade.jpg",
    placeholderGradient: "from-[#062f6a] via-brand-navy to-[#6d49f4]",
    bio: [
      "CMA by profession and a teacher by passion. He has explored every facet of education, from guiding students in choosing the right courses to providing in-depth subject knowledge, placement training, and enhancing negotiation skills for better career opportunities.",
      "His lectures in taxation and corporate laws in face-to-face mode and through online classes helped over 10,000 plus students to get the depth of knowledge and clear the exams with exemptions and ranks in CMA, CA and CS exams.",
      "In addition to his CMA qualification, he has earned a certificate in “Behavioral and Personal Finance” from IIT Kharagpur and in “Organizational Design and Creating Competitive Advantage” at IIM Bangalore.",
    ],
    workshops: [
      "Conceptual and Practical Aspects of GST",
      "Ultimate Resume Writing Workshop",
      "Resume Writing and Interview Preparation Workshop",
    ],
  },
  {
    id: "ramesh-babu-n",
    name: "Ramesh Babu N",
    credential: "US CMA",
    imageSrc: "/images/team/ramesh-babu-n.jpg",
    placeholderGradient: "from-brand-purple-deep via-brand-navy to-[#083f88]",
    bio: [
      "Mr. Ramesh Babu Nemani is a CMA (USA) with over 27 years of comprehensive experience across academia, professional training, research, and corporate governance.",
      "In addition to serving as an Associate Professor and senior faculty in Accounting, Financial Management, and Investment Analysis, he brings substantial boardroom exposure as an Independent Director on the boards of multiple listed companies.",
    ],
    workshops: [
      "“Build Wealth, Beat Inflation & Retire Smart” – A Workshop on Personal Finance",
    ],
  },
  {
    id: "sai-rani-p",
    name: "Dr Sai Rani P",
    credential: "PhD, MBA",
    imageSrc: "/images/team/sai-rani-p.jpg",
    placeholderGradient: "from-[#371ecb] via-[#083f88] to-[#00193b]",
    bio: [
      "HoD Finance Dept at ICBM, active member in ACBSP Accreditation Process. Published 11 articles in Scopus Journals.",
      "Panel Member in Indian Overseas Bank for recruitment of Financial Advisors, thrice. Also served as one of the members of the Steering Committee for NAAC accreditation Process.",
      "Organised 8 National Seminars and 1 International Seminar. Best Teacher in Fin Mgmt — Dewang Mehta Business School.",
    ],
    workshops: [
      "Skills Development Blueprint for Accounts & Finance Students",
      "Career Pathways and Success Strategies for Degree and Postgraduates in India (Accounts & Finance)",
    ],
  },
];
