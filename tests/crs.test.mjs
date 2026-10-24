import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCRSScore, getDefaultRules } from '../src/Utils/crsCalculator.js';
const language = (name, clb) => Object.fromEntries(['Speaking', 'Listening', 'Reading', 'Writing'].map(ability => [`${name}${ability}`, `clb-${clb}`]));
const base = { rulesVersion: '2025-03', age: '30', education: 'bachelors', hasSpouse: 'no', firstOfficialLanguage: 'english', ...language('english', 7), canadianWorkExperience: '0', foreignWorkExperience: '0' };
const score = changes => calculateCRSScore({ ...base, ...changes });

test('basic profile includes the 13 education/language transferability points', () => {
  const result = score({});
  assert.equal(result.scores.age, 105);
  assert.equal(result.scores.education, 120);
  assert.equal(result.scores.english, 68);
  assert.equal(result.scores.skillTransferability, 13);
  assert.equal(result.totalScore, 306);
});
test('age boundaries follow the spouse and single scoring tables', () => {
  for (const [age, single, spouse] of [[17, 0, 0], [18, 99, 90], [19, 105, 95], [20, 110, 100], [29, 110, 100], [30, 105, 95], [44, 6, 5], [45, 0, 0], [65, 0, 0]]) {
    assert.equal(score({ age }).scores.age, single);
    assert.equal(score({ age, hasSpouse: 'yes' }).scores.age, spouse);
  }
});
test('master’s and PhD get the advanced education transferability band', () => {
  for (const education of ['masters', 'phd', 'two-certificates']) {
    assert.equal(score({ education }).scores.skillTransferability, 25);
    assert.equal(score({ education, ...language('english', 9) }).scores.skillTransferability, 50);
    assert.equal(score({ education, ...language('english', 4), canadianWorkExperience: '2' }).scores.skillTransferability, 50);
  }
});
test('French bonus is derived from all four abilities and ignores manual overrides', () => {
  assert.equal(score({ frenchSkills: 'strong' }).scores.frenchBonus, 0);
  assert.equal(score({ ...language('french', 7) }).scores.frenchBonus, 50);
  assert.equal(score({ ...language('french', 7), ...language('english', 4) }).scores.frenchBonus, 25);
  assert.equal(score({ ...language('french', 7), frenchReading: 'clb-6' }).scores.frenchBonus, 0);
  assert.equal(score({ ...language('french', 7), frenchReading: '' }).scores.frenchBonus, 0);
});
test('additional factors cap at 600 and a full single profile caps at 1200', () => {
  const result = score({ age: 25, education: 'phd', ...language('english', 10), ...language('french', 10), canadianWorkExperience: '5', foreignWorkExperience: '5', provincialNomination: 'yes', siblingInCanada: 'yes', studiedInCanada: 'yes', canadianEducationCredential: 'three-plus' });
  assert.equal(result.scores.additionalFactors, 600);
  assert.equal(result.totalScore, 1200);
});
test('spouse abilities are calculated individually and second language caps at 22', () => {
  const result = score({ hasSpouse: 'yes', ...language('french', 10), spouseSpeaking: 'clb-9', spouseListening: 'clb-7', spouseReading: 'clb-5', spouseWriting: 'clb-4' });
  assert.equal(result.scores.spouseLanguage, 9);
  assert.equal(result.scores.french, 22);
});
test('French can be the first official language, including transferability', () => {
  const result = score({ firstOfficialLanguage: 'auto', ...language('english', 4), ...language('french', 9), education: 'masters' });
  assert.equal(result.firstLanguage, 'french');
  assert.equal(result.scores.french, 124);
  assert.equal(result.scores.english, 0);
  assert.equal(result.scores.skillTransferability, 50);
  assert.equal(result.scores.frenchBonus, 25);
});
test('trade certificate thresholds and overall transferability cap', () => {
  assert.equal(score({ education: 'secondary', tradeCertificate: 'yes', ...language('english', 5) }).scores.skillTransferability, 25);
  assert.equal(score({ education: 'secondary', tradeCertificate: 'yes' }).scores.skillTransferability, 50);
  assert.equal(score({ education: 'masters', ...language('english', 10), canadianWorkExperience: '5', foreignWorkExperience: '5', tradeCertificate: 'yes' }).scores.skillTransferability, 100);
});
test('Canadian education is only counted when confirmed; selections do not auto-infer points', () => {
  assert.equal(score({ studiedInCanada: 'no', canadianEducationCredential: 'three-plus' }).scores.canadianEducation, 0);
  assert.equal(score({ studiedInCanada: 'yes', canadianEducationCredential: 'one-two' }).scores.canadianEducation, 15);
});
test('November policy activates on the effective Toronto date, not earlier', () => {
  assert.equal(getDefaultRules(new Date('2026-10-24T12:00:00Z')), '2025-03');
  assert.equal(getDefaultRules(new Date('2026-11-03T04:59:00Z')), '2025-03');
  assert.equal(getDefaultRules(new Date('2026-11-03T05:00:00Z')), '2026-11');
  assert.equal(score({ highWageJobOffer: 'level3', highWageExperience: 'level3' }).scores.labourMarketIntegration, 0);
});
test('November rules choose the larger work-or-offer score, never both', () => {
  const result = score({ rulesVersion: '2026-11', canadianWorkExperience: '2', highWageExperience: 'level2', highWageJobOffer: 'level3' });
  assert.equal(result.scores.labourMarketIntegration, 100); // max(53 + 40, 100)
  assert.equal(score({ rulesVersion: '2026-11', canadianWorkExperience: '5', highWageExperience: 'level3', highWageJobOffer: 'level3' }).scores.labourMarketIntegration, 150);
  assert.equal(score({ rulesVersion: '2026-11', canadianWorkExperience: '0', highWageExperience: 'level3' }).scores.highWageExperience, 0);
});
test('all high-wage bands and spouse work maximum are applied independently', () => {
  for (const [band, work, offer] of [['none', 0, 0], ['level1', 20, 50], ['level2', 40, 70], ['level3', 70, 100]]) {
    const result = score({ rulesVersion: '2026-11', hasSpouse: 'yes', canadianWorkExperience: '5', highWageExperience: band, highWageJobOffer: band });
    assert.equal(result.scores.highWageExperience, work);
    assert.equal(result.scores.jobOffer, offer);
    assert.equal(result.scores.labourMarketIntegration, 70 + work);
  }
});
