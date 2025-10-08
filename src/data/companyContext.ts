export const COMPANY_CONTEXT = {
  // Company Overview
  name: "Premier Properties Group",
  established: "2010",
  headquarters: "Downtown Miami, FL",
  type: "Full-Service Real Estate Agency",

  // Mission & Values
  mission: "To provide exceptional real estate services that exceed client expectations while building lasting relationships in our community.",
  values: [
    "Integrity in every transaction",
    "Client-first approach",
    "Market expertise and transparency",
    "Innovation in real estate technology",
    "Community commitment"
  ],

  // Services
  services: {
    residential: {
      buying: "First-time buyers to luxury estates",
      selling: "Comprehensive marketing and staging services",
      rentals: "Property management and tenant placement",
      investment: "Investment property analysis and acquisition"
    },
    commercial: {
      office: "Office space leasing and sales",
      retail: "Retail property development and leasing",
      industrial: "Warehouse and industrial property services",
      development: "Commercial development consulting"
    },
    specialties: [
      "Luxury waterfront properties",
      "Historic home restoration sales",
      "New construction partnerships",
      "International buyer services"
    ]
  },

  // Market Areas
  serviceAreas: [
    "Downtown Miami",
    "South Beach",
    "Coral Gables",
    "Coconut Grove",
    "Brickell",
    "Key Biscayne",
    "Aventura",
    "Fort Lauderdale"
  ],

  // Team
  team: {
    totalAgents: 45,
    seniorAgents: 12,
    languages: ["English", "Spanish", "Portuguese", "French"],
    certifications: [
      "Certified Residential Specialist (CRS)",
      "Accredited Buyer's Representative (ABR)",
      "Seniors Real Estate Specialist (SRES)",
      "Certified International Property Specialist (CIPS)"
    ]
  },

  // Performance Metrics
  metrics: {
    annualSales: "$285M",
    transactionsPerYear: 650,
    averageDaysOnMarket: 28,
    clientSatisfactionRate: "98%",
    repeatClientRate: "45%",
    referralRate: "62%"
  },

  // Technology & Tools
  technology: {
    mls: "Miami Association of Realtors MLS",
    crm: "Top Producer CRM",
    virtualTours: "Matterport 3D tours",
    marketing: "Professional photography, drone footage, social media marketing",
    tools: ["Market analysis software", "Automated pricing models", "Digital document signing"]
  },

  // Recent Achievements
  achievements: [
    "Top Real Estate Agency in Miami-Dade County 2023",
    "Best Customer Service Award - Miami Real Estate Board 2022",
    "$200M+ in luxury property sales 2023",
    "Expanded to Fort Lauderdale market 2023",
    "Launched virtual reality property tours 2022"
  ],

  // Market Insights
  marketData: {
    averageHomePrice: "$575,000",
    marketTrend: "Stable with 3% YoY growth",
    hotNeighborhoods: ["Brickell", "Wynwood", "Design District"],
    luxuryMarket: "Waterfront condos averaging $2.1M",
    rentals: "Average rent $3,200/month for 2BR",
    investmentROI: "6-8% annual return for rental properties"
  },

  // Contact Information
  contact: {
    phone: "(305) 555-REAL",
    email: "info@premierpropertiesgroup.com",
    website: "www.premierpropertiesgroup.com",
    address: "500 Brickell Avenue, Suite 1200, Miami, FL 33131",
    hours: "Monday-Saturday 9AM-7PM, Sunday 11AM-5PM",
    emergencyLine: "(305) 555-HELP"
  },

  // FAQ Data
  faq: [
    {
      question: "What areas do you serve?",
      answer: "We serve all of Miami-Dade County with particular expertise in luxury markets like South Beach, Coral Gables, and Brickell."
    },
    {
      question: "How long does it typically take to sell a home?",
      answer: "Our average days on market is 28 days, significantly faster than the county average of 45 days."
    },
    {
      question: "Do you help with international buyers?",
      answer: "Yes, we have certified international property specialists and agents who speak multiple languages."
    },
    {
      question: "What commission do you charge?",
      answer: "Our commission structure is competitive and varies based on property type and services needed. We'd be happy to discuss this during a consultation."
    },
    {
      question: "Do you offer property management services?",
      answer: "Yes, we offer full property management services including tenant screening, rent collection, and maintenance coordination."
    }
  ]
};

export const getCompanyInsight = (query: string): string => {
  const lowerQuery = query.toLowerCase();

  // Simple keyword matching for insights
  if (lowerQuery.includes('market') || lowerQuery.includes('price')) {
    return `Based on our market data: Average home price in our service area is ${COMPANY_CONTEXT.marketData.averageHomePrice} with ${COMPANY_CONTEXT.marketData.marketTrend}. Our hottest neighborhoods are ${COMPANY_CONTEXT.marketData.hotNeighborhoods.join(', ')}.`;
  }

  if (lowerQuery.includes('service') || lowerQuery.includes('area')) {
    return `We serve ${COMPANY_CONTEXT.serviceAreas.length} areas including ${COMPANY_CONTEXT.serviceAreas.slice(0, 3).join(', ')} and more throughout Miami-Dade County.`;
  }

  if (lowerQuery.includes('performance') || lowerQuery.includes('stats')) {
    return `Our performance highlights: ${COMPANY_CONTEXT.metrics.annualSales} in annual sales, ${COMPANY_CONTEXT.metrics.transactionsPerYear} transactions per year, and ${COMPANY_CONTEXT.metrics.clientSatisfactionRate} client satisfaction rate.`;
  }

  if (lowerQuery.includes('team') || lowerQuery.includes('agent')) {
    return `Our team consists of ${COMPANY_CONTEXT.team.totalAgents} agents with ${COMPANY_CONTEXT.team.seniorAgents} senior specialists. We speak ${COMPANY_CONTEXT.team.languages.join(', ')} to serve our diverse community.`;
  }

  return `I'm here to help with insights about ${COMPANY_CONTEXT.name}. You can ask about our services, market data, team, or performance metrics.`;
};