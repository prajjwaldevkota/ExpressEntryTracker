# CRS scoring verification

Verified against IRCC on **October 24, 2026**:

- [Current scoring tables](https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/check-score/crs-criteria.html)
- [Changes effective November 3, 2026](https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/changes.html)
- [Language-test equivalencies](https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/language-requirements/language-testing.html)

## Current rules

The calculator uses the March 25, 2025 rules through November 2, 2026. Job offers do not contribute points in this mode.

Corrections covered by executable assertions:

- Master's, qualifying professional degrees and doctoral degrees use the advanced education transferability band.
- Education and foreign-work transferability each cap at 50; total transferability, including a trade certificate, caps at 100.
- Additional factors cap at 600, including a provincial nomination.
- French bonuses are derived from the four French and English language abilities, not a separate self-selected bonus.
- English or French can be the first official language. Automatic selection compares the complete scores for both choices.
- Spouse language points are assessed per ability. An accompanying spouse who is already a Canadian citizen/PR should be excluded using the form's spouse question.
- Second official language points cap at 22 with an accompanying spouse, or 24 without one.
- Canadian education is explicitly selected; the calculator does not infer a Canadian credential from the applicant's highest education.
- A trade certificate receives 25 points at CLB/NCLC 5–6 in all abilities or 50 at 7+.
- The displayed breakdown includes transferability and uses the correct language maxima of 150/160.

The basic regression fixture totals **306**, not the old script's 293: age 105 + education 120 + language 68 + transferability 13.

## November 3, 2026 rules

This mode is available as an explicit preview before the effective date. The initial selection changes on November 3 in the America/Toronto time zone.

Labour market integration replaces the Canadian work contribution with the larger of:

1. Existing work-length points plus eligible high-wage experience points (20, 40 or 70).
2. Eligible high-wage job-offer points (50, 70 or 100).

The two alternatives are not added together. Experience bonuses require at least one year of Canadian work; the form instructs applicants to choose a band only when they have at least 12 months of qualifying work in that band. Work-length transferability remains separate and unchanged. Occupation eligibility must be checked against the linked IRCC source; personal salary is not the classification criterion.

## Run checks

```sh
npm test
```

Tests use Node's built-in test runner and fail with a nonzero exit status on an incorrect result. The legacy `node test-runner.js` entry point now executes assertions too.

These checks verify arithmetic and selected boundary cases. They do not determine immigration-program eligibility or validate credentials, test validity, occupation classification, or job offers. Estimates count the answers entered so far; incomplete profiles must not be treated as final scores.
