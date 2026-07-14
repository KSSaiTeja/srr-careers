/**
 * Default content for the Our Team page. Seeds the OurTeamPage global on first
 * run and acts as the fallback when the CMS has no value. Shapes mirror the
 * global's named tabs.
 */
export const ourTeamPageDefaults = {
  intro: {
    pageTitle: "Our Team",
    headline: "Mentors you'd love to work with",
    subtext:
      "Meet the facilitators behind SRR Careers — experienced educators and practitioners who bring real-world finance and SAP expertise into every cohort. Select a profile to learn more.",
  },
  membersSection: {
    viewProfileLabel: "View profile →",
    workshopsHeading: "Workshops",
    members: [
      {
        slug: "kumar-arun",
        name: "Kumar Arun",
        credential: "SAP FICO Expert",
        fallbackImagePath: "/images/team/kumar-arun.jpg",
        placeholderGradient:
          "from-brand-lavender via-brand-purple-light to-brand-purple",
        bio: [
          {
            text: "Certified SAP FICO Expert with 5 years of experience in training.",
          },
          {
            text: "He has commendable knowledge in problem solving and has delivered SAP S/4HANA FICO to academic institutions and corporate professionals in India, UK, Philippines, USA, Middle East, and Malaysia.",
          },
          {
            text: "Developed self-paced video tutorials on SAP S/4HANA FICO for various organisations and Learning Management Systems (LMS).",
          },
        ],
        workshops: [] as { title: string }[],
      },
      {
        slug: "dipti-chheda",
        name: "Dipti Chheda",
        credential: "CA",
        fallbackImagePath: "/images/team/dipti-chheda.jpg",
        placeholderGradient:
          "from-brand-purple-light via-brand-purple to-brand-purple-deep",
        bio: [
          {
            text: "Dedicated and highly experienced facilitator, CA Dipti Chheda, brings over two decades of expertise to the CA and CMA fraternity.",
          },
          {
            text: "With a personable approach, conceptual teaching style, and a talent for daily motivation, she has successfully educated over 10,000 students in Hyderabad and through online platforms across India and abroad.",
          },
          {
            text: 'Dipti is renowned for her unique teaching method, "Booster Notes," which empowers students to become independent question solvers over time.',
          },
        ],
        workshops: [] as { title: string }[],
      },
      {
        slug: "ganesh-narwade",
        name: "Ganesh Narwade",
        credential: "CMA",
        fallbackImagePath: "/images/team/ganesh-narwade.jpg",
        placeholderGradient:
          "from-brand-lavender via-brand-purple to-brand-purple-light",
        bio: [
          {
            text: "CMA by profession and a teacher by passion. He has explored every facet of education, from guiding students in choosing the right courses to providing in-depth subject knowledge, placement training, and enhancing negotiation skills for better career opportunities.",
          },
          {
            text: "His lectures in taxation and corporate laws in face-to-face mode and through online classes helped over 10,000 plus students to get the depth of knowledge and clear the exams with exemptions and ranks in CMA, CA and CS exams.",
          },
          {
            text: "In addition to his CMA qualification, he has earned a certificate in “Behavioral and Personal Finance” from IIT Kharagpur and in “Organizational Design and Creating Competitive Advantage” at IIM Bangalore.",
          },
        ],
        workshops: [
          { title: "Conceptual and Practical Aspects of GST" },
          { title: "Ultimate Resume Writing Workshop" },
          { title: "Resume Writing and Interview Preparation Workshop" },
        ],
      },
      {
        slug: "ramesh-babu-n",
        name: "Ramesh Babu N",
        credential: "US CMA",
        fallbackImagePath: "/images/team/ramesh-babu-n.jpg",
        placeholderGradient:
          "from-brand-purple-deep via-brand-purple to-brand-purple-light",
        bio: [
          {
            text: "Mr. Ramesh Babu Nemani is a CMA (USA) with over 27 years of comprehensive experience across academia, professional training, research, and corporate governance.",
          },
          {
            text: "In addition to serving as an Associate Professor and senior faculty in Accounting, Financial Management, and Investment Analysis, he brings substantial boardroom exposure as an Independent Director on the boards of multiple listed companies.",
          },
        ],
        workshops: [
          {
            title:
              "“Build Wealth, Beat Inflation & Retire Smart” – A Workshop on Personal Finance",
          },
        ],
      },
      {
        slug: "sai-rani-p",
        name: "Dr Sai Rani P",
        credential: "PhD, MBA",
        fallbackImagePath: "/images/team/sai-rani-p.jpg",
        placeholderGradient:
          "from-brand-purple-light via-brand-purple to-brand-purple-deep",
        bio: [
          {
            text: "HoD Finance Dept at ICBM, active member in ACBSP Accreditation Process. Published 11 articles in Scopus Journals.",
          },
          {
            text: "Panel Member in Indian Overseas Bank for recruitment of Financial Advisors, thrice. Also served as one of the members of the Steering Committee for NAAC accreditation Process.",
          },
          {
            text: "Organised 8 National Seminars and 1 International Seminar. Best Teacher in Fin Mgmt — Dewang Mehta Business School.",
          },
        ],
        workshops: [
          {
            title:
              "Skills Development Blueprint for Accounts & Finance Students",
          },
          {
            title:
              "Career Pathways and Success Strategies for Degree and Postgraduates in India (Accounts & Finance)",
          },
        ],
      },
    ],
  },
};

export type OurTeamPageDefaults = typeof ourTeamPageDefaults;
