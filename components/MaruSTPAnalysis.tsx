'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Target, Users, TrendingUp, DollarSign, MapPin, Briefcase, Zap } from 'lucide-react';

const MaruSTPAnalysis = () => {
  const [activeTab, setActiveTab] = useState('segmentation');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const segmentationCriteria = {
    firmographic: {
      title: "Firmographic Segmentation",
      icon: <Briefcase className="w-5 h-5" />,
      description: "Company characteristics and structure",
      variables: [
        {
          name: "Company Size (by Revenue)",
          segments: [
            { name: "Micro SMEs", detail: "R0 - R5 million turnover, 1-10 employees", characteristics: "Limited budget, owner-managed, basic marketing needs" },
            { name: "Small SMEs", detail: "R5 - R20 million turnover, 11-50 employees", characteristics: "Growing budget, emerging marketing function, seeking cost-effective solutions" },
            { name: "Medium SMEs", detail: "R20 - R100 million turnover, 51-200 employees", characteristics: "Established budget, marketing person/team, need strategic support" }
          ]
        },
        {
          name: "Industry Sector",
          segments: [
            { name: "Professional Services", detail: "Legal, accounting, consulting, financial advisory", characteristics: "B2B focused, reputation-driven, long sales cycles" },
            { name: "Retail & E-commerce", detail: "Online/offline retailers, D2C brands", characteristics: "High marketing intensity, conversion-focused, seasonal" },
            { name: "Technology & SaaS", detail: "Software, tech startups, digital services", characteristics: "Early adopters, growth-focused, digital-native" },
            { name: "Healthcare & Wellness", detail: "Private clinics, wellness centers, medical services", characteristics: "Regulatory constraints, trust-based, local focus" },
            { name: "Hospitality & Tourism", detail: "Hotels, restaurants, tour operators", characteristics: "Experience-driven, visual content, review-sensitive" },
            { name: "Manufacturing & Trade", detail: "Production, distribution, B2B supply", characteristics: "Traditional, relationship-based, education needed" }
          ]
        },
        {
          name: "Business Age",
          segments: [
            { name: "Startups", detail: "0-2 years", characteristics: "Limited track record, high growth ambition, budget-conscious" },
            { name: "Growth Stage", detail: "3-5 years", characteristics: "Proven model, scaling needs, ready to invest" },
            { name: "Established", detail: "6+ years", characteristics: "Stable operations, replacement/upgrade buyers, risk-averse" }
          ]
        }
      ]
    },
    geographic: {
      title: "Geographic Segmentation",
      icon: <MapPin className="w-5 h-5" />,
      description: "Location-based market divisions",
      variables: [
        {
          name: "Provincial Markets",
          segments: [
            { name: "Gauteng", detail: "Johannesburg, Pretoria, East Rand", characteristics: "60% of SA SME market, highly competitive, sophisticated buyers, diverse industries" },
            { name: "Western Cape", detail: "Cape Town, Stellenbosch, Garden Route", characteristics: "Tourism, tech, creative sectors strong, quality-focused, international outlook" },
            { name: "KwaZulu-Natal", detail: "Durban, Pietermaritzburg", characteristics: "Trade and manufacturing hub, growing tech sector, price-sensitive" },
            { name: "Other Provinces", detail: "Eastern Cape, Free State, Northern regions", characteristics: "Emerging markets, limited competition, education needed, relationship-driven" }
          ]
        },
        {
          name: "Urban vs Suburban",
          segments: [
            { name: "Urban Core", detail: "CBD, business districts", characteristics: "Professional services, high-rent, competitive, sophisticated" },
            { name: "Suburban Hubs", detail: "Industrial parks, business parks", characteristics: "Manufacturing, trade, practical focus, value-conscious" },
            { name: "Township Enterprises", detail: "Emerging business areas", characteristics: "High growth potential, community-focused, affordable solutions needed" }
          ]
        }
      ]
    },
    behavioral: {
      title: "Behavioral Segmentation",
      icon: <TrendingUp className="w-5 h-5" />,
      description: "Marketing behavior and purchasing patterns",
      variables: [
        {
          name: "Marketing Maturity",
          segments: [
            { name: "Marketing Novices", detail: "No formal marketing, ad-hoc activities", characteristics: "Need education, basic services, hands-on support, low initial budget" },
            { name: "DIY Marketers", detail: "Owner/staff doing marketing, using basic tools", characteristics: "Recognize need but lack expertise, seeking guidance + execution, ready to invest" },
            { name: "Marketing-Aware", detail: "Dedicated marketing person/budget, used agencies before", characteristics: "Understand value, seeking better ROI, cost-quality balance important" }
          ]
        },
        {
          name: "Digital Presence",
          segments: [
            { name: "Digital Beginners", detail: "Basic/no website, limited social media", characteristics: "Foundation building needed, high education requirement, step-by-step approach" },
            { name: "Digital Established", detail: "Website + social presence, some campaigns", characteristics: "Optimization focus, multi-channel needs, performance-driven" },
            { name: "Digital Advanced", detail: "Sophisticated digital footprint, data-driven", characteristics: "Strategic support, advanced tactics, integration needs" }
          ]
        },
        {
          name: "Budget Allocation",
          segments: [
            { name: "Minimal Spenders", detail: "< R5,000/month marketing budget", characteristics: "Project-based, DIY + selective outsourcing, price-sensitive" },
            { name: "Moderate Spenders", detail: "R5,000 - R25,000/month", characteristics: "Retainer potential, consistent needs, value-focused" },
            { name: "Substantial Spenders", detail: "> R25,000/month", characteristics: "Strategic partnership potential, comprehensive services, results-focused" }
          ]
        }
      ]
    },
    psychographic: {
      title: "Psychographic Segmentation",
      icon: <Zap className="w-5 h-5" />,
      description: "Attitudes, values, and motivations",
      variables: [
        {
          name: "Technology Adoption",
          segments: [
            { name: "Innovators", detail: "Early adopters, tech-forward", characteristics: "Excited by AI, willing to experiment, value innovation" },
            { name: "Pragmatists", detail: "Adopt when proven, need-driven", characteristics: "Show me the ROI, case studies important, practical focus" },
            { name: "Traditionalists", detail: "Prefer proven methods, skeptical of new tech", characteristics: "Need education, relationship-building critical, slow decision process" }
          ]
        },
        {
          name: "Growth Orientation",
          segments: [
            { name: "High-Growth Seekers", detail: "Aggressive expansion plans", characteristics: "Willing to invest, marketing as growth driver, speed important" },
            { name: "Steady Growers", detail: "Sustainable, measured growth", characteristics: "Long-term view, consistent investment, strategic approach" },
            { name: "Lifestyle Businesses", detail: "Maintain current size/income", characteristics: "Efficiency focus, maintain visibility, limited budget growth" }
          ]
        },
        {
          name: "Decision-Making Style",
          segments: [
            { name: "Data-Driven", detail: "Analytics-focused, KPI-oriented", characteristics: "Need reporting, metrics-driven, transparency essential" },
            { name: "Relationship-Driven", detail: "Trust and partnership focused", characteristics: "Personal connection important, communication key, consultative approach" },
            { name: "Price-Driven", detail: "Cost as primary factor", characteristics: "Competitive quotes needed, value demonstration critical, risk of churn" }
          ]
        }
      ]
    }
  };

  const targetSegments = [
    {
      name: "Sweet Spot Segment",
      priority: "PRIMARY TARGET",
      profile: {
        size: "Small to Medium SMEs",
        revenue: "R5M - R50M annual turnover",
        employees: "10-100 employees",
        industries: "Professional Services, Tech/SaaS, E-commerce, Healthcare",
        geography: "Gauteng & Western Cape (urban hubs)",
        maturity: "DIY Marketers moving to Marketing-Aware",
        digital: "Digital Established",
        budget: "R10,000 - R30,000/month",
        psychographic: "Pragmatists to Innovators, Growth-focused, Data + Relationship driven"
      },
      attractiveness: {
        size: "High - Estimated 25,000-35,000 businesses in SA",
        growth: "High - 15-20% annual growth in digital marketing spend",
        profitability: "High - Strong margins possible with AI efficiency",
        accessibility: "High - Active online, attend events, join associations",
        competition: "Medium - Underserved vs traditional agencies",
        fitWithOffering: "Excellent - Perfect for AI-powered, cost-effective solutions"
      },
      rationale: [
        "Sufficient budget to be profitable but priced out of traditional agencies",
        "Understand marketing value but need expertise + execution",
        "Open to AI/technology as competitive advantage",
        "Ready to commit to ongoing relationships/retainers",
        "Concentrated in accessible markets (Gauteng/WC)",
        "High volume potential for scalable AI-powered service model"
      ]
    },
    {
      name: "Secondary Segment: Digital Beginners",
      priority: "SECONDARY TARGET",
      profile: {
        size: "Micro to Small SMEs",
        revenue: "R2M - R15M annual turnover",
        employees: "5-30 employees",
        industries: "Retail, Hospitality, Professional Services, Healthcare",
        geography: "All provinces, suburban + township enterprises",
        maturity: "Marketing Novices to Early DIY",
        digital: "Digital Beginners to Early Established",
        budget: "R5,000 - R15,000/month",
        psychographic: "Pragmatists to Traditionalists, Growth-focused, Relationship-driven"
      },
      attractiveness: {
        size: "Very High - Estimated 100,000+ businesses",
        growth: "High - Digitalizing rapidly post-COVID",
        profitability: "Medium - Lower margins but volume potential",
        accessibility: "Medium - Require more education and relationship building",
        competition: "Low - Often underserved or using freelancers",
        fitWithOffering: "Good - Standardized packages suit their needs"
      },
      rationale: [
        "Large untapped market with significant need",
        "Standardized, AI-powered solutions can serve efficiently",
        "Entry point for long-term relationship as they grow",
        "Lower competition from traditional agencies",
        "Geographic diversification opportunity",
        "Can be served profitably with productized service offerings"
      ]
    },
    {
      name: "Opportunistic Segment: Corporate Spinouts",
      priority: "TERTIARY TARGET",
      profile: {
        size: "Medium SMEs",
        revenue: "R20M - R100M annual turnover",
        employees: "50-200 employees",
        industries: "All sectors - former corporate divisions",
        geography: "Gauteng primarily",
        maturity: "Marketing-Aware (but transitioning)",
        digital: "Digital Advanced",
        budget: "R25,000 - R75,000/month",
        psychographic: "Innovators/Pragmatists, High-growth, Data-driven"
      },
      attractiveness: {
        size: "Low - Small but growing segment",
        growth: "Medium - Steady stream of new spinouts",
        profitability: "Very High - Larger budgets, sophisticated needs",
        accessibility: "High - Professional networks, active seekers",
        competition: "High - Compete with traditional agencies",
        fitWithOffering: "Good - Value AI efficiency + cost vs big agencies"
      },
      rationale: [
        "High value clients when won",
        "Appreciate AI-driven efficiency from corporate backgrounds",
        "Need agency-level work at SME-appropriate pricing",
        "Typically have urgent needs (quick decision cycles)",
        "Reference clients for credibility building"
      ]
    }
  ];

  const positioning = {
    primary: {
      segment: "Sweet Spot Segment",
      positioning: "AI-Powered Marketing Partner for Growing SMEs",
      statement: "Maru Online delivers agency-quality marketing services at SME-friendly prices through AI-powered efficiency, empowering South African growth businesses to compete with larger competitors without breaking the bank.",
      differentiators: [
        {
          factor: "Product",
          strategy: "Full-service offering (strategy, creative, digital, analytics) powered by AI",
          details: "Unlike freelancers: comprehensive service. Unlike big agencies: AI efficiency reduces costs"
        },
        {
          factor: "Price",
          strategy: "30-50% below traditional agency pricing, transparent packages",
          details: "Entry packages from R9,995/month, no setup fees, monthly rolling contracts"
        },
        {
          factor: "Place",
          strategy: "Digital-first delivery with strategic in-person for key clients",
          details: "Nationwide service, Gauteng/WC office presence, online onboarding"
        },
        {
          factor: "Promotion",
          strategy: "Content marketing, strategic partnerships, referral program",
          details: "Demonstrate AI value through content, partner with SME associations, leverage satisfied clients"
        }
      ],
      competitiveAdvantage: [
        "AI-Powered Efficiency: 40% faster delivery, 30% lower costs than traditional agencies",
        "SME Specialization: Deep understanding of SME constraints, challenges, and opportunities",
        "Flexible Engagement: Monthly packages, no long-term lock-ins, scale up/down easily",
        "Data-Driven Results: Real-time dashboards, transparent reporting, continuous optimization",
        "Local Expertise: South African market knowledge, cultural relevance, timezone alignment"
      ],
      keyMessages: {
        functional: "Agency-quality marketing at prices SMEs can afford",
        emotional: "Finally, marketing that helps you compete with the big players",
        positioning: "The AI-powered marketing agency built specifically for growing South African businesses"
      }
    },
    secondary: {
      segment: "Digital Beginners",
      positioning: "Your Digital Marketing Foundation Builder",
      statement: "Maru Online helps South African SMEs build a solid digital marketing foundation through guided, affordable packages that educate while delivering results.",
      differentiators: [
        {
          factor: "Product",
          strategy: "Productized starter packages, educational approach",
          details: "Foundation Package: Website + Google My Business + Social Setup + Basic SEO"
        },
        {
          factor: "Price",
          strategy: "Entry-level pricing, payment plans available",
          details: "Starter packages from R4,995/month, project options available"
        },
        {
          factor: "Place",
          strategy: "Digital delivery with educational content",
          details: "Video tutorials, monthly check-ins, self-service portal"
        },
        {
          factor: "Promotion",
          strategy: "Educational content, workshop, local partnerships",
          details: "Free webinars, SME association partnerships, local business network engagement"
        }
      ],
      competitiveAdvantage: [
        "Affordable Entry Point: Purpose-built packages for businesses starting their digital journey",
        "Educational Approach: Learn while we build, empowering teams for long-term success",
        "No Jargon: Plain language, transparency, patience with learning curve",
        "Quick Wins: Focus on immediate visibility and lead generation"
      ],
      keyMessages: {
        functional: "Professional digital marketing without the big agency price tag",
        emotional: "We will guide you every step of the way - no question is too basic",
        positioning: "Your patient, affordable partner in digital marketing"
      }
    }
  };

  const implementationRoadmap = [
    {
      phase: "Phase 1: Foundation (Months 1-3)",
      focus: "Primary Target - Sweet Spot Segment",
      actions: [
        "Develop 3 core service packages targeting R10K-R30K/month range",
        "Build case studies with 5-7 pilot clients (discounted rates for testimonials)",
        "Create lead magnet content: SME Marketing ROI Calculator, AI Marketing Guide",
        "Launch LinkedIn presence + thought leadership content",
        "Partner with 2-3 SME associations (SMME, chambers of commerce)",
        "Set up referral program structure"
      ],
      metrics: "Target: 8-12 paying clients, R120K-R250K MRR"
    },
    {
      phase: "Phase 2: Expansion (Months 4-6)",
      focus: "Scale Primary + Launch Secondary Target",
      actions: [
        "Develop Digital Foundation Package for beginners (R5K-R10K/month)",
        "Launch content marketing engine (blog, case studies, webinars)",
        "Expand sales outreach: Email campaigns, LinkedIn outbound",
        "Host monthly SME Marketing Masterclass webinar series",
        "Develop partnerships with accountants, business consultants, banks",
        "Invest in marketing automation and CRM systems"
      ],
      metrics: "Target: 20-30 total clients, R300K-R500K MRR"
    },
    {
      phase: "Phase 3: Optimization (Months 7-12)",
      focus: "Refine offerings + Opportunistic segment",
      actions: [
        "Analyze client data: identify most profitable segments/services",
        "Develop industry-specific packages (e.g., Professional Services Marketing Suite)",
        "Create enterprise-lite offering for Corporate Spinout segment",
        "Build strategic partnerships with complementary service providers",
        "Develop AI-powered self-service tools for lower-tier clients",
        "Launch client success program to reduce churn and drive upsells"
      ],
      metrics: "Target: 40-60 clients, R600K-R1M MRR, <10% monthly churn"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Maru Online: STP Market Analysis</h1>
        </div>
        <p className="text-gray-600 mb-2">AI-Powered Marketing Services for South African SMEs</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
          <p className="text-sm text-blue-900">
            <strong>Core Opportunity:</strong> Serving SMEs priced out of traditional advertising agencies through AI-powered efficiency and SME-focused service delivery.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg mb-6">
        <div className="flex border-b">
          {['segmentation', 'targeting', 'positioning', 'implementation'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-8">
          {activeTab === 'segmentation' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Step 1: Market Segmentation</h2>
                <p className="text-gray-600">
                  Breaking down the South African SME market into distinct, actionable segments based on multiple criteria.
                </p>
              </div>

              {Object.entries(segmentationCriteria).map(([key, criteria]) => (
                <div key={key} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection(key)}
                    className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-blue-600">{criteria.icon}</div>
                      <div className="text-left">
                        <h3 className="font-bold text-lg text-gray-800">{criteria.title}</h3>
                        <p className="text-sm text-gray-600">{criteria.description}</p>
                      </div>
                    </div>
                    {expandedSections[key] ? (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    )}
                  </button>

                  {expandedSections[key] && (
                    <div className="p-6 bg-white">
                      {criteria.variables.map((variable, idx) => (
                        <div key={idx} className="mb-6 last:mb-0">
                          <h4 className="font-semibold text-gray-800 mb-3 text-lg border-b pb-2">
                            {variable.name}
                          </h4>
                          <div className="space-y-3">
                            {variable.segments.map((segment, segIdx) => (
                              <div key={segIdx} className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-400">
                                <div className="font-semibold text-gray-800 mb-1">{segment.name}</div>
                                <div className="text-sm text-gray-600 mb-2">{segment.detail}</div>
                                <div className="text-sm text-gray-700 italic">{segment.characteristics}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'targeting' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Step 2: Market Targeting</h2>
                <p className="text-gray-600">
                  Evaluating and selecting the most attractive segments for Maru Online based on size, growth, profitability, and strategic fit.
                </p>
              </div>

              {targetSegments.map((target, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className={`p-5 ${
                    target.priority === 'PRIMARY TARGET' ? 'bg-gradient-to-r from-green-50 to-emerald-50' :
                    target.priority === 'SECONDARY TARGET' ? 'bg-gradient-to-r from-blue-50 to-cyan-50' :
                    'bg-gradient-to-r from-amber-50 to-yellow-50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-xl text-gray-800">{target.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        target.priority === 'PRIMARY TARGET' ? 'bg-green-600 text-white' :
                        target.priority === 'SECONDARY TARGET' ? 'bg-blue-600 text-white' :
                        'bg-amber-600 text-white'
                      }`}>
                        {target.priority}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 bg-white">
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Segment Profile
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(target.profile).map(([key, value]) => (
                          <div key={key} className="bg-gray-50 p-3 rounded">
                            <div className="text-xs text-gray-500 uppercase font-semibold mb-1">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div className="text-sm text-gray-800">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Segment Attractiveness Analysis
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(target.attractiveness).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm font-medium text-gray-700">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="text-sm text-gray-600">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Strategic Rationale</h4>
                      <ul className="space-y-2">
                        {target.rationale.map((reason, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-blue-600 mt-1">✓</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'positioning' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Step 3: Market Positioning</h2>
                <p className="text-gray-600">
                  Developing distinct positioning strategies and marketing mix for each target segment.
                </p>
              </div>

              {Object.entries(positioning).map(([key, pos]) => (
                <div key={key} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className={`p-5 ${
                    key === 'primary' ? 'bg-gradient-to-r from-green-50 to-emerald-50' :
                    'bg-gradient-to-r from-blue-50 to-cyan-50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-xl text-gray-800">
                        {pos.segment}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        key === 'primary' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                      }`}>
                        {key === 'primary' ? 'PRIMARY' : 'SECONDARY'}
                      </span>
                    </div>
                    <div className="text-lg font-semibold text-gray-700 italic">
                      {pos.positioning}
                    </div>
                  </div>

                  <div className="p-6 bg-white space-y-6">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Positioning Statement</h4>
                      <p className="text-gray-700">{pos.statement}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Marketing Mix (4Ps)
                      </h4>
                      <div className="space-y-3">
                        {pos.differentiators.map((diff, idx) => (
                          <div key={idx} className="border border-gray-200 rounded-lg p-4">
                            <div className="font-semibold text-gray-800 mb-2">{diff.factor}</div>
                            <div className="text-sm text-gray-700 mb-2">{diff.strategy}</div>
                            <div className="text-xs text-gray-600 italic bg-gray-50 p-2 rounded">
                              {diff.details}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Competitive Advantages</h4>
                      <ul className="space-y-2">
                        {pos.competitiveAdvantage.map((advantage, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-green-600 font-bold mt-1">→</span>
                            <span className="text-gray-700">{advantage}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-3">Key Messaging Framework</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs font-semibold text-gray-600 uppercase">Functional Benefit:</span>
                          <p className="text-sm text-gray-800">{pos.keyMessages.functional}</p>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-gray-600 uppercase">Emotional Benefit:</span>
                          <p className="text-sm text-gray-800">{pos.keyMessages.emotional}</p>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-gray-600 uppercase">Brand Positioning:</span>
                          <p className="text-sm text-gray-800 font-medium">{pos.keyMessages.positioning}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'implementation' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Implementation Roadmap</h2>
                <p className="text-gray-600">
                  Phased approach to market entry and segment penetration over the first 12 months.
                </p>
              </div>

              {implementationRoadmap.map((phase, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50">
                    <h3 className="font-bold text-xl text-gray-800 mb-1">{phase.phase}</h3>
                    <p className="text-sm text-gray-600">Focus: {phase.focus}</p>
                  </div>

                  <div className="p-6 bg-white">
                    <h4 className="font-semibold text-gray-800 mb-3">Key Actions</h4>
                    <ul className="space-y-2 mb-6">
                      {phase.actions.map((action, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-purple-600 font-bold mt-1">{aIdx + 1}.</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-green-50 border-l-4 border-green-500 p-3">
                      <span className="text-xs font-semibold text-green-800 uppercase">Success Metrics:</span>
                      <p className="text-sm text-green-900 mt-1">{phase.metrics}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 p-6 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-3">Critical Success Factors</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span><strong>Demonstrate AI Value:</strong> Show tangible cost/time savings vs traditional agencies through case studies and transparent pricing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span><strong>Build Trust Early:</strong> Focus on quick wins, over-communicate, deliver consistently to establish credibility in skeptical market</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span><strong>Service Productization:</strong> Create standardized packages that scale while maintaining quality and personal touch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span><strong>Strategic Partnerships:</strong> Leverage referral networks (accountants, banks, business associations) for credible lead generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span><strong>Metrics-Driven Retention:</strong> Focus on client results and satisfaction to achieve under 10% monthly churn rate</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tasks Link */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <h3 className="font-bold text-xl mb-1">📋 Track Implementation Progress</h3>
            <p className="text-cyan-100 text-sm">View and manage all tasks in our integrated task management system</p>
          </div>
          <a
            href="/tasks"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg"
          >
            Open Tasks →
          </a>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="font-bold text-gray-800 mb-3">Next Steps: From Analysis to Action</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Immediate (Week 1-4)</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Validate segment assumptions with 20+ SME interviews</li>
              <li>• Develop 3 core service packages with pricing</li>
              <li>• Create initial marketing collateral</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Short-term (Month 2-3)</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Launch pilot program with 5-7 clients</li>
              <li>• Build case studies and testimonials</li>
              <li>• Establish partnership conversations</li>
            </ul>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">Medium-term (Month 4-6)</h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Scale marketing and sales efforts</li>
              <li>• Refine service delivery processes</li>
              <li>• Expand to secondary target segment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaruSTPAnalysis;
