interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "SHOP",
    links: [
      { label: "New Arrivals", href: "#" },
      { label: "Collections", href: "#collections" },
      { label: "Sale", href: "#" },
      { label: "Lookbook", href: "#lookbook" },
    ],
  },
  {
    title: "INFO",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Sizing Guide", href: "#" },
      { label: "Shipping Policy", href: "#" },
      { label: "Returns", href: "#" },
    ],
  },
  {
    title: "FOLLOW",
    links: [
      { label: "Instagram", href: "#" },
      { label: "TikTok", href: "#" },
      { label: "Tokopedia", href: "#" },
      { label: "Shopee", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t-[3px] border-acid bg-ink">
      {/* Main zone */}
      <div className="grid grid-cols-1 gap-12 px-6 py-16 sm:grid-cols-2 md:grid-cols-4 md:px-16">
        {/* Brand */}
        <div>
          <div
            className="font-display leading-[0.9] text-acid"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "4px" }}
          >
            <span className="block">BRUTAL</span>
            <span className="block">COUTURE</span>
          </div>
          <div
            className="mt-5 space-y-1 font-mono text-xs"
            style={{ color: "var(--muted)" }}
          >
            <p>Independent fashion label.</p>
            <p>Melbourne, Australia.</p>
            <p>Est. 2021.</p>
          </div>
          <p className="mt-4 font-mono" style={{ fontSize: 9, color: "#555555" }}>
            hello@brutalcouture.id
          </p>
        </div>

        {/* Link columns */}
        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-acid">
              {column.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-mono text-xs text-[#888888] transition-colors duration-200 hover:text-acid"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom strip */}
      <div className="flex flex-col items-center justify-between gap-3 border-t-[3px] border-[#1A1A1A] px-6 py-5 md:flex-row md:px-16">
        <p className="font-mono" style={{ fontSize: 9, color: "#333333" }}>
          © 2025 BRUTAL COUTURE. ALL RIGHTS RESERVED.
        </p>
        <p className="font-mono text-acid" style={{ fontSize: 9, opacity: 0.35 }}>
          NO RULES. ONLY VIBES. ✦
        </p>
      </div>
    </footer>
  );
}
