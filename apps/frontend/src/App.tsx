import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  ChevronDown,
  CircleHelp,
  LayoutDashboard,
  Search,
  Settings2,
  Sparkles,
  Star,
  Wallet,
} from 'lucide-react'
import './App.css'

const watchlist = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: '$252.29', change: '+1.42%', up: true },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: '$521.14', change: '+0.87%', up: true },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '$183.22', change: '+2.61%', up: true },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '$247.86', change: '-0.34%', up: false },
]

const marketCards = [
  { name: 'S&P 500', value: '6,728.80', change: '+0.82%', up: true },
  { name: 'NASDAQ', value: '22,941.67', change: '+1.14%', up: true },
  { name: 'DOW JONES', value: '46,472.46', change: '-0.12%', up: false },
]

const chartValues = [
  36, 42, 38, 47, 43, 51, 46, 55, 49, 57, 52, 61, 56, 64, 58, 67, 62, 72,
  65, 74, 68, 77, 70, 82, 76, 86, 79, 91, 83, 88, 78, 85, 74, 82, 76, 90,
]

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="Nexcera home">
          <span className="brand-mark">
            <Activity size={21} strokeWidth={2.5} />
          </span>
          <span>NEXCERA<span className="brand-period">.</span></span>
        </a>

        <div className="sidebar-label">WORKSPACE</div>
        <nav className="nav-list" aria-label="Main navigation">
          <a className="nav-item active" href="#dashboard">
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </a>
          <a className="nav-item" href="#markets">
            <ChartNoAxesCombined size={18} />
            <span>Markets</span>
          </a>
          <a className="nav-item" href="#watchlist">
            <Star size={18} />
            <span>Watchlist</span>
          </a>
          <a className="nav-item" href="#portfolio">
            <Wallet size={18} />
            <span>Portfolio</span>
          </a>
          <a className="nav-item" href="#predictions">
            <Sparkles size={18} />
            <span>AI Predictions</span>
            <span className="nav-badge">AI</span>
          </a>
        </nav>

        <div className="sidebar-label tools-label">PREFERENCES</div>
        <nav className="nav-list" aria-label="Preferences">
          <a className="nav-item" href="#settings">
            <Settings2 size={18} />
            <span>Settings</span>
          </a>
          <a className="nav-item" href="#help">
            <CircleHelp size={18} />
            <span>Help & support</span>
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon"><Sparkles size={17} /></div>
            <strong>Smarter investing starts here.</strong>
            <p>Explore AI-powered market insights.</p>
            <a href="#predictions">Explore predictions <span>↗</span></a>
          </div>
          <div className="profile">
            <div className="avatar">SB</div>
            <div className="profile-info">
              <strong>Demo Account</strong>
              <span>Free workspace</span>
            </div>
            <ChevronDown size={16} className="profile-chevron" />
          </div>
        </div>
      </aside>

      <main className="main-panel" id="dashboard">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>Overview</strong></div>
          <div className="topbar-actions">
            <label className="search-box">
              <Search size={17} />
              <input aria-label="Search stocks" placeholder="Search stocks..." />
              <kbd>⌘ K</kbd>
            </label>
            <button className="icon-button notification-button" aria-label="Notifications">
              <Bell size={18} />
              <span />
            </button>
            <div className="topbar-avatar">SB</div>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><span className="live-dot" /> YOUR MARKET INTELLIGENCE</div>
              <h1>Market overview<span>.</span></h1>
              <p className="subtitle">A clearer view of the market. A smarter way to move.</p>
            </div>
            <div className="date-pill"><Activity size={15} /> Demo data <span className="date-divider" /> October 24, 2026</div>
          </section>

          <section className="stats-grid" aria-label="Portfolio summary">
            <article className="stat-card">
              <div className="stat-top"><span>Portfolio value</span><span className="stat-icon"><BriefcaseBusiness size={17} /></span></div>
              <div className="stat-value">$24,680<span className="decimal">.50</span></div>
              <div className="stat-foot"><span className="positive"><ArrowUpRight size={15} /> 4.28%</span><span>vs. last month</span></div>
              <div className="mini-chart mini-chart-green"><svg viewBox="0 0 120 30" aria-hidden="true"><path d="M0 24 L12 19 L24 22 L36 12 L48 17 L60 10 L72 15 L84 5 L96 12 L108 3 L120 6" /></svg></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span>Today's return</span><span className="stat-icon"><ChartNoAxesCombined size={17} /></span></div>
              <div className="stat-value positive">+$428<span className="decimal">.32</span></div>
              <div className="stat-foot"><span className="positive"><ArrowUpRight size={15} /> 1.76%</span><span>today</span></div>
              <div className="mini-chart mini-chart-green"><svg viewBox="0 0 120 30" aria-hidden="true"><path d="M0 25 L12 22 L24 24 L36 16 L48 19 L60 11 L72 16 L84 8 L96 12 L108 3 L120 5" /></svg></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span>Watchlist</span><span className="stat-icon"><Star size={17} /></span></div>
              <div className="stat-value">12<span className="stat-unit"> stocks</span></div>
              <div className="stat-foot"><span className="neutral-dot" /> <span>4 markets tracked</span></div>
              <div className="watchlist-dots"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span>AI signal strength</span><span className="stat-icon"><Sparkles size={17} /></span></div>
              <div className="stat-value">82<span className="decimal">/100</span></div>
              <div className="stat-foot"><span className="signal-label">DEMO SIGNAL</span><span>illustrative only</span></div>
              <div className="signal-track"><span /></div>
            </article>
          </section>

          <section className="content-grid">
            <article className="panel performance-panel" id="markets">
              <div className="panel-heading">
                <div><h2>Portfolio performance</h2><p>Illustrative performance · Not live market data</p></div>
                <button className="select-button">Last 30 days <ChevronDown size={15} /></button>
              </div>
              <div className="chart-summary">
                <div><span className="chart-label">PORTFOLIO VALUE</span><div className="chart-total">$24,680.50 <span className="positive"><ArrowUpRight size={15} /> 8.42%</span></div></div>
                <div className="chart-legend"><span /> Your portfolio</div>
              </div>
              <div className="chart-wrap">
                <div className="chart-y-labels"><span>$26k</span><span>$24k</span><span>$22k</span><span>$20k</span><span>$18k</span></div>
                <svg className="performance-chart" viewBox="0 0 720 230" preserveAspectRatio="none" role="img" aria-label="Illustrative portfolio performance chart trending upward">
                  <defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#36d399" stopOpacity=".2" /><stop offset="100%" stopColor="#36d399" stopOpacity="0" /></linearGradient></defs>
                  {[15, 62, 109, 156, 203].map((y) => <line key={y} x1="0" y1={y} x2="720" y2={y} className="chart-grid-line" />)}
                  <path d={`M ${chartValues.map((v, i) => `${i * (720 / (chartValues.length - 1))} ${203 - v * 1.85}`).join(' L ')} L 720 230 L 0 230 Z`} fill="url(#chart-fill)" />
                  <path d={`M ${chartValues.map((v, i) => `${i * (720 / (chartValues.length - 1))} ${203 - v * 1.85}`).join(' L ')}`} className="chart-line" />
                </svg>
              </div>
              <div className="chart-x-labels"><span>Sep 25</span><span>Sep 30</span><span>Oct 05</span><span>Oct 10</span><span>Oct 15</span><span>Oct 24</span></div>
            </article>

            <article className="panel markets-panel">
              <div className="panel-heading"><div><h2>Market indices</h2><p>Illustrative values</p></div><button className="text-button" id="market-details">View all <span>↗</span></button></div>
              <div className="market-list">
                {marketCards.map((market) => (
                  <div className="market-row" key={market.name}>
                    <div className="market-symbol">{market.name === 'S&P 500' ? '500' : market.name === 'NASDAQ' ? 'N' : 'D'}</div>
                    <div className="market-info"><strong>{market.name}</strong><span>Market index</span></div>
                    <div className="market-numbers"><strong>{market.value}</strong><span className={market.up ? 'positive' : 'negative'}>{market.change}</span></div>
                  </div>
                ))}
              </div>
              <div className="market-note"><span className="info-mark">i</span> Sample values for interface development.</div>
            </article>
          </section>

          <section className="content-grid bottom-grid">
            <article className="panel watchlist-panel" id="watchlist">
              <div className="panel-heading"><div><h2>Your watchlist</h2><p>Stocks you're keeping an eye on</p></div><button className="text-button">View watchlist <span>↗</span></button></div>
              <div className="table-scroll">
                <table>
                  <thead><tr><th>ASSET</th><th>PRICE</th><th>24H CHANGE</th><th>TREND</th></tr></thead>
                  <tbody>
                    {watchlist.map((stock, index) => (
                      <tr key={stock.symbol}>
                        <td><div className="asset-cell"><span className={`asset-logo asset-${stock.symbol.toLowerCase()}`}>{stock.symbol.slice(0, 1)}</span><span><strong>{stock.symbol}</strong><small>{stock.name}</small></span></div></td>
                        <td className="price-cell">{stock.price}</td>
                        <td><span className={`change-pill ${stock.up ? 'change-up' : 'change-down'}`}>{stock.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{stock.change}</span></td>
                        <td><svg className={`sparkline ${stock.up ? 'spark-up' : 'spark-down'}`} viewBox="0 0 90 30" role="img" aria-label={`${stock.symbol} illustrative price trend`}><path d={`M ${[18, 24, 15, 20, 11, 16, 7, 12, 5, 9, 3, 8].map((v, i) => `${i * 8} ${index % 2 === 0 ? 28 - v : v + 2}`).join(' L ')}`} /></svg></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-disclaimer">All prices and changes shown are illustrative sample data.</div>
            </article>

            <article className="panel insights-panel" id="predictions">
              <div className="panel-heading"><div><h2>AI market insights</h2><p>Preview of the intelligence layer</p></div><span className="coming-soon"><Sparkles size={13} /> PREVIEW</span></div>
              <div className="insight-visual"><div className="insight-orbit orbit-one" /><div className="insight-orbit orbit-two" /><div className="insight-core"><Sparkles size={25} /></div><span className="orbit-node node-one" /><span className="orbit-node node-two" /><span className="orbit-node node-three" /></div>
              <h3>Signals into perspective.</h3>
              <p className="insight-description">Nexcera's future forecasting engine will help turn market data into understandable insights.</p>
              <div className="insight-tags"><span>Trend analysis</span><span>Forecasting</span><span>Risk signals</span></div>
              <div className="insight-footer"><span className="status-dot" /> AI forecasting not connected yet</div>
            </article>
          </section>

          <footer className="dashboard-footer"><span>© 2026 Nexcera</span><span><span className="footer-status" /> Prototype environment · Sample data only</span></footer>
        </div>
      </main>
    </div>
  )
}

export default App
