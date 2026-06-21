"use client";

import { useSiteSettings } from "@/components/layout/site-settings-context";

export function InstructorLinkedInButton() {
  const { social } = useSiteSettings();
  const href =
    social.find((profile) => profile.platform === "linkedin")?.href ??
    "#linkedin";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View LinkedIn profile"
      className="inline-flex size-[38px] shrink-0 items-center justify-center self-start rounded-lg bg-gray-400 p-2 transition-colors hover:bg-gray-500"
    >
      <svg
        className="size-[23px]"
        fill="none"
        viewBox="0 0 21.388 20.4158"
        aria-hidden
      >
        <path
          d="M14.5827 6.80528C16.1298 6.80528 17.6134 7.41984 18.7074 8.51375C19.8013 9.60767 20.4158 11.0913 20.4158 12.6384V19.4437H16.5271V12.6384C16.5271 12.1227 16.3223 11.6281 15.9576 11.2635C15.593 10.8989 15.0984 10.694 14.5827 10.694C14.0671 10.694 13.5725 10.8989 13.2079 11.2635C12.8432 11.6281 12.6384 12.1227 12.6384 12.6384V19.4437H8.74964V12.6384C8.74964 11.0913 9.3642 9.60767 10.4581 8.51375C11.552 7.41984 13.0357 6.80528 14.5827 6.80528Z"
          stroke="#F9FAFB"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.94437"
        />
        <path
          d="M4.86091 7.77746H0.972183V19.4437H4.86091V7.77746Z"
          stroke="#F9FAFB"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.94437"
        />
        <path
          d="M2.91655 4.86091C3.99039 4.86091 4.86091 3.99039 4.86091 2.91655C4.86091 1.8427 3.99039 0.972183 2.91655 0.972183C1.8427 0.972183 0.972183 1.8427 0.972183 2.91655C0.972183 3.99039 1.8427 4.86091 2.91655 4.86091Z"
          stroke="#F9FAFB"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.94437"
        />
      </svg>
    </a>
  );
}
