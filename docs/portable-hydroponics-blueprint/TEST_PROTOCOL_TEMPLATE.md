# SVL Portable Hydroponic Garden System Test Protocol Template

Document ID: SVL-PHG-TP-[REV]  
Revision: [A/B/C]  
Date: [YYYY-MM-DD]

## 1. Test Objective

Validate safety, reliability, and user readiness before pilot and scaled deployment.

## 2. Test Environment

- Lab location: [Location]
- Ambient conditions: [Temp/Humidity]
- Test sample size: [N units]
- Firmware/hardware revision: [Rev]

## 3. Acceptance Criteria Summary

- No critical leaks under normal operation
- Electrical components operate within safe ranges
- Pump duty cycle sustained over endurance period
- User setup completion >= [target]% without technician intervention

## 4. Test Cases

### TC-01 Functional Startup

- Procedure: Fill, power on, verify flow/aeration within [X] minutes
- Pass criteria: Stable operation, no faults
- Result: [Pass/Fail]

### TC-02 Leak Integrity

- Procedure: Operate at max fill for [X] hours
- Pass criteria: No leaks outside allowed threshold [define]
- Result: [Pass/Fail]

### TC-03 Electrical Safety

- Procedure: Verify adapter output, insulation, and overcurrent behavior
- Pass criteria: Meets spec limits and safety checks
- Result: [Pass/Fail]

### TC-04 Endurance Reliability

- Procedure: Continuous/interval operation for [X] cycles or [X] hours
- Pass criteria: No critical failures, performance drift within tolerance
- Result: [Pass/Fail]

### TC-05 Cleaning and Reassembly

- Procedure: User disassembles, sanitizes, and reassembles
- Pass criteria: Reassembly success and functional restart
- Result: [Pass/Fail]

### TC-06 User Setup Usability

- Procedure: First-time user setup with guide only
- Pass criteria: Setup success rate >= [target]%, median time <= [target]
- Result: [Pass/Fail]

## 5. Defect Log

| Defect ID | Severity | Description | Root Cause | Corrective Action | Status |
|---|---|---|---|---|---|
| [ID] | [Critical/High/Med/Low] | [Issue] | [Cause] | [Action] | [Open/Closed] |

## 6. Sign-off

- Test lead: [Name / Date]
- Engineering lead: [Name / Date]
- Quality lead: [Name / Date]
- Product owner: [Name / Date]
