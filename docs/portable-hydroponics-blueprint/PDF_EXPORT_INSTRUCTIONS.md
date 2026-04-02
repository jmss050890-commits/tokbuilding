# SVG to PDF Export Instructions (Drawing Issue Set)

Environment note: no SVG-to-PDF CLI tool was detected in current terminal environment.

## Option 1: VS Code + Browser Print to PDF

1. Open each file in docs/portable-hydroponics-blueprint/drawings.
2. Right click and open in default browser.
3. Press Ctrl+P and choose Save as PDF.
4. Save to docs/portable-hydroponics-blueprint/drawings/pdf.
5. Use naming pattern: original-file-name_RevA.pdf

## Option 2: Inkscape (recommended)

If Inkscape is installed later, run from project root:

```powershell
inkscape "docs/portable-hydroponics-blueprint/drawings/PHG-ASM-001_top_assembly.svg" --export-type=pdf --export-filename="docs/portable-hydroponics-blueprint/drawings/pdf/PHG-ASM-001_top_assembly_RevA.pdf"
```

Repeat for each SVG drawing.

## Required PDF Set

- PHG-ASM-001_top_assembly_RevA.pdf
- PHG-DRW-010_reservoir_2d_RevA.pdf
- PHG-DRW-020_lid_netpot_2d_RevA.pdf
- PHG-DRW-030_electrical_layout_RevA.pdf
- PHG-DRW-040_exploded_view_RevA.pdf
