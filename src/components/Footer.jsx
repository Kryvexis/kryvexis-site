import Container from "./Container";

export default function Footer(){
  return (
    <footer className="border-t border-white/10 py-10">
      <Container className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="font-extrabold tracking-tight">Kryvexis</div>
          <div className="text-sm text-white/60 mt-1">Inventory • Invoicing • Purchasing</div>
          <div className="mt-3 text-sm text-white/70 space-y-1">
            <div><span className="text-white/50">Email:</span> <a className="hover:text-white" href="mailto:kryvexissolutions@gmail.com">kryvexissolutions@gmail.com</a></div>
            <div><span className="text-white/50">WhatsApp:</span> <a className="hover:text-white" href="https://wa.me/27686282874" target="_blank" rel="noreferrer">+27 68 628 2874</a></div>
          </div>
        </div>
        <div className="text-sm text-white/60">© {new Date().getFullYear()} Kryvexis. All rights reserved.</div>
      </Container>
    </footer>
  );
}
