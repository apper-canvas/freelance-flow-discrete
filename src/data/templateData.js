/**
 * Template data for proposals and contracts
 */
export const proposalTemplates = [
  {
    id: 'p1',
    name: 'Standard Proposal',
    description: 'A comprehensive proposal template for most freelance services',
    lastModified: '2023-03-15',
    sections: [
      {
        id: 'intro',
        title: 'Introduction',
        content: `# Introduction\n\nThank you for the opportunity to submit this proposal. After understanding your requirements, I am confident I can deliver the results you're looking for.\n\nThis proposal outlines my approach, deliverables, timeline, and investment required for the project.`
      },
      {
        id: 'overview',
        title: 'Project Overview',
        content: `# Project Overview\n\nBased on our discussions, I understand that {CLIENT_NAME} needs {PROJECT_DESCRIPTION}. The main goals of this project are:\n\n- Goal 1\n- Goal 2\n- Goal 3`
      },
      {
        id: 'approach',
        title: 'Approach & Methodology',
        content: `# Approach & Methodology\n\nTo achieve your goals, I will follow this proven process:\n\n1. Discovery & Research\n2. Planning & Strategy\n3. Development & Implementation\n4. Testing & Refinement\n5. Delivery & Support`
      },
      {
        id: 'deliverables',
        title: 'Deliverables',
        content: `# Deliverables\n\nUpon completion of this project, you will receive:\n\n- Deliverable 1\n- Deliverable 2\n- Deliverable 3\n\nAll deliverables will be provided in the following formats: {FORMATS}`
      },
      {
        id: 'timeline',
        title: 'Timeline',
        content: `# Timeline\n\nI estimate this project will take {DURATION} to complete. Here's the proposed timeline:\n\n- Week 1: Phase 1\n- Week 2: Phase 2\n- Week 3: Phase 3\n- Week 4: Final delivery`
      },
      {
        id: 'investment',
        title: 'Investment',
        content: `# Investment\n\nThe total investment for this project is {TOTAL_AMOUNT}.\n\nPayment Schedule:\n- 50% deposit to secure the project start date\n- 25% at project midpoint\n- 25% upon project completion\n\nAll payments are due within 14 days of invoice date.`
      },
      {
        id: 'terms',
        title: 'Terms & Conditions',
        content: `# Terms & Conditions\n\n1. This proposal is valid for 30 days from the date of submission.\n2. Any changes to the project scope may affect the timeline and cost.\n3. {CLIENT_NAME} will provide all necessary content and feedback in a timely manner.\n4. Additional revisions beyond those specified will be billed at my hourly rate of {HOURLY_RATE}.`
      }
    ]
  },
  {
    id: 'p2',
    name: 'Web Development Proposal',
    description: 'Tailored for web design and development projects',
    lastModified: '2023-04-22',
    sections: [
      {
        id: 'intro',
        title: 'Introduction',
        content: `# Introduction\n\nThank you for considering me for your web development needs. This proposal outlines how I plan to create a website that meets your business objectives and provides an excellent user experience.`
      },
      {
        id: 'scope',
        title: 'Project Scope',
        content: `# Project Scope\n\nThis project includes the design and development of a {PAGE_COUNT}-page website with the following features:\n\n- Responsive design for all devices\n- Content management system\n- Contact form with email notifications\n- Integration with {INTEGRATIONS}\n- Basic SEO setup`
      },
      {
        id: 'design',
        title: 'Design Process',
        content: `# Design Process\n\nThe design process will include:\n\n1. Wireframing key pages\n2. Creating mockups for your approval\n3. Developing a style guide\n4. Implementing responsive design principles`
      },
      {
        id: 'development',
        title: 'Development',
        content: `# Development\n\nThe website will be built using {TECHNOLOGIES}, chosen for their reliability, security, and ease of maintenance. The development process includes:\n\n1. Frontend development\n2. Backend functionality\n3. CMS implementation\n4. Testing across browsers and devices`
      },
      {
        id: 'timeline',
        title: 'Timeline',
        content: `# Timeline\n\nThe project is estimated to take {DURATION} weeks:\n\n- Week 1: Discovery and wireframing\n- Weeks 2-3: Design and client feedback\n- Weeks 4-6: Development\n- Week 7: Testing and refinement\n- Week 8: Launch and training`
      },
      {
        id: 'pricing',
        title: 'Pricing',
        content: `# Pricing\n\nThe total investment for this project is {TOTAL_AMOUNT}.\n\nThis includes:\n- All design and development work\n- 2 rounds of revisions at each stage\n- CMS training (2 hours)\n- 30 days of post-launch support\n\nPayment Schedule:\n- 40% deposit\n- 30% after design approval\n- 30% upon project completion`
      }
    ]
  }
];

export const contractTemplates = [
  {
    id: 'c1',
    name: 'Standard Service Agreement',
    description: 'A general contract for freelance services',
    lastModified: '2023-02-10',
    sections: [
      {
        id: 'parties',
        title: 'Parties',
        content: `# Service Agreement\n\nThis Service Agreement (the "Agreement") is entered into as of {DATE} (the "Effective Date"), by and between:\n\n{YOUR_NAME}, with a principal place of business at {YOUR_ADDRESS} ("Service Provider")\n\nand\n\n{CLIENT_NAME}, with a principal place of business at {CLIENT_ADDRESS} ("Client")\n\nCollectively referred to as the "Parties."`
      },
      {
        id: 'services',
        title: 'Services',
        content: `# Services\n\nService Provider agrees to provide the following services to Client (the "Services"):\n\n{DETAILED_SERVICES_DESCRIPTION}\n\nAny additional services not specified in this Agreement will require a separate agreement and additional fees.`
      },
      {
        id: 'compensation',
        title: 'Compensation',
        content: `# Compensation\n\nClient agrees to compensate Service Provider as follows:\n\n- Rate: {RATE} {RATE_TYPE: per hour/fixed fee}\n- Estimated Total: {TOTAL_AMOUNT}\n- Payment Schedule: {PAYMENT_SCHEDULE}\n- Payment Method: {PAYMENT_METHOD}\n\nAll invoices are due within {PAYMENT_TERMS} days of receipt.`
      },
      {
        id: 'timeline',
        title: 'Timeline',
        content: `# Timeline\n\nService Provider will commence work on {START_DATE} and complete the Services by {END_DATE}, subject to timely receipt of necessary information and materials from Client.`
      },
      {
        id: 'ownership',
        title: 'Ownership & Rights',
        content: `# Ownership & Rights\n\nUpon receipt of full payment, Service Provider assigns to Client all rights, title, and interest in the deliverables, except for:\n\n- Third-party materials, which are subject to their respective licenses\n- Service Provider's pre-existing work and tools\n\nService Provider retains the right to display the work in portfolios and promotional materials.`
      },
      {
        id: 'termination',
        title: 'Termination',
        content: `# Termination\n\nEither Party may terminate this Agreement with {NOTICE_PERIOD} days written notice. In the event of termination:\n\n- Client shall pay for all Services completed up to the termination date\n- Client shall reimburse any non-cancellable expenses incurred by Service Provider\n\nIf Client terminates the project after work has begun, any deposit or milestone payments made are non-refundable.`
      },
      {
        id: 'liability',
        title: 'Limitation of Liability',
        content: `# Limitation of Liability\n\nService Provider's liability is limited to the total amount paid by Client under this Agreement. Service Provider is not liable for any indirect, consequential, special, or punitive damages.`
      }
    ]
  }
];