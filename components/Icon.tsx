import type { IconName } from "@/data/motivos";

const paths: Record<IconName, React.ReactNode> = {
  ampulheta: (
    <>
      <path d="M6 3h12M6 21h12" />
      <path d="M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9" />
      <path d="M9.5 18.5h5" />
    </>
  ),
  calendario: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="m9 14 6 5M15 14l-6 5" />
    </>
  ),
  chama: (
    <path d="M12 22c4 0 7-2.7 7-7 0-4-3-6.5-4-10-1.5 2-2 3.5-2 5-1.5-1-2.5-3-2.5-6C7 6.5 5 10 5 15c0 4.3 3 7 7 7Z" />
  ),
  pico: (
    <>
      <path d="m2 20 7-12 4 6 3-4 6 10Z" />
      <path d="M9 8V3l4 1.5L9 6" />
    </>
  ),
  gancho: (
    <>
      <path d="M12 2v11a4 4 0 1 1-8 0v-1" />
      <path d="m2 14 2-2 2 2" />
      <circle cx="12" cy="3" r="1" />
    </>
  ),
  novato: (
    <>
      <circle cx="10" cy="8" r="4" />
      <path d="M3 21c0-4 3-7 7-7s7 3 7 7" />
      <path d="M19 7v6M16 10h6" />
    </>
  ),
  pergaminho: (
    <>
      <path d="M7 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7" />
      <path d="M7 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2 2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" />
      <path d="M12 9h5M12 13h5" />
    </>
  ),
  dado: (
    <>
      <path d="m12 2 9 5v10l-9 5-9-5V7Z" />
      <path d="m3 7 9 5 9-5M12 12v10" />
    </>
  ),
  churrasco: (
    <>
      <path d="M3 10h18a9 9 0 0 1-18 0Z" />
      <path d="m8 18-2 4M16 18l2 4" />
      <path d="M8 3c0 1.5 1 1.5 1 3M12 2c0 1.5 1 1.5 1 3M16 3c0 1.5 1 1.5 1 3" />
    </>
  ),
  pudim: (
    <>
      <path d="M7 8h10l3 11H4Z" />
      <path d="M7 8c0-2 2-3 5-3s5 1 5 3" />
      <path d="M7.5 10c1 1.2 2 1.2 3 0s2-1.2 3 0 2 1.2 3 0" />
      <path d="M2 21h20" />
    </>
  ),
  coracao: <path d="M12 20s-8-4.8-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.2-8 11-8 11Z" />,
  folha: (
    <>
      <path d="M12 3c-3 0-8 2.5-8 9 0 5 4 9 8 9s8-4 8-9" />
      <path d="M12 21c-2-3-2-7 0-9s5-2 5 1-3 4-5 3" />
    </>
  ),
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
