import Container from "./Container";

export default function Footer(){
  return (
    <footer className="border-t border-white/10 py-10">
      <Container className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="font-extrabold tracking-tight">Kryvexis</div>
          <div className="text-sm text-white/60 mt-1">Inventory • Invoicing • Purchasing</div>
        </div>
        <div className="text-sm text-white/60">
          © {new Date().getFullYear()} Kryvexis. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
