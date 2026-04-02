# SVL-KPA Market Value Calculator

This model gives fast valuation estimates for Sanders Viopro Labs LLC based on recurring revenue, hardware revenue, and strategic premium assumptions.

## Formula

Market Value = ((ARR x Software Multiple) + (Hardware Revenue x Hardware Multiple)) x (1 + Strategic Premium)

## Default Inputs (editable)

- ARR: $1,200,000
- Hardware revenue: $800,000

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

## Notes

- This is a directional valuation model for planning and negotiations.
- Final valuation depends on growth quality, customer concentration, retention, margins, legal structure, and deal terms.
