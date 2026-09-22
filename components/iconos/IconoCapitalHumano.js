export default function IconoCapitalHumano({ className }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      className={className}
    >
      <circle cx="24" cy="22" r="8" strokeWidth="4" />
      <circle cx="44" cy="24" r="6" strokeWidth="4" />
      <path
        d="M10 52c0-8 6-14 14-14s14 6 14 14M40 38c7 0 14 5 14 13"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
