# SVL Portable Hydroponic Garden System Test Protocol (v1 Draft)

Document ID: SVL-PHG-TP-A  
Revision: A  
Date: 2026-04-02

## 1. Test Objective

Validate safety, reliability, and user readiness for Phase 1 pilot deployment.

## 2. Test Environment

- Lab location: SVL internal bench setup
- Ambient conditions: 22 C +/-2 C, 45-55% RH
- Test sample size: 5 units (engineering sample)
- Hardware revision: SVL-PHG-BASE-A

## 3. Acceptance Criteria Summary

- No critical leaks over 8-hour continuous operation
- Pump operation remains stable and below 42 dBA at 1 m
- Adapter and line temperatures remain within safe touch limits
- First-time setup completion >=90% in <=25 minutes

## 4. Test Cases

### TC-01 Functional Startup

- Procedure: Fill to nominal line, power on, verify bubbling at all sites within 120 seconds
- Pass criteria: Stable aeration and no electrical faults
- Result: Pending execution

### TC-02 Leak Integrity

- Procedure: Static hold 30 min + active operation 8 hours
- Pass criteria: No external leaks, no drip beyond gasket perimeter
- Result: Pending execution

### TC-03 Electrical Safety

- Procedure: Adapter output verification, cable strain test, switch cycle 100x
- Pass criteria: Voltage 12 V +/-5%, no intermittent power loss
- Result: Pending execution

### TC-04 Endurance Reliability

- Procedure: 72-hour continuous operation run
- Pass criteria: Pump remains functional, no critical performance degradation
- Result: Pending execution

### TC-05 Cleaning and Reassembly

- Procedure: User performs full clean and reassembly with guide
- Pass criteria: Reassembly success and restart within 10 min
- Result: Pending execution

### TC-06 User Setup Usability

- Procedure: 10 first-time users complete setup from quick-start card
- Pass criteria: >=9 of 10 users complete setup without live support
- Result: Pending execution

## 5. Defect Log

| Defect ID | Severity | Description | Root Cause | Corrective Action | Status |
|---|---|---|---|---|---|
| PHG-D-001 | Medium | Placeholder for first recorded defect | TBD | TBD | Open |

## 6. Sign-off

- Test lead: Pending
- Engineering lead: Pending
- Quality lead: Pending
- Product owner: Pending
