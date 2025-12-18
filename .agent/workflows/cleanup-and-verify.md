---
description: Cleanup unused files and verify CRS calculator accuracy
---

# Task: Cleanup & CRS Calculator Verification

## 1. Cleanup Unused Files

Check and remove any unused files from the codebase:

### Files to Check:
- [ ] `src/components/AnimatedBackground.jsx` - Should be deleted (was removed during redesign)
- [ ] `src/components/Footer.jsx` - Should be deleted (integrated into App.jsx)
- [ ] Any unused CSS files or old design system files
- [ ] Check for unused imports in all components
- [ ] Check for any orphaned utility files

### Run these commands to find unused exports:
```bash
# Find files not imported anywhere
npx unimported
# Or manually check with grep
grep -r "import.*from" src/ | grep -v node_modules
```

---

## 2. Verify CRS Calculator Facts

Cross-reference all CRS calculator logic with official IRCC guidelines:

### Key Areas to Verify:

#### Age Points (Max: 110 without spouse, 100 with spouse)
- [ ] 17 or younger: 0 points
- [ ] 18-35: Maximum points
- [ ] 36+: Decreasing points
- [ ] 45+: 0 points

#### Education Points (Max: 150 without spouse, 140 with spouse)
- [ ] Less than high school: 0
- [ ] High school: 30 points
- [ ] Post-secondary 1-2 years: 90 points
- [ ] Post-secondary 3+ years or Masters: 120-150 points
- [ ] PhD: 150 points

#### Language Points (Max: 136 for first language, 24 for second)
- [ ] CLB 4-5: Low points
- [ ] CLB 7-8: Medium points  
- [ ] CLB 9-10+: Maximum points
- [ ] Verify French bonus points (CLB 7+ in both = additional points)

#### Canadian Work Experience (Max: 80 without spouse, 70 with spouse)
- [ ] 1 year: 40 points
- [ ] 2 years: 53 points
- [ ] 3 years: 64 points
- [ ] 4 years: 72 points
- [ ] 5+ years: 80 points

#### Additional Factors (Max: 600)
- [ ] Provincial Nomination: 600 points
- [ ] Canadian education: 15-30 points
- [ ] French skills bonus: up to 50 points
- [ ] Sibling in Canada: 15 points
- [ ] Job offer points: **REMOVED as of March 25, 2025** ✓

### Files to Review:
- `src/Utils/crsCalculator.js` - Main calculation logic
- `src/Utils/crsConstants.js` - Point values and options
- `src/Utils/useCRSCalculator.js` - Hook implementation

### Reference Links:
- IRCC CRS Tool: https://www.cic.gc.ca/english/immigrate/skilled/crs-tool.asp
- Express Entry Points Grid: https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/criteria-comprehensive-ranking-system/grid.html

---

## 3. Additional Cleanup Tasks

- [ ] Verify all i18n translation keys are being used
- [ ] Check for console.log statements to remove
- [ ] Ensure all API endpoints are correct
- [ ] Test responsive design on all pages
- [ ] Verify dark mode works consistently across all components
