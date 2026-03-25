// Offshore Intelligence Data — ported from GWOE (Global Workforce Optimization Engine)
// 8 countries, US baseline rates, risk profiles, scoring algorithms

const US_RATES = { L1: 65000, L2: 95000, L3: 140000, L4: 200000 };

const OFFSHORE_COUNTRIES = [
  { id:'india', name:'India', flag:'\u{1F1EE}\u{1F1F3}', region:'South Asia', tz:'UTC+5:30', ianaZone:'Asia/Kolkata',
    rates:{L1:18000,L2:28000,L3:48000,L4:75000},
    risk:{talentPool:95,english:78,infrastructure:72,ipProtection:60,politicalStability:65,culturalAlignment:68,timeZoneOverlap:25},
    strengths:['Massive talent pool','Mature IT ecosystem','Strong STEM education','Cost leader'],
    risks:['High attrition (15-25%)','Time zone gap with US','IP enforcement concerns','Quality variance across vendors'],
    bestFor:['IT Services','Data Engineering','QA/Testing','Finance & Admin','SOC Operations'] },
  { id:'philippines', name:'Philippines', flag:'\u{1F1F5}\u{1F1ED}', region:'SE Asia', tz:'UTC+8', ianaZone:'Asia/Manila',
    rates:{L1:15000,L2:24000,L3:42000,L4:68000},
    risk:{talentPool:75,english:90,infrastructure:60,ipProtection:55,politicalStability:58,culturalAlignment:82,timeZoneOverlap:20},
    strengths:['Excellent English','Strong US cultural affinity','Customer-service oriented','Cost effective'],
    risks:['Natural disaster exposure','Infrastructure gaps outside Manila','Smaller tech pool','Political volatility'],
    bestFor:['Customer Support','Content Moderation','Social Media','Copy Editing'] },
  { id:'poland', name:'Poland', flag:'\u{1F1F5}\u{1F1F1}', region:'E. Europe', tz:'UTC+1', ianaZone:'Europe/Warsaw',
    rates:{L1:32000,L2:48000,L3:72000,L4:105000},
    risk:{talentPool:70,english:75,infrastructure:85,ipProtection:88,politicalStability:78,culturalAlignment:80,timeZoneOverlap:55},
    strengths:['EU/GDPR compliance','Strong engineering culture','Good US East TZ overlap','High-quality output'],
    risks:['Higher cost than Asia','Smaller talent pool','Competitive market','Geopolitical proximity to conflict'],
    bestFor:['Software Development','Security Engineering','Data Science','DevOps'] },
  { id:'mexico', name:'Mexico', flag:'\u{1F1F2}\u{1F1FD}', region:'Latin America', tz:'UTC-6', ianaZone:'America/Mexico_City',
    rates:{L1:28000,L2:42000,L3:65000,L4:95000},
    risk:{talentPool:65,english:60,infrastructure:68,ipProtection:62,politicalStability:60,culturalAlignment:78,timeZoneOverlap:95},
    strengths:['Same US time zones','Nearshore convenience','USMCA alignment','Growing tech hubs'],
    risks:['English proficiency varies','Security concerns in some regions','Smaller senior pool','Wage inflation in tech hubs'],
    bestFor:['Front-end Dev','UX/UI Design','Finance & Admin','Real-time Collaboration'] },
  { id:'brazil', name:'Brazil', flag:'\u{1F1E7}\u{1F1F7}', region:'Latin America', tz:'UTC-3', ianaZone:'America/Sao_Paulo',
    rates:{L1:25000,L2:38000,L3:60000,L4:90000},
    risk:{talentPool:72,english:50,infrastructure:65,ipProtection:60,politicalStability:55,culturalAlignment:72,timeZoneOverlap:70},
    strengths:['Large developer community','Creative/design talent','Favorable TZ overlap','Strong fintech ecosystem'],
    risks:['English gaps','Complex labor laws','Currency volatility','Tax complexity'],
    bestFor:['Software Development','UI/UX','Data Engineering','QA Testing'] },
  { id:'vietnam', name:'Vietnam', flag:'\u{1F1FB}\u{1F1F3}', region:'SE Asia', tz:'UTC+7', ianaZone:'Asia/Ho_Chi_Minh',
    rates:{L1:14000,L2:22000,L3:38000,L4:60000},
    risk:{talentPool:68,english:55,infrastructure:58,ipProtection:48,politicalStability:72,culturalAlignment:60,timeZoneOverlap:15},
    strengths:['Rapidly growing tech sector','Very competitive costs','Young educated workforce','Government IT support'],
    risks:['English developing','IP protection immature','Limited senior talent','Infrastructure outside cities'],
    bestFor:['QA/Testing','Front-end Dev','Data Entry/Processing','ETL Maintenance'] },
  { id:'romania', name:'Romania', flag:'\u{1F1F7}\u{1F1F4}', region:'E. Europe', tz:'UTC+2', ianaZone:'Europe/Bucharest',
    rates:{L1:28000,L2:42000,L3:65000,L4:95000},
    risk:{talentPool:60,english:78,infrastructure:78,ipProtection:85,politicalStability:75,culturalAlignment:76,timeZoneOverlap:50},
    strengths:['Strong multilingual talent','EU member/GDPR','Competitive rates','Established outsourcing market'],
    risks:['Smaller talent pool','Brain drain to W. Europe','Rural infrastructure gaps','Limited L4 availability'],
    bestFor:['Software Development','Cybersecurity','Data Engineering','GRC/Compliance'] },
  { id:'colombia', name:'Colombia', flag:'\u{1F1E8}\u{1F1F4}', region:'Latin America', tz:'UTC-5', ianaZone:'America/Bogota',
    rates:{L1:22000,L2:35000,L3:55000,L4:82000},
    risk:{talentPool:58,english:52,infrastructure:62,ipProtection:58,politicalStability:55,culturalAlignment:74,timeZoneOverlap:90},
    strengths:['US Eastern time zone','Rapidly growing tech scene','Government BPO incentives','Competitive costs'],
    risks:['English varies','Smaller senior pool','Security perceptions','Infrastructure outside major cities'],
    bestFor:['Customer Support','Finance & Admin','Front-end Dev','Content Production'] },
];

// Management ratios
const MGMT_RATIOS = [
  { min:5, max:15, onshore:'1-2', roles:'Engagement Lead + Part-time PM' },
  { min:15, max:40, onshore:'2-4', roles:'Delivery Manager + Tech Lead + PM' },
  { min:40, max:100, onshore:'4-8', roles:'VMO Director + Delivery Mgrs + Tech Leads + QA Lead' },
  { min:100, max:9999, onshore:'8-15', roles:'Full VMO (Vendor Management Office)' },
];

// Provider tiers
const PROVIDERS = {
  tier1: [
    { name:'Accenture', hq:'Ireland/US', strength:'Strategy + execution', pricing:'Premium (1.3-1.5x)' },
    { name:'TCS', hq:'India', strength:'Largest workforce (~615K)', pricing:'Competitive' },
    { name:'Infosys', hq:'India', strength:'Digital transformation', pricing:'Market rate' },
    { name:'Cognizant', hq:'US/India', strength:'US-centric, healthcare/finance', pricing:'Market+' },
    { name:'Wipro', hq:'India', strength:'Infrastructure, cyber', pricing:'Competitive' },
    { name:'HCL Tech', hq:'India', strength:'Engineering R&D', pricing:'Competitive' },
  ],
  tier2: [
    { name:'EPAM Systems', strength:'Engineering excellence, E. Europe' },
    { name:'Globant', strength:'Digital/creative, LatAm' },
    { name:'Genpact', strength:'Finance & admin BPO' },
    { name:'Softtek', strength:'Nearshore LatAm specialist' },
  ],
  tier3: [
    { name:'Toptal', strength:'Vetted freelance marketplace' },
    { name:'Andela', strength:'African developer talent' },
    { name:'BairesDev', strength:'LatAm engineering' },
    { name:'Turing', strength:'AI-matched remote engineers' },
  ]
};

// Tooltips for every section
const TOOLTIPS = {
  // Dashboard
  leadCoverage: 'Available lead FTE \u00F7 demanded lead FTE. Below 0.8 is critical \u2014 the org has more initiatives than leaders to drive them.',
  carryingCapacity: 'Maximum initiatives the org can actively drive: total lead FTE \u00F7 0.25 (lead tax per initiative per quarter).',
  leadFTE: 'People who can own and drive work end-to-end: set direction, make decisions, resolve blockers. Adjusted for BAU obligations.',
  supportFTE: 'Skilled executors who deliver within defined scope but need direction from a lead to be productive. Adjusted for BAU.',
  statusDist: 'Greenlit = can execute now. Sequenced = queued for future. Constrained = blocked by lead shortage. Deferred = pushed out.',
  teamCoverage: 'Each team\'s lead FTE available \u00F7 lead FTE demanded by their assigned initiatives.',
  atRisk: 'High-value initiatives (composite score \u2265 65) that are constrained or deferred \u2014 the best candidates for investment.',
  // Teams
  teamCard: 'Click to view roster. Left border color: green = healthy (\u2265 1.0), amber = constrained (0.8-1.0), red = critical (< 0.8).',
  orgLeads: 'Total resources classified as Lead capacity across all teams.',
  orgSupport: 'Total resources classified as Support capacity across all teams.',
  orgCost: 'Sum of annual fully-loaded costs for all resources (salary + benefits + overhead).',
  avgCoverage: 'Organization-wide lead coverage ratio. The single most important capacity metric.',
  resourceFTE: 'FTE available for project work = total FTE \u00D7 (1 - BAU%). The bar shows utilization.',
  tentative: 'Dashed border = tentative classification. The confidence % shows how certain the leader is this person can operate at lead level.',
  // Portfolio
  valueScore: 'Business value score (0-100): stakeholder-assigned rating of strategic and financial value.',
  readinessScore: 'Readiness score (0-100): how prepared the initiative is to execute (requirements, funding, approvals).',
  compositeScore: 'Average of value + readiness scores. Used to prioritize which constrained initiatives to invest in first.',
  leadGap: 'Negative FTE shortfall: how much additional lead capacity is needed to greenlight this initiative.',
  // Scenarios
  leadTax: 'FTE overhead each active initiative places on lead capacity for coordination, decisions, and unblocking (~0.25 per initiative/quarter).',
  runAnalysis: 'Computes lead coverage after subtracting the lead tax from all active initiatives. Shows realistic capacity picture.',
  // Augmentation
  dailyRate: 'Fully-loaded daily cost including salary, benefits, overhead, and vendor margin. Annual = daily \u00D7 260 working days.',
  rampWeeks: 'Weeks before a new resource reaches full productivity. During ramp, effective output is ~50%.',
  // Offshore
  countryRisk: 'Risk profile scores (0-100) across 7 dimensions. Higher = better. Key factors: talent pool, English, IP protection, timezone overlap.',
  savingsCalc: 'Estimated annual savings = US cost - offshore cost. Assumes fully-loaded rates including management overhead.',
  mgmtRatio: 'Rule of thumb: 1 onshore manager per 8-12 offshore FTEs. Budget 15-20% above quoted rates for friction costs.',
  offshoreReady: 'L1/L2 roles are generally offshorable. L3/L4 roles should typically be retained for institutional knowledge and strategic judgment.',
  costRiskSlider: 'Slide left for Max Quality (conservative \u2014 retain more onshore). Slide right for Max Savings (aggressive \u2014 offshore more roles).',
};

// Utility functions
function calcSavings(usRate, countryRate, fte) {
  const us = usRate * fte, off = countryRate * fte;
  return { usCost: us, offshoreCost: off, savings: us - off, pct: usRate > 0 ? Math.round((us - off) / us * 100) : 0 };
}

function scoreCountryFit(country, level, roleName) {
  const p = country.risk; let score = 0;
  const usRate = US_RATES[level] || US_RATES.L1;
  const cRate = country.rates[level] || country.rates.L1;
  const savPct = ((usRate - cRate) / usRate) * 100;
  score += savPct * 0.3;
  score += p.talentPool * 0.15;
  const rl = (roleName || '').toLowerCase();
  const isClient = rl.includes('manager') || rl.includes('lead') || rl.includes('director');
  score += p.english * (isClient ? 0.2 : 0.1);
  const isSensitive = rl.includes('security') || rl.includes('architect') || level === 'L4';
  score += p.ipProtection * (isSensitive ? 0.2 : 0.1);
  score += p.timeZoneOverlap * 0.1;
  score += p.culturalAlignment * 0.05;
  return { score: Math.round(score), grade: score >= 70 ? 'A' : score >= 55 ? 'B' : score >= 40 ? 'C' : 'D' };
}

function getSliderRec(origRec, level, why, slider) {
  if (slider >= 40 && slider <= 60) return origRec;
  const kw = (why || '').toLowerCase();
  const sensitive = ['security','strategic','proprietary','trust','clearance','brand risk'].some(k => kw.includes(k));
  if (slider > 60) {
    const a = (slider - 60) / 40;
    if (origRec === 'N') {
      if ((level==='L1'||level==='L2') && !sensitive) return 'Y';
      if ((level==='L1'||level==='L2')) return a > 0.5 ? 'P' : 'N';
      if (level==='L3' && !sensitive && a > 0.5) return 'P';
    }
    if (origRec === 'P') { if (level==='L1'||level==='L2') return 'Y'; if (level==='L3' && a > 0.5 && !sensitive) return 'Y'; }
  }
  if (slider < 40) {
    const c = (40 - slider) / 40;
    if (origRec === 'Y') { if (level==='L3'||level==='L4') return 'N'; if (level==='L2' && c > 0.3) return 'P'; if (level==='L1' && c > 0.7) return 'P'; }
    if (origRec === 'P') { if (c > 0.5) return 'N'; }
  }
  return origRec;
}

function getMgmtRatio(offshoreFTE) {
  return MGMT_RATIOS.find(r => offshoreFTE >= r.min && offshoreFTE <= r.max) || MGMT_RATIOS[0];
}

function localTime(ianaZone) {
  try { return new Date().toLocaleTimeString('en-US', { timeZone: ianaZone, hour:'numeric', minute:'2-digit', hour12:true }); }
  catch { return ''; }
}

// Export to window for use in index.html
window.OFFSHORE = { US_RATES, OFFSHORE_COUNTRIES, MGMT_RATIOS, PROVIDERS, TOOLTIPS, calcSavings, scoreCountryFit, getSliderRec, getMgmtRatio, localTime };
