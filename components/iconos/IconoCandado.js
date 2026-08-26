export default function IconoCandado({ className }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M20 28V20c0-6.6 5.4-12 12-12s12 5.4 12 12v8"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        d="M12 28h40a5 5 0 0 1 5 5v18a5 5 0 0 1-5 5H12a5 5 0 0 1-5-5V33a5 5 0 0 1 5-5zm20 8a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm-2.5 12h5v6h-5z"
      />
    </svg>
  );
}
