# SVL Portable Hydroponic Garden System Blueprint Package (v1 Filled Draft)

Owner: Sanders Viopro Labs LLC  
Mission Alignment: KPA - Keep People Alive  
Document Status: Filled Draft (Partner Review Ready, Engineering Validation Pending)

## 1. Document Control

- Product name: SVL Portable Hydroponic Garden System
- Product code: SVL-PHG-BASE
- Revision: A
- Effective date: 2026-04-02
- Prepared by: Jerome M. Sanders, Founder
- Reviewed by: SVL Product Team (Draft)
- Approved by: Pending final engineering sign-off
- Confidentiality: Partner NDA recommended

## 2. Product Definition

### 2.1 Intended use

- User profile: Home users, schools, community programs, multifamily residents
- Primary use: Leafy greens and herb growth in limited-space environments
- Mission use: Food resilience and daily nutrition support

### 2.2 Out-of-scope use

- Not intended for medical treatment, pharmaceutical crops, or industrial agriculture
- Not intended for outdoor freeze conditions without thermal protection

## 3. System Architecture

### 3.1 Subsystems

- Reservoir and enclosure (10 L nominal)
- Grow deck and net pot interface (6-site lid)
- Aeration assembly (air pump, tubing, check valve, airstone)
- Lighting module (optional SKU: LED 25 W)
- Sensor module (optional SKU: pH, EC, temperature, water level)
- Power subsystem (12 V DC adapter, optional battery/solar path)

### 3.2 Interface map

- Mechanical interfaces: Snap-fit lid with gasket seat, 6 net pot apertures, tubing passthrough with strain relief
- Electrical interfaces: 5.5 x 2.1 mm DC barrel, inline switch, optional USB-C to controller module
- Software interfaces: Optional mobile setup checklist, reminder notifications, telemetry upload for sensor SKU

## 4. Mechanical Specification

### 4.1 Dimensions and tolerances

- Overall dimensions (LxWxH): 420 x 300 x 280 mm (16.5 x 11.8 x 11.0 in)
- Reservoir volume: 10 L
- Empty/full weight: 2.1 kg / 12.1 kg
- Tolerances:
  - Critical fit features: +/-0.25 mm
  - Non-critical shell features: +/-0.75 mm

### 4.2 Material specification

- Food-contact plastics: PP and HDPE (BPA-free, food-contact compliant)
- Gaskets/seals: Silicone, 50A durometer
- Fasteners: Stainless steel 18-8, corrosion resistant

### 4.3 Environmental limits

- Ambient operation: 16 C to 30 C
- Storage: 5 C to 40 C
- Relative humidity: 20% to 85% non-condensing

## 5. Electrical and Controls Specification

### 5.1 Power

- Input: 100-240 V AC, 50/60 Hz (adapter)
- Output: 12 V DC, 1.5 A (pump + optional controls)
- Battery/solar option: 12 V LiFePO4 + 20-40 W panel (optional bundle)
- Protection: Inline 2 A fuse, reverse polarity protected harness in optional control SKU

### 5.2 Pump and actuator controls

- Pump model class: 12 V micro air pump, 3-5 W
- Duty cycle profile: Continuous aeration (base) or interval 15 min on / 15 min off (power-save mode)
- Noise target: <=42 dBA at 1 m

### 5.3 Sensors (optional SKU)

- pH range/accuracy: 4.0 to 8.0, +/-0.2
- EC range/accuracy: 0.2 to 3.0 mS/cm, +/-0.1 mS/cm
- Water temperature range/accuracy: 10 C to 35 C, +/-0.5 C
- Water level threshold: optical or float switch, low-level alert at 20% volume

## 6. Bill of Materials (BOM)

Filled BOM file: BOM_v1_FILLED.csv

## 7. Assembly and Service

### 7.1 Assembly process

- Station 1: Reservoir and lid fit check
- Station 2: Tubing, check valve, and airstone install
- Station 3: Pump power and noise check
- Station 4: Leak hold test (30 min)
- Station 5: Final clean pack and documentation insert

### 7.2 Serviceability

- Replaceable components: pump, tubing, check valve, airstone, gasket, adapter
- Cleaning cycle: full rinse every 7 days, deep clean every 21 days
- Maintenance intervals:
  - Pump inspection: every 30 days
  - Tubing replacement: every 90 days
  - Airstone replacement: every 90-120 days

## 8. Validation and Verification

Primary protocol file: TEST_PROTOCOL_v1_DRAFT.md

Required classes included:

- Functional startup and flow
- Leak integrity
- Electrical safety and thermal
- Endurance run
- User setup usability

## 9. Risk and Safety (KPA-Critical)

### 9.1 Key hazards

- Water + electricity interactions
- Food contamination from unsanitized surfaces
- Mold and algae growth from light leaks and poor hygiene
- Child interaction with cables and water body

### 9.2 Required controls

- DC low-voltage architecture for base operation
- Food-safe, BPA-free contact surfaces only
- Included cleaning checklist and warning labels
- Quick disconnect instructions in setup guide

## 10. Compliance Path

- Electrical: UL/ETL-listed adapter required
- Materials: food-contact compliance declarations from suppliers
- Labeling: lot code, manufacturer, electrical warning, cleaning warning
- Records: BOM revision, test protocol results, supplier declarations

## 11. Manufacturing Handoff Package

Handoff set (draft complete, production lock pending):

- CAD and drawing index: CAD_DRAWING_INDEX_v1.md
- BOM locked draft: BOM_v1_FILLED.csv
- Assembly and QC outlines: this document + test protocol
- Packaging scope: include starter nutrient and quick-start card

## 12. Pilot Deployment Plan

- Pilot size: 25 units (Phase 1), 100 units (Phase 2)
- Pilot audience: Multifamily households + community wellness partners
- Pilot duration: 12 weeks
- Success metrics:
  - Setup success >=90%
  - Weekly compliance >=80%
  - Crop survival >=85%
  - User satisfaction >=4.4/5

## 13. Partner Brief Attachment Data

Partner-ready one-page file: EMAIL_ATTACHMENT_ONE_PAGER_v1_READY.md

## 14. Completion Gate

Current draft completion status:

- CAD package indexed: Yes
- BOM with suppliers and costs: Yes (draft)
- Mechanical/electrical specs: Yes (draft)
- Executed signed test results: Pending
- Manufacturing sign-off: Pending
- Compliance audit file: Pending
