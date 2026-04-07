# SVL-KPA Market Value Calculator

This model gives fast valuation estimates for Sanders Viopro Labs LLC based on recurring revenue, hardware revenue, and strategic premium assumptions.

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
