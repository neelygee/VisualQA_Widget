// Mock QA analysis utility
// In a real implementation, this would fetch and analyze the actual webpage

interface QACheck {
  title: string;
  description: string;
  status: "pass" | "fail" | "warning";
  details?: string;
}

interface QACategory {
  category: string;
  checks: QACheck[];
}

export async function analyzeWebpage(
  url: string,
  securityKey: string
): Promise<QACategory[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2500));

  // Mock analysis results
  const results: QACategory[] = [
    {
      category: "Brand Colors",
      checks: [
        {
          title: "Primary Blue (#0070E0)",
          description: "Verify primary Docusign blue is used correctly",
          status: "pass",
          details: "Found 12 instances of primary blue. All usage follows brand guidelines.",
        },
        {
          title: "Secondary Yellow (#FFD200)",
          description: "Check proper usage of Docusign yellow accent",
          status: "pass",
          details: "Yellow accent color used appropriately in 3 CTA elements.",
        },
        {
          title: "Neutral Grays",
          description: "Ensure neutral colors follow brand palette",
          status: "pass",
          details: "All gray tones match approved brand palette (#484848, #6B6B6B, #E5E5E5).",
        },
        {
          title: "Color Contrast",
          description: "Verify WCAG AA compliance for text contrast",
          status: "fail",
          details: "Footer text has insufficient contrast (3.2:1). Minimum required: 4.5:1.",
        },
      ],
    },
    {
      category: "Voice & Tone",
      checks: [
        {
          title: "Professional Tone",
          description: "Confirm content maintains professional, approachable voice",
          status: "pass",
          details: "Content tone is consistently professional and user-friendly.",
        },
        {
          title: "Action-Oriented Language",
          description: "CTAs use clear, action-oriented verbs",
          status: "pass",
          details: "All CTAs use approved action verbs: 'Start', 'Explore', 'Learn', 'Get'.",
        },
        {
          title: "Benefit-Focused Messaging",
          description: "Headlines emphasize customer benefits",
          status: "warning",
          details: "2 of 5 headlines are feature-focused. Consider rewriting to emphasize benefits.",
        },
      ],
    },
    {
      category: "Spacing & Layout",
      checks: [
        {
          title: "Module Padding (Desktop)",
          description: "Verify consistent spacing between page modules",
          status: "pass",
          details: "All modules use 80px vertical padding as specified in design system.",
        },
        {
          title: "Module Padding (Mobile)",
          description: "Check responsive spacing for mobile views",
          status: "pass",
          details: "Mobile spacing correctly adjusted to 48px between modules.",
        },
        {
          title: "Grid Alignment",
          description: "Ensure content aligns to 12-column grid",
          status: "pass",
          details: "All content properly aligned to grid system. No orphaned elements.",
        },
        {
          title: "White Space Balance",
          description: "Verify appropriate breathing room around content",
          status: "fail",
          details: "Hero section appears cramped. Increase internal padding by 24px minimum.",
        },
      ],
    },
    {
      category: "Copy Compliance",
      checks: [
        {
          title: "Sentence Case Headers",
          description: "Confirm headers use sentence case (not title case)",
          status: "fail",
          details: "3 headers use title case: 'Transform Your Business', 'Accelerate Your Workflow', 'Enhance Your Security'. Should be sentence case.",
        },
        {
          title: "Punctuation Consistency",
          description: "Check for consistent punctuation in lists and descriptions",
          status: "pass",
          details: "All bullet points and list items follow consistent punctuation rules.",
        },
        {
          title: "Oxford Comma Usage",
          description: "Verify Oxford comma is used in series",
          status: "pass",
          details: "Oxford comma correctly used in all series throughout page.",
        },
        {
          title: "Trademark Symbols",
          description: "Ensure Docusign® trademark is properly marked",
          status: "warning",
          details: "Docusign trademark symbol missing in 2 instances in body copy.",
        },
        {
          title: "Product Name Consistency",
          description: "Verify product names match official branding",
          status: "pass",
          details: "All product names correctly formatted: Docusign eSignature, Docusign CLM.",
        },
        {
          title: "Prohibited Terms",
          description: "Check for non-approved terminology or jargon",
          status: "pass",
          details: "No prohibited terms detected. All language approved.",
        },
      ],
    },
    {
      category: "Typography",
      checks: [
        {
          title: "Font Family",
          description: "Verify approved brand fonts are used",
          status: "pass",
          details: "All text uses approved fonts: Inter for body, headings follow hierarchy.",
        },
        {
          title: "Font Size Hierarchy",
          description: "Check font sizes match design system scale",
          status: "pass",
          details: "Typography scale correctly implemented across all breakpoints.",
        },
        {
          title: "Line Height",
          description: "Verify line spacing for readability",
          status: "pass",
          details: "Line height set to 1.5-1.6 for body text. Meets accessibility standards.",
        },
      ],
    },
    {
      category: "Imagery & Media",
      checks: [
        {
          title: "Image Quality",
          description: "Ensure images meet minimum resolution requirements",
          status: "pass",
          details: "All images are high resolution (2x retina ready) and optimized for web.",
        },
        {
          title: "Alt Text",
          description: "Verify all images have descriptive alt text",
          status: "warning",
          details: "2 decorative images missing empty alt attributes. Add alt='' for screen readers.",
        },
        {
          title: "Brand Photography Style",
          description: "Confirm images match Docusign photography guidelines",
          status: "pass",
          details: "All photos follow brand style: authentic, diverse, professional settings.",
        },
      ],
    },
  ];

  return results;
}
