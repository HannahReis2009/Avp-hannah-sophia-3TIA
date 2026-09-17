export default function BrandMark() {
  return (
    <div className="brand-mark" aria-label="Nexus">
      <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
        <path d="M11 11h10v10H11z" />
        <path d="M27 11h10v10H27z" />
        <path d="M11 27h10v10H11z" />
        <path d="M27 27h10v10H27z" />
        <path className="brand-mark-line" d="m16 16 16 16M32 16 16 32" />
      </svg>
      <span>Nexus</span>
    </div>
  );
}