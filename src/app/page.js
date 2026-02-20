
export default function Home() {
  return (
    <main style={{padding:'60px 20px',maxWidth:1100,margin:'0 auto'}}>
      <h1 style={{fontSize:48,marginBottom:20}}>Run your business on one simple system.</h1>
      <p style={{fontSize:18,opacity:.8}}>Kryvexis OS combines inventory, invoicing, and purchasing into a clean workflow built for small businesses.</p>

      <div style={{marginTop:30}}>
        <button style={{padding:'14px 24px',marginRight:10,background:'#16a34a',border:'none',color:'#fff',cursor:'pointer'}}>Book Demo</button>
        <button style={{padding:'14px 24px',background:'#222',border:'1px solid #444',color:'#fff',cursor:'pointer'}}>Join Pilot</button>
      </div>

      <section style={{marginTop:80}}>
        <h2>How it works</h2>
        <ul>
          <li>Connect your stock</li>
          <li>Capture sales and invoices</li>
          <li>Create purchase orders and receive stock</li>
        </ul>
      </section>

      <section style={{marginTop:80}}>
        <h2>Core Features</h2>
        <ul>
          <li>Live inventory tracking</li>
          <li>Quotes to invoices workflow</li>
          <li>Purchase orders and GRV</li>
          <li>Dashboard and reports</li>
        </ul>
      </section>

      <footer style={{marginTop:100,opacity:.6}}>© Kryvexis</footer>
    </main>
  );
}
