export default function IconoProcedimiento({ className }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      className={className}
    >
      <rect x="14" y="10" width="36" height="48" rx="4" strokeWidth="4" />
      <path d="M24 8h16v8H24z" strokeWidth="4" strokeLinejoin="round" />
      <path
        d="M22 30l6 6 12-12M22 44h20"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
