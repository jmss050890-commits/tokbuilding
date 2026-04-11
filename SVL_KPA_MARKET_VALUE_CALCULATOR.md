# SVL-KPA Market Value Calculator


This model gives fast, research-backed valuation estimates for Sanders Viopro Labs LLC, reflecting 2026's high-governance AI ecosystem standards. It now includes:

- **Sum-of-the-Parts (SOTP) Model:** Enter ARR and hardware revenue for TokHealth, TokThru, and TokBuilding. Each is valued as a separate stream, then summed for total value.
- **Governance Premium (Trust Multiplier):** Reflects ISO 27001, GDPR, and Security by Design. Investors pay a premium (1.5x–2.2x) for audit-ready, high-trust infrastructure.
- **Strategic Moat Value:** Represents the cost for a competitor to replicate SVL's SPL/Guardian IP and legal-technical-mission framework.

## Updated Formula

Market Value = ((SOTP Value) × Trust Multiplier) + SVL-KPA Upgrade Value + Strategic Moat Value

Where:
- SOTP Value = Sum of (ARR + Hardware) for each Tok-service
- Trust Multiplier = 1.5x–2.2x (editable)
- Strategic Moat Value = User input (editable)
- SVL-KPA Upgrade Value = Growth, risk/cost reduction, and scenario weight

## How to Use

1. Enter ARR and hardware revenue for TokHealth, TokThru, and TokBuilding.
2. Adjust the Trust Multiplier and Strategic Moat Value as needed (see tooltips for guidance).
3. Review the output for a full breakdown of value drivers, including governance and moat.

## Why This Matters

Standard SaaS calculators miss the value of high-trust, multi-sector, and proprietary infrastructure. This model is designed for 2026's market, where trust, compliance, and architectural moats are financial multipliers.

---

## Formula

Market Value = ((ARR x Software Multiple) + (Hardware Revenue x Hardware Multiple)) x (1 + Strategic Premium)

## Default Inputs (editable)

- ARR: $2,500,000
- Hardware revenue: $1,500,000

## Multiples by Scenario

- Conservative:
  - Software multiple: 4x
  - Hardware multiple: 1x
  - Strategic premium: 10%
- Base:
  - Software multiple: 6x
  - Hardware multiple: 2x
  - Strategic premium: 20%
- Aggressive:
  - Software multiple: 10x
  - Hardware multiple: 3x
  - Strategic premium: 40%

## Use It

Run this from the project root:

```bash
node scripts/svl-market-value-calculator.js
```

Run with custom ARR and hardware inputs:

```bash
node scripts/svl-market-value-calculator.js --arr 3200000 --hardware 1800000
```

Optional scenario tuning flags:

- Software multiples: --sw-cons, --sw-base, --sw-agg
- Hardware multiples: --hw-cons, --hw-base, --hw-agg
- Strategic premium (decimal): --sp-cons, --sp-base, --sp-agg

Example with custom scenario tuning:

```bash
node scripts/svl-market-value-calculator.js --arr 3200000 --hardware 1800000 --sw-base 7 --hw-base 2.5 --sp-base 0.25
```

## Notes

- This is a directional valuation model for planning and negotiations.
- Final valuation depends on growth quality, customer concentration, retention, margins, legal structure, and deal terms.
