export default function ShinyText({ children, className = "" }) {
  return (
    <span
      className={`inline-flex bg-[linear-gradient(110deg,#a1a1aa_0%,#ffffff_42%,#d4d4d8_58%,#a1a1aa_100%)] bg-[length:220%_100%] bg-clip-text text-transparent motion-safe:animate-shine ${className}`}
    >
      {children}
    </span>
  );
}
