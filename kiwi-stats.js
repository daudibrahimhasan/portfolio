// Shared client-side Kiwi stats + achievement system. No backend — localStorage only.
export const ACHIEVEMENTS = [
  { id: 'personal-space', name: 'Personal Space', description: 'Apparently five clicks was the limit.', icon: '👆', howTo: 'Clicked Kiwi 5 times' },
  { id: 'kiwi-tormentor', name: 'Kiwi Tormentor', description: 'At this point, it feels personal.', icon: '😈', howTo: 'Clicked Kiwi 10 times' },
  { id: 'snack-dealer', name: 'Snack Dealer', description: "You've become a reliable food source.", icon: '🍇', howTo: 'Fed Kiwi 5 snacks' },
  { id: 'absolutely-stuffed', name: 'Absolutely Stuffed', description: 'He said he was full three snacks ago.', icon: '🥱', howTo: 'Fed Kiwi 10 snacks' },
  { id: 'wrong-kiwi', name: 'Wrong Kiwi', description: 'There are two kinds of kiwi. This was the wrong one.', icon: '🥝', howTo: 'Tried to feed Kiwi a kiwi fruit' },
  { id: 'flight-school-dropout', name: 'Flight School Dropout', description: 'Still technically airborne.', icon: '🪂', howTo: 'Triggered the parachute' },
  { id: 'professional-stalker', name: 'Professional Stalker', description: 'Are we just going to stare at each other?', icon: '👀', howTo: 'Hovered over Kiwi for 10 seconds' },
  { id: 'researcher', name: 'Researcher', description: "You're really doing your research.", icon: '🔍', howTo: 'Viewed 3 unique case studies' },
  { id: 'completionist', name: 'Completionist', description: 'You saw everything?!', icon: '✨', howTo: 'Viewed every case study' },
  { id: 'secret-society', name: 'Secret Society', description: "You weren't supposed to find this.", icon: '🥷', howTo: 'Discovered /kiwi' },
  { id: 'disco-fever', name: 'Dancing Kiween', description: 'Maximum boogie achieved', icon: '🪩', howTo: 'Turned on the disco ball' },
  { id: 'you-work-here-now', name: 'You Work Here Now', description: 'At this point, onboarding would be easier.', icon: '🪪', howTo: 'Unlocked every other Kiwi Mischief' }
];
const COMPLETION_META_ID = 'you-work-here-now';

const STORAGE_KEY = 'kiwiStats';
const DEFAULTS = { clicks: 0, snacksFed: 0, wrongKiwiAttempted: false, caseStudiesViewed: [], parachuteTriggered: false, kiwiPageDiscovered: false, achievements: [] };

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function safeGet() {
  if (typeof window === 'undefined') return { ...DEFAULTS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const fresh = { ...DEFAULTS, resetDate: todayStr() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      return fresh;
    }
    const parsed = { ...DEFAULTS, ...JSON.parse(raw) };
    if (parsed.resetDate !== todayStr()) {
      const fresh = { ...DEFAULTS, resetDate: todayStr() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      return fresh;
    }
    return parsed;
  } catch (e) { return { ...DEFAULTS, resetDate: todayStr() }; }
}
function safeSet(stats) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(stats)); } catch (e) {}
}

const COMPLETION_KEY = 'kiwiCompletion';
function getCompletionState() {
  if (typeof window === 'undefined') return { completed: false, celebrated: false };
  try {
    const raw = localStorage.getItem(COMPLETION_KEY);
    return raw ? { completed: false, celebrated: false, ...JSON.parse(raw) } : { completed: false, celebrated: false };
  } catch (e) { return { completed: false, celebrated: false }; }
}
function setCompletionState(s) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(COMPLETION_KEY, JSON.stringify(s)); } catch (e) {}
}
export function hasKiwiCompletedEver() { return getCompletionState().completed; }
export function markKiwiImpressedSession() {
  if (typeof window === 'undefined') return;
  try { sessionStorage.setItem('kiwiImpressedSession', '1'); } catch (e) {}
}
export function isKiwiImpressedSession() {
  if (typeof window === 'undefined') return false;
  try { return sessionStorage.getItem('kiwiImpressedSession') === '1'; } catch (e) { return false; }
}

let _achAudio = null;
function playAchievementSound() {
  if (typeof window === 'undefined') return;
  if (window.__kiwiSfxMuted) return;
  try {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!_achAudio) {
      _achAudio = new Audio(new URL('./assets/kiwi-achievement.mp3', import.meta.url).href);
      _achAudio.volume = 0.5;
    }
    _achAudio.currentTime = 0;
    const p = _achAudio.play();
    if (p && p.catch) p.catch(() => {});
  } catch (e) {}
}

let _allAchAudio = null;
function playAllAchievementsSound() {
  if (typeof window === 'undefined') return;
  if (window.__kiwiSfxMuted) return;
  try {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!_allAchAudio) {
      _allAchAudio = new Audio(new URL('./assets/kiwi-all-achievements.mp3', import.meta.url).href);
      _allAchAudio.volume = 0.6;
    }
    _allAchAudio.currentTime = 0;
    const p = _allAchAudio.play();
    if (p && p.catch) p.catch(() => {});
  } catch (e) {}
}

export function getKiwiStats() { return safeGet(); }

export function unlockAchievement(id) {
  const stats = safeGet();
  if (stats.achievements.includes(id)) return false;
  stats.achievements.push(id);
  safeSet(stats);
  const ach = ACHIEVEMENTS.find((a) => a.id === id);
  if (ach && typeof window !== 'undefined') {
    if (id !== COMPLETION_META_ID) playAchievementSound();
    window.dispatchEvent(new CustomEvent('kiwiachievement', { detail: { ...ach, unlockedCount: stats.achievements.length } }));
  }
  maybeUnlockCompletionMeta();
  return true;
}

function maybeUnlockCompletionMeta() {
  const stats = safeGet();
  if (!stats.achievements.includes(COMPLETION_META_ID)) {
    const others = ACHIEVEMENTS.filter((a) => a.id !== COMPLETION_META_ID).map((a) => a.id);
    if (others.every((id) => stats.achievements.includes(id))) {
      unlockAchievement(COMPLETION_META_ID);
      return;
    }
  }
  const stats2 = safeGet();
  if (stats2.achievements.length === ACHIEVEMENTS.length) fireFullCompletionIfNeeded();
}

function fireFullCompletionIfNeeded() {
  const comp = getCompletionState();
  if (!comp.celebrated) {
    setCompletionState({ completed: true, celebrated: true });
    playAllAchievementsSound();
    if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('kiwifullcompletion'));
  } else if (!comp.completed) {
    setCompletionState({ completed: true, celebrated: true });
  }
}

export function hasAchievement(id) { return safeGet().achievements.includes(id); }

export function getAchievementProgress() {
  const stats = safeGet();
  return { unlocked: stats.achievements.length, total: ACHIEVEMENTS.length };
}

export function incrementKiwiClicks() {
  const stats = safeGet();
  stats.clicks += 1;
  safeSet(stats);
  if (stats.clicks === 5) unlockAchievement('personal-space');
  if (stats.clicks === 10) unlockAchievement('kiwi-tormentor');
  return stats.clicks;
}

export function recordKiwiSnack() {
  const stats = safeGet();
  stats.snacksFed += 1;
  safeSet(stats);
  if (stats.snacksFed === 5) unlockAchievement('snack-dealer');
  if (stats.snacksFed === 10) unlockAchievement('absolutely-stuffed');
  return stats.snacksFed;
}

export function recordWrongKiwiAttempt() {
  const stats = safeGet();
  stats.wrongKiwiAttempted = true;
  safeSet(stats);
  unlockAchievement('wrong-kiwi');
}

export function recordParachuteTriggered() {
  const stats = safeGet();
  if (stats.parachuteTriggered) return;
  stats.parachuteTriggered = true;
  safeSet(stats);
  unlockAchievement('flight-school-dropout');
}

export function recordCaseStudyView(id, totalCount) {
  const stats = safeGet();
  if (!stats.caseStudiesViewed.includes(id)) {
    stats.caseStudiesViewed.push(id);
    safeSet(stats);
  }
  if (stats.caseStudiesViewed.length >= 3) unlockAchievement('researcher');
  if (typeof totalCount === 'number' && totalCount > 0 && stats.caseStudiesViewed.length >= totalCount) unlockAchievement('completionist');
}

export function checkNightOwl() {
  return;
}

export function recordKiwiPageDiscovered() {
  const stats = safeGet();
  if (stats.kiwiPageDiscovered) return;
  stats.kiwiPageDiscovered = true;
  safeSet(stats);
  unlockAchievement('secret-society');
}
