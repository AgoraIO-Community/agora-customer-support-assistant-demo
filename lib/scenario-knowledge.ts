// Public reference only. Keep customer records, inventory and business actions out of this module.
export const SCENARIO_KNOWLEDGE = {
  "source": {
    "kind": "General support guidance",
    "revision": "2026-11-07",
    "scope": "General support guidance and examples only, not a manufacturer's manual, company policy or live customer records. No brand, product or service is preselected."
  },
  "timeZone": "America/New_York",
  "notDefined": [
    "Product-specific specifications, controls, compatibility or package contents",
    "Company-specific return, refund, warranty or service policies",
    "Individual order, delivery, payment, account or warranty status",
    "Support contact details, opening hours or response times"
  ],
  "supportGuide": [
    {
      "intent": "Product or service use",
      "focus": "Identify the caller's goal and explain general usage concepts. Ask for the product, service or relevant instructions only when needed; do not assume a particular device or brand."
    },
    {
      "intent": "Troubleshooting",
      "focus": "Use the reported symptom and completed checks. Suggest one safe, reversible check at a time and discuss its result without inventing a diagnosis or product-specific procedure."
    },
    {
      "intent": "Missing or damaged item",
      "focus": "Compare what the caller expected with what arrived. Use packaging, a listing or instructions as caller-reported evidence; do not assume which parts should be included."
    },
    {
      "intent": "Returns, refunds and warranty",
      "focus": "Explain general steps and help interpret a policy the caller supplies. Exact eligibility, windows, fees and timing depend on the seller's or provider's actual terms; no request can be submitted here."
    },
    {
      "intent": "Order or delivery concern",
      "focus": "Help interpret the status the caller reports and prepare a question for the seller or carrier. No order lookup, tracking check or delivery change is available."
    },
    {
      "intent": "Billing or account question",
      "focus": "Explain general billing or account steps through official channels. Do not collect credentials or payment details, verify charges or make account changes."
    }
  ],
  "humanReview": {
    "when": [
      "Safety concern",
      "Useful guidance or safe checks exhausted",
      "A company-specific decision, record lookup or external action is required",
      "The caller requests human support"
    ],
    "prepare": [
      "Product or service and the caller's actual question",
      "Reported symptom, discrepancy or policy question",
      "Relevant checks and their results",
      "Relevant purchase confirmation or policy for official support, without collecting sensitive details here"
    ],
    "limits": "The assistant can prepare this recap but cannot submit it or promise a response time."
  }
} as const;
