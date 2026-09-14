export const siteConfig = {
  name: "NexaAI",
  tagline: "AI that works for your business.",
  description:
    "We design and deploy intelligent AI solutions that automate repetitive work, improve customer experiences, and help businesses operate more efficiently.",
  email: "hello@nexaai.com",
  phone: "+1 (555) 010-2024",
  address: "Remote-first — serving clients worldwide",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

export const services = [
  {
    slug: "ai-agents",
    title: "AI Agents & Automation",
    summary:
      "Custom AI agents that handle customer support, sales follow-up, and internal operations around the clock.",
    icon: "Bot",
    features: [
      "24/7 conversational AI agents",
      "Multi-step workflow automation",
      "Human-in-the-loop escalation",
    ],
  },
  {
    slug: "process-automation",
    title: "Business Process Automation",
    summary:
      "Eliminate repetitive manual work by automating data entry, reporting, and cross-tool workflows.",
    icon: "Workflow",
    features: [
      "Document & data processing",
      "System-to-system integrations",
      "Custom internal tools",
    ],
  },
  {
    slug: "customer-experience",
    title: "AI Customer Experience",
    summary:
      "Deploy intelligent chat and voice assistants that resolve customer questions instantly.",
    icon: "MessageSquare",
    features: [
      "AI chatbots & voice assistants",
      "Knowledge-base grounded answers",
      "Seamless CRM handoff",
    ],
  },
  {
    slug: "data-insights",
    title: "Data & Predictive Insights",
    summary:
      "Turn scattered business data into forecasts and dashboards that drive better decisions.",
    icon: "BarChart3",
    features: [
      "Predictive analytics models",
      "Real-time dashboards",
      "Custom reporting pipelines",
    ],
  },
];

export const industries = [
  {
    slug: "professional-services",
    title: "Professional Services",
    description:
      "Automate client intake, proposal generation, and reporting for consultancies and agencies.",
  },
  {
    slug: "healthcare",
    title: "Healthcare & Wellness",
    description:
      "Streamline scheduling, patient follow-up, and administrative workflows with compliant AI tools.",
  },
  {
    slug: "ecommerce-retail",
    title: "E-commerce & Retail",
    description:
      "Deploy AI shopping assistants and automate order support, returns, and inventory queries.",
  },
  {
    slug: "real-estate",
    title: "Real Estate",
    description:
      "Qualify leads instantly and automate listing follow-ups so agents focus on closing deals.",
  },
  {
    slug: "financial-services",
    title: "Financial Services",
    description:
      "Automate document review, client onboarding, and reporting with secure, auditable AI workflows.",
  },
  {
    slug: "logistics",
    title: "Logistics & Operations",
    description:
      "Optimize scheduling, dispatch, and customer updates with real-time AI-driven automation.",
  },
];

export const caseStudies = [
  {
    slug: "regional-law-firm",
    client: "Regional Law Firm",
    industry: "Professional Services",
    result: "70% faster client intake",
    summary:
      "Implemented an AI intake agent that qualifies new clients, schedules consultations, and routes cases automatically.",
  },
  {
    slug: "dtc-ecommerce-brand",
    client: "DTC E-commerce Brand",
    industry: "E-commerce & Retail",
    result: "24/7 support with 65% ticket deflection",
    summary:
      "Deployed an AI support chatbot trained on the brand's policies, cutting response times from hours to seconds.",
  },
  {
    slug: "multi-location-clinic",
    client: "Multi-Location Clinic Group",
    industry: "Healthcare & Wellness",
    result: "3,000+ hours saved annually",
    summary:
      "Automated appointment scheduling and reminders across 8 locations, reducing no-shows by 40%.",
  },
];
