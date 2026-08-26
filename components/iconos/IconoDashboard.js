export default function IconoDashboard({ className }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <rect x="8" y="34" width="10" height="22" rx="2" />
      <rect x="27" y="18" width="10" height="38" rx="2" />
      <rect x="46" y="26" width="10" height="30" rx="2" />
      <path
        d="M8 12 L24 24 L34 16 L56 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="56" cy="30" r="3.5" />
    </svg>
  );
}
