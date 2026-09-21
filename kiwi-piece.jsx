const { SceneStage } = window;
const { useTweaks, TweaksPanel, TweakSection, TweakToggle, TweakSlider } = window;

let KiwiStats = null;
if (typeof window !== 'undefined') {
  import('./kiwi-stats.js').then((m) => { KiwiStats = m; });
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "motionEditor": true,
  "blink": true,
  "feetIntensity": 50
}/*EDITMODE-END*/;

const OTHER_PATHS = [
  {fill:"#AABEFF", d:"M251.909 115.746c4.256 11.977 5.398 25.283 2.442 37.676-3.485 13.566-10.598 26.163-19.838 36.706-5.713 6.095-13.346 10.242-21.245 12.898-4.777 1.54-10.018 1.947-14.854 2.917-2.649.872-5.348 2.053-8.147 1.793-6.913-.563-11.898-5.582-16.567-10.136-.729-.611-1.507-1.174-2.285-1.736-3.064.098-6.078.611-9.092 1.125-2.955.358-5.919 1.686-8.875.92-4.678-1.279-6.235-6.249-9.298-9.264-2.757-2.819-6.235-4.661-9.456-6.86-14.431-8.857-22.487-21.454-28.299-36.862-3.999-11.521-5.763-23.547-9.762-35.019-1.043-3.431-2.136-6.445-3.535-9.623-4.206-10.495-8.67-20.883-13.554-31.076C74.402 57.79 70.511 46.17 77.88 35.88c.679-2.608 3.585-6.502 4.363-7.472 7.949-9.166 20.724-14.185 32.771-10.804 10.805 2.46 17.867 9.729 23.729 18.48 6.963 9.524 12.834 17.974 24.052 22.887 4.62 2.453 9.704 3.683 14.796 4.913 6.284 1.59 12.519 3.325 18.745 5.068 14.282 3.789 27.53 11.057 38.484 20.883 2.285 1.948 4.264 4.302 5.978 6.763 1.656 1.434 3.32 4.71 4.148 5.63 2.807 4.196 5.299 8.702 6.963 13.518"},
];
const BEAK_D = "M82.194 38.952c-2.128 2.819-4.935 8.033-9.034 7.422-2.707-.61-4.992-2.403-7.584-3.43-4.413-1.996-8.776-4.041-13.19-5.94-8.833-3.943-17.916-7.219-26.958-10.592-18.28-6.2-33.598-15-20.566-13.061 5.614.872 11.012 2.819 16.518 4.147 9.761 2.567 19.523 5.223 29.293 7.635 20.823 5.37 24.98 5.475 28.35 4.147 1.82-.717 4.056-2.004 5.92-.929 3.377 1.996-2.02 9.42-2.75 10.6";
const BEAK_ORIGIN = { x: 84, y: 29 };
const OTHER_PATHS2 = [
  {fill:"#5C81FA", d:"M109.252 43.612c-1.193-.562-2.079-2.102-1.507-3.381.571-1.28 2.335-1.385 3.321-.611 2.029 1.532.886 4.913-1.814 3.992"},
  {fill:"#5C81FB", d:"M120.835 112.821c-.837-1.28-1.507-2.608-2.236-3.936-.265-.562-.365-1.132-.05-1.744.671-1.026 2.128-.562 2.543.408.778 1.23 1.556 2.461 2.236 3.74.877 1.589-1.458 3.023-2.493 1.532m7.94 12.034c-.257-.464-.671-.921-.779-1.483-.256-1.124 1.093-2.053 2.029-1.385.828.619 1.35 1.589 1.971 2.404.679 1.287 2.857 3.128 1.193 4.457-.572.407-1.4.309-1.864-.204-.993-1.125-1.714-2.51-2.55-3.789m-11.161-4.555c.621-.203 1.192 0 1.557.457.828 1.588 1.606 3.177 2.592 4.709.836 1.54-1.499 2.974-2.493 1.491-.778-1.434-4-5.785-1.656-6.657m-3.121 7.831c1.3 2.199 2.029 4.758 3.635 6.811.994 1.377-1.035 2.966-2.178 1.736-1.764-1.842-2.6-4.294-3.478-6.6-.836-1.483.621-3.178 2.021-1.947m11.219 6.404c.679-.261 1.399.146 1.664.766.621 1.483 1.507 2.868 2.286 4.302.729 1.426-1.35 2.656-2.286 1.377-.571-.766-1.192-1.589-1.615-2.453-.463-1.181-1.714-3.283-.049-3.992m2.806 22.366c.522-.204 1.193 0 1.507.464.621.97 1.301 1.948 1.971 2.917.986 1.434-1.035 3.023-2.236 1.744-.828-1.182-1.863-2.412-2.128-3.846-.05-.513.315-1.076.886-1.279m2.649-88.869c1.764-2.2 3.843 2.354 4.721 3.528.729 1.336-1.143 2.664-2.178 1.54-.729-.718-1.242-1.54-1.814-2.355-.522-.766-1.358-1.793-.729-2.714m1.763-7.528c-.521-1.328 1.301-2.404 2.286-1.328.779.97 1.507 1.89 2.336 2.81 1.142 1.231-.622 3.024-1.922 1.948-1.093-1.027-2.078-2.151-2.7-3.43M147.42 75.3c1.557-.718 2.335 1.385 3.379 2.2 1.242 1.385-.836 3.226-2.137 1.898-.927-1.076-3.114-2.917-1.242-4.099m59.515 22.627c1.557.62 2.492 2.257 3.428 3.536.621.921 1.507 2.51.158 3.219-.622.309-1.35.106-1.764-.408-.887-1.23-1.615-2.558-2.651-3.634-1.25-1.026-.935-2.81.829-2.713m10.233 1.842c1.813-1.019 3.577 3.634 4.364 4.864.721 1.434-1.408 2.713-2.344 1.385-.513-.823-.985-1.695-1.507-2.509-.571-1.125-2.128-2.82-.513-3.74m-12.204 13.672c2.079.203 3.222 2.713 4.05 4.4.571 1.54-1.714 2.558-2.543 1.075-.679-1.075-1.3-2.306-2.236-3.169-.935-.717-.414-2.257.729-2.306m20.716 11.57c-.157-2.257-.671-4.457-1.764-6.404-.522-1.329 1.4-2.453 2.335-1.377.414.407.679.969.886 1.482.671 1.434 2.601 7.423 0 7.578-.728.049-1.349-.562-1.457-1.279m3.899-16.125c1.971-.513 2.957 3.227 3.578 4.604.571 1.54-1.764 2.558-2.542 1.075-.307-1.532-3.272-4.758-1.036-5.679m4.571 24.721c1.656-.147 1.714 1.898 1.813 3.023 0 1.328.572 3.837-1.399 3.992-1.822-.098-1.3-2.151-1.35-3.324.05-1.279-.936-3.382.936-3.691m5.141-9.721c1.656-.105 1.607 1.94 1.814 3.072.049 1.328.679 3.838-1.3 3.936-1.657 0-1.35-2.094-1.45-3.072 0-1.279-.985-3.577.936-3.936m-23.58 23.703c-.158-1.589-.207-3.276-1.036-4.71-.728-1.23.928-2.566 2.021-1.637 1.251 1.018 3.064 7.267.572 7.52-.729.049-1.508-.456-1.557-1.173m8.983 3.169c.522-.717 1.615-.611 2.129.057.571 1.174.265 2.608.364 3.887-.207 1.54.315 5.32-2.021 5.174-.729-.106-1.25-.823-1.143-1.54.257-1.532.356-3.121.356-4.71.058-.969-.207-1.996.315-2.868m-18.488-2.656c2.236-.978 3.271 5.117 3.428 6.6.207 1.638-2.236 2.102-2.65.513-.306-1.947-.878-3.789-1.557-5.581-.157-.611.207-1.279.779-1.532m-4.463 10.592c.936 1.182 3.114 5.329.829 5.989-.729.204-1.508-.253-1.715-.97-.364-1.181-.621-2.403-1.192-3.536-.729-1.222.985-2.509 2.078-1.483m14.796 14.895c1.979.513.836 3.071.779 4.457-.464 1.385-.622 4.457-2.7 4.041-2.129-.815-.05-3.577 0-5.068.364-1.173 0-3.577 1.921-3.43"},
];
const BELLY_LINE_D = "M148.72 150.301c1.242-1.385 3.527-.204 3.163 1.581.207 9.573 2.856 18.846 7.22 27.344a54.7 54.7 0 0 0 13.553 16.581c.629.464.779 1.076.679 1.638a72 72 0 0 0-1.979-1.532c-1.192.049-2.434.204-3.634.31-10.176-9.273-17.131-21.967-19.06-35.485-.513-2.859-.828-5.785-.621-8.645.108-.717.265-1.279.679-1.792m2.385-41.114c-.05-.921.679-1.842 1.665-1.891.985 0 1.821.611 1.921 1.638.05.921-.671 1.841-1.665 1.89-.936 0-1.813-.66-1.921-1.637";
const HAIR_D = "M108.158 18.883c.472.465 1.193.408 1.665.106a1.1 1.1 0 0 0 .571.147c4.984-.92 10.225-2.045 15.218-3.324 2.434-.815 11.368-1.532 11.682-4.4.05-.774-.414-1.337-1.092-1.638-4.621-1.133-9.663-.774-14.175.562 2.542-2.355 5.655-4.408 7.319-7.423.315-.668.364-1.588-.157-2.2-2.385-2.257-7.94 1.426-10.176 2.966-3.428 2.46-6.284 5.582-8.569 9.11-.729 1.434-3.792 4.611-2.286 6.094";
const HAIR_ORIGIN = { x: 110, y: 18 };
const FOOT1_D = "M158.738 193.607c.058.31-.049.562-.207.766.158 6.249.621 12.491.108 18.74-.778 4.099-2.235 8.091-4.206 11.774-2.757 5.068-6.185 9.777-9.977 14.185-1.813 1.736-3.32 5.011-6.127 5.068-4.57-1.385 4.206-14.544 5.556-17.257.571-.969 1.142-1.947 1.772-2.917-.108.106-.207.155-.315.253-.05.057-.108.106-.157.106-3.37 2.762-6.591 5.94-9.919 8.653-2.335 1.792-4.463 4.245-7.477 4.962-6.077-.155 2.236-7.936 3.842-9.468 2.807-2.607 5.506-5.321 8.255-7.985-3.685 2.045-7.526 3.887-11.575 5.117-2.65.823-5.299 3.023-8.205 2.151-1.615-.766-.936-2.558.049-3.585 3.478-3.838 8.727-4.864 12.983-7.374 5.605-2.917 11.633-5.679 16.41-9.777 1.921-2.298 1.192-5.631 1.507-8.393.257-1.434-.207-3.177.571-4.457.257-.252.572-.301.828-.301a1.61 1.61 0 0 1 1.565-.668c1.242-.049 4.305-1.483 4.719.407";
const FOOT2_D = "M195.094 215.215c.572 5.37 2.029 11.31-1.093 16.223-3.999 6.966-8.875 13.517-14.282 19.457-1.507 1.483-3.577 5.533-5.97 5.068-3.891-2.664 4.364-13.362 6.078-16.434.728-1.125 1.449-2.249 2.285-3.325a345 345 0 0 1-8.619 6.144c-2.807 1.89-5.564 3.935-8.57 5.524-1.25.562-2.599 1.279-3.999.921-4.628-2.151 5.192-8.596 7.063-10.185 1.606-1.279 3.27-2.558 4.984-3.74-5.042 2.306-10.233 4.457-15.789 4.71-3.428-.098-3.221-2.966-.522-4.294 7.849-4.302 16.626-6.706 24.616-10.707 1.771-1.124 3.949-2.403 4.57-4.497.315-3.944-.306-7.887-.621-11.782.108-1.377-1.664-5.573.414-5.679h.207c.936-.717 2.6-1.279 3.279-1.483 1.556-.465 6.176-.514 5.083 2.045a.36.36 0 0 1-.207.204c.522 3.894.621 7.887 1.093 11.83";
const EYE_D = "M100.003 52.412c-5.448-1.328-1.764-11.26 3.121-10.08 6.177 1.076 2.078 10.952-3.121 10.08";
const ARM2_D = "M175.049 129.459c-8.412-1.125-12.105-10.185-18.074-15.05-1.557-1.531-3.221-3.014-5.192-4.041-1.763-1.898.671-3.838 2.7-2.762 3.891 2.094 6.905 5.573 9.918 8.751 3.172 3.43 5.871 8.294 10.855 9.215 1.871.253 3.891-.106 4.777-1.947 3.064-6.861 1.557-14.944-1.142-21.657-.729-1.638-1.557-3.219-2.335-4.808-.414-.871-.108-1.996.778-2.46 2.749-1.329 4.049 4.253 5.084 5.939 3.85 7.937 6.648 30.156-7.369 28.82";
const ARM_ORIGIN = { x: 168, y: 96 };

const FOOT1_ORIGIN = { x: 139, y: 195 };
const FOOT2_ORIGIN = { x: 175, y: 202 };
const EYE_CENTER = { x: 101.8, y: 47.3 };
const BLINK_TIMES = [1.1, 2.7];
const BLINK_HALF_WINDOW = 0.11;

const BEND_ORIGIN = { x: 160, y: 197 };
const WORM_D = "M-18 34 C -14 24, -6 24, -3 32 C 0 40, 8 40, 11 30";

const HATS = {
  none: null,
  cap: (
    <g transform="translate(58,-6)">
      <path d="M4 34 Q4 2 46 2 Q88 2 88 34 Z" fill="#f5c518" />
      <rect x="-6" y="30" width="106" height="10" rx="5" fill="#e0ac0a" />
    </g>
  ),
  tophat: (
    <g transform="translate(60,-34)">
      <rect x="10" y="0" width="76" height="46" rx="6" fill="#1c1c24" />
      <rect x="-8" y="42" width="112" height="10" rx="5" fill="#1c1c24" />
    </g>
  ),
  beanie: (
    <g transform="translate(56,-14)">
      <path d="M2 38 Q2 -4 50 -4 Q98 -4 98 38 Z" fill="#2a7f8a" />
      <rect x="-2" y="32" width="104" height="10" rx="5" fill="#1e5f68" />
    </g>
  ),
  party: (
    <g transform="translate(66,-40)">
      <path d="M40 0 L78 56 L2 56 Z" fill="#e8608a" />
      <circle cx="40" cy="-2" r="7" fill="#f5c518" />
    </g>
  )
};

function blinkScaleY(t) {
  let scale = 1;
  for (const t0 of BLINK_TIMES) {
    const dt = Math.abs(t - t0);
    if (dt < BLINK_HALF_WINDOW) {
      const u = dt / BLINK_HALF_WINDOW;
      const envelope = Math.cos((u * Math.PI) / 2);
      scale = Math.min(scale, 1 - envelope * 0.94);
    }
  }
  return scale;
}

function smoothstep(u) {
  const c = Math.max(0, Math.min(1, u));
  return c * c * (3 - 2 * c);
}
const WALK_SHAPE_K = 2.4;
function walkShape(s) { return Math.sign(s) * Math.pow(Math.abs(s), WALK_SHAPE_K); }
function walkUnshape(f) { return Math.sign(f) * Math.pow(Math.abs(f), 1 / WALK_SHAPE_K); }

// Shared bird figure. bendAngle/bendY let a scene tip the whole rigid body
// forward (e.g. pecking the ground); wormOpacity draws an optional worm.
function Bird({ toeAngle, eyeScaleY, armAngle, armY, hairAngle, shadowScaleX, shadowOpacity, bendAngle = 0, bendX = 0, bendY = 0, beakAngle = 0, wormOpacity = 0, hat = 'none', footColor = '#261217', golden = false }) {
  return (
    <svg viewBox="-10 -10 300 290" width="100%" height="100%" style={{ display: 'block', overflow: 'visible' }}>
      <ellipse
        cx={162}
        cy={254}
        rx={52}
        ry={9}
        fill="#1a1420"
        opacity={shadowOpacity}
        style={{ transform: `scaleX(${shadowScaleX})`, transformOrigin: '162px 254px' }}
      />
      <path fill="none" stroke="#8a6a42" strokeWidth={5} strokeLinecap="round" d={WORM_D} opacity={wormOpacity} />
      <g style={{ transform: `translate(${bendX}px, ${bendY}px) rotate(${bendAngle}deg)`, transformOrigin: `${BEND_ORIGIN.x}px ${BEND_ORIGIN.y}px` }}>
        <path
          fill={golden ? '#6B4423' : footColor}
          d={FOOT1_D}
          style={{ transform: `rotate(${toeAngle}deg)`, transformOrigin: `${FOOT1_ORIGIN.x}px ${FOOT1_ORIGIN.y}px` }}
        />
        <path
          fill={golden ? '#6B4423' : footColor}
          d={FOOT2_D}
          style={{ transform: `rotate(${-toeAngle}deg)`, transformOrigin: `${FOOT2_ORIGIN.x}px ${FOOT2_ORIGIN.y}px` }}
        />
        {OTHER_PATHS.map((p, i) => (
          <path key={i} fill={golden ? '#D4A017' : p.fill} d={p.d} />
        ))}
        {OTHER_PATHS2.map((p, i) => (
          <path key={'b' + i} fill={golden ? '#8A5A0A' : p.fill} d={p.d} />
        ))}
        <path
          fill="#E8622B"
          d={BEAK_D}
          style={{ transform: `rotate(${beakAngle}deg)`, transformOrigin: `${BEAK_ORIGIN.x}px ${BEAK_ORIGIN.y}px` }}
        />
        <path fill={golden ? '#C98A0E' : '#5C81FB'} d={BELLY_LINE_D} />
        <g style={{ transform: `translateY(${armY}px) rotate(${armAngle}deg)`, transformOrigin: `${ARM_ORIGIN.x}px ${ARM_ORIGIN.y}px` }}>
          <path fill={golden ? '#C98A0E' : '#5C81FB'} d={ARM2_D} />
        </g>
        <path
          fill={golden ? '#E8C468' : '#AABEFF'}
          d={HAIR_D}
          style={{ transform: `rotate(${hairAngle}deg)`, transformOrigin: `${HAIR_ORIGIN.x}px ${HAIR_ORIGIN.y}px` }}
        />
        <path
          fill="#261217"
          d={EYE_D}
          style={{ transform: `scaleY(${eyeScaleY})`, transformOrigin: `${EYE_CENTER.x}px ${EYE_CENTER.y}px` }}
        />
        {HATS[hat]}
      </g>
    </svg>
  );
}

function idlePose(t, dur, intensity) {
  const freq = (Math.PI * 2 * 2) / dur;
  const phase = t * freq;
  return {
    toeAngle: Math.sin(phase) * 10 * intensity,
    shadowScaleX: 1 - Math.abs(Math.sin(phase)) * 0.08 * intensity,
    shadowOpacity: 0.22 - Math.sin(phase) * 0.04 * intensity,
    armAngle: Math.sin(phase + Math.PI / 4) * 7 * intensity,
    armY: Math.sin(phase + Math.PI / 4) * 2.5 * intensity,
    hairAngle: Math.sin(phase * 0.5) * 9 * intensity,
  };
}

function Idle({ localTime, dur, tweaks }) {
  const intensity = (tweaks && typeof tweaks.feetIntensity === 'number' ? tweaks.feetIntensity : 50) / 50;
  const pose = idlePose(localTime, dur, intensity);
  const blinkOn = !tweaks || tweaks.blink !== false;
  const eyeScaleY = blinkOn ? blinkScaleY(localTime) : 1;
  return <Bird {...pose} eyeScaleY={eyeScaleY} />;
}

// Bends the whole figure forward on a hold-shaped envelope: ease down,
// pause at the bottom (with two quick peck bobs) to grab the worm, ease
// back up. progress 0 and 1 both settle at the resting pose (frame-match).
function Peck({ progress, tweaks }) {
  const intensity = (tweaks && typeof tweaks.feetIntensity === 'number' ? tweaks.feetIntensity : 50) / 50;
  let envelope;
  if (progress < 0.35) envelope = smoothstep(progress / 0.35);
  else if (progress < 0.65) envelope = 1;
  else envelope = 1 - smoothstep((progress - 0.65) / 0.35);

  const peckBob = progress > 0.35 && progress < 0.65 ? Math.abs(Math.sin((progress - 0.35) / 0.3 * Math.PI * 2)) * 3 : 0;
  const bendAngle = 0;
  const bendX = 0;
  const bendY = 0;
  const beakAngle = 0;
  const toeAngle = 6 * envelope * intensity;
  const blinkOn = !tweaks || tweaks.blink !== false;
  const eyeScaleY = blinkOn && progress > 0.3 && progress < 0.45 ? 0.1 : 1;
  const wormOpacity = progress > 0.15 && progress < 0.58 ? smoothstep(Math.min(progress - 0.15, 0.58 - progress) / 0.08) : 0;
  const shadowScaleX = 1 - envelope * 0.05;
  const shadowOpacity = 0.22 + envelope * 0.05;

  return (
    <Bird
      toeAngle={toeAngle}
      eyeScaleY={eyeScaleY}
      armAngle={0}
      armY={0}
      hairAngle={4 * envelope}
      shadowScaleX={shadowScaleX}
      shadowOpacity={shadowOpacity}
      bendAngle={bendAngle}
      bendX={bendX}
      bendY={bendY}
      beakAngle={beakAngle}
      wormOpacity={wormOpacity}
    />
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const IdleWithTweaks = (props) => <Idle {...props} tweaks={t} />;
  const PeckWithTweaks = (props) => <Peck {...props} tweaks={t} />;
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <SceneStage width={1600} height={1200} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#f4f1ea">
        {{ Idle: IdleWithTweaks }}
      </SceneStage>
      <TweaksPanel>
        <TweakSection label="Motion" />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
        <TweakToggle label="Eyes blink" value={t.blink} onChange={(v) => setTweak('blink', v)} />
        <TweakSlider label="Feet motion" value={t.feetIntensity} min={0} max={150} unit="%" onChange={(v) => setTweak('feetIntensity', v)} />
      </TweaksPanel>
    </div>
  );
}

window.KiwiLogoAnim = App;
const TOOLTIP_MESSAGES = ['hi!', 'hello there!', 'kia ora!', "let's design!", 'chirp chirp'];
const SLEEP_MESSAGES = ['Goodnight!', 'Time for a snooze.', 'Sweet dreams!'];
const WAKE_MESSAGES = ['Good morning!', "I'm awake!", 'Did I miss anything?', "What's for breakfast?"];
const FEED_REACTIONS = ['Yummy!', "Thank you! I've been looking for a snack.", 'Nom nom nom!', 'Delicious!', 'My favorite!', 'More, please!', 'That hit the spot!', 'So tasty!'];
const KIWI_FRUIT_REACTIONS = ["I can't eat myself!", "That's cannibalism!", 'Wait\u2026 that looks like me!', 'Absolutely not!', 'Kiwi is not on the menu!'];
const FULL_REACTIONS = ["I'm full!", "I'm chocka!", "That hit the spot!", "Food coma!", "No more room!", "Tummy full!", "Nap time!"];
const ALREADY_FULL_REACTIONS = ["Still full!", "No more!", "Save it!", "I'm stuffed!", "Maybe later!"];
const PICKUP_MESSAGES = ['Oh! We\u2019re going somewhere?', 'Up we go!', 'Careful with the feathers!', 'A surprise adventure!', 'Wheeee!', 'Where are we going?', 'This is the closest I get to flying!', 'I can\u2019t fly, but this works.', 'My little legs are dangling!', 'A little to the left\u2026', 'Portfolio tour!', 'Faster! Actually\u2014not too fast.'];
const DRAG_LONG_MESSAGES = ['Are we there yet?', 'You know I can walk, right?', 'Should I pack a snack?', 'I\u2019m getting dizzy!'];
const DROP_MESSAGES = ['Perfect!', 'Thanks for the lift!', 'I meant to land here.', 'New spot\u2014I like it!', 'Okay, this is my corner now.', 'Much better.', 'I\u2019ll stay here for a bit.'];
const LOCATION_TOP_MSG = 'Look at the view!';
const LOCATION_FEED_MSG = 'Is this a snack stop?';
const LOCATION_CONTACT_MSG = 'Are we networking?';
const LOCATION_EDGE_MSG = 'Hey! Don\u2019t lose me!';
const LOCATION_OFFSCREEN_MSG = 'I still work here!';
const FALLING_MESSAGES = ['Uh oh…', 'Gravity!', 'Can’t fly!', 'Tiny wings!', 'Wheeee, wait!', 'Incoming!', 'Just falling!', 'Why me?!', 'Mayday!', 'Bad idea!', 'Again?!', 'Catch me!'];
const LANDING_MESSAGES = ['Nailed it.', 'I’m okay!', 'Act natural.', 'Stuck the landing!', 'Back where I belong.', 'Nobody saw that, right?', 'The ground missed me.', 'Let’s not do that again.'];
const PARACHUTE_MSG = 'Not this time!';
const PARACHUTE_LANDING_MESSAGES = ['Nailed it!', 'Much better.', 'Safety first!', 'Came prepared!'];
let fallCount = 0;
const CLICK_MESSAGES = ['Did you boop my beak? My nostrils are right at the tip!', 'I can smell that clicking finger from here!', 'Careful with the fluff, my feathers are more like hair!', 'I’m trying to fly, but my tiny wings aren’t helping!', 'You caught me awake, I’m usually nocturnal!', 'Careful! My egg can weigh 20% of my body!', 'You just clicked one of five kiwi species!', 'I can’t fly from your clicks, but I can run!', 'You just clicked an elephant bird’s tiny cousin!', 'Sorry, I’m taken, kiwi couples can stay together for years!', 'Hey!', 'Again?', 'I felt that.', 'Excuse me?', 'Personal space!', 'That’s my beak!', 'Do I look clickable?', 'Very curious…', 'Feed me instead!', 'I’m working here!', 'Clicking won’t make me fly.', 'Tiny wings. Still no flying.', 'Careful with my feathers!', 'You booped my super-sniffer!', 'Flightless, not feelingless!', 'That’s one rare click.', 'Please don’t ruffle me.'];
const EXCLUSIVE_CLICK_MESSAGE = 'Okay\u2026 you really found everything.';
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}
function drawFromBag(bagRef, pool, last) {
  if (bagRef.current.length === 0) {
    let fresh = shuffleArray(pool);
    if (fresh[0] === last && fresh.length > 1) {
      const swapAt = 1 + Math.floor(Math.random() * (fresh.length - 1));
      const tmp = fresh[0]; fresh[0] = fresh[swapAt]; fresh[swapAt] = tmp;
    }
    bagRef.current = fresh;
  }
  return bagRef.current.shift();
}
let feedCount = 0;
let kiwiFullness = 0;
let lastFullMsg = null;
let lastAlreadyFullMsg = null;
let lastFeedAt = Date.now();
let lastDecayAt = null;
let shownPeckish = false;
let shownSnackTime = false;

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function pickNoRepeat(arr, lastGetter, lastSetter) {
  if (arr.length <= 1) return arr[0];
  let choice;
  do { choice = pick(arr); } while (choice === lastGetter());
  lastSetter(choice);
  return choice;
}
function pickDifferent(arr, last) {
  if (arr.length <= 1) return arr[0];
  let m;
  do { m = pick(arr); } while (m === last);
  return m;
}

const FOODS = {
  worms: <path d="M6 20 C10 12, 18 12, 21 18 C24 24, 30 24, 33 16" stroke="#a9743a" strokeWidth="4" fill="none" strokeLinecap="round" />,
  berries: (
    <g>
      <circle cx="14" cy="18" r="7" fill="#6b2fa0" />
      <circle cx="24" cy="14" r="7" fill="#8a3fc4" />
      <circle cx="22" cy="24" r="6" fill="#5a2685" />
    </g>
  ),
  seeds: (
    <g fill="#c9a24a">
      <ellipse cx="10" cy="14" rx="3" ry="5" transform="rotate(-20 10 14)" />
      <ellipse cx="18" cy="20" rx="3" ry="5" transform="rotate(15 18 20)" />
      <ellipse cx="26" cy="12" rx="3" ry="5" transform="rotate(-10 26 12)" />
      <ellipse cx="24" cy="24" rx="3" ry="5" transform="rotate(25 24 24)" />
    </g>
  ),
  plants: <path d="M18 30 L18 10 M18 14 Q10 12 8 4 Q18 6 18 16 M18 18 Q26 16 28 8 Q18 10 18 20" fill="#3f9a4f" stroke="#3f9a4f" strokeWidth="2" strokeLinejoin="round" />,
  kiwi: (
    <g>
      <circle cx="18" cy="18" r="12" fill="#a9743a" />
      <circle cx="18" cy="18" r="9" fill="#c7e06a" />
      <circle cx="18" cy="18" r="3" fill="#f4f1ea" />
    </g>
  )
};

let _feedAudio = null;
function playFeedSound() {
  if (typeof window !== 'undefined' && window.__kiwiSfxMuted) return;
  try {
    if (!_feedAudio) {
      _feedAudio = new Audio('./assets/kiwi-feed.mp3?v=2');
      _feedAudio.volume = 0.5;
      _feedAudio.addEventListener('timeupdate', () => {
        if (_feedAudio.currentTime >= 1) { _feedAudio.pause(); _feedAudio.currentTime = 0; }
      });
    }
    _feedAudio.currentTime = 0;
    const p = _feedAudio.play();
    if (p && p.catch) p.catch(() => {});
  } catch (e) {}
}

function playTapSound() {
  playFeedSound();
}

function FoodPicker({ dark = false }) {
  const iconColor = dark ? '#1c1c24' : '#fff';
  const ringColor = dark ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.3)';
  const ringColorActive = dark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.5)';
  const hoverBg = dark ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.12)';
  const [open, setOpen] = React.useState(false);
  const [hoverId, setHoverId] = React.useState(null);
  const containerRef = React.useRef(null);
  const popupRef = React.useRef(null);
  const [popupPos, setPopupPos] = React.useState(null);
  const [btnHovered, setBtnHovered] = React.useState(false);
  const [tipPos, setTipPos] = React.useState(null);
  const [fullness, setFullnessState] = React.useState(kiwiFullness);
  const [pulsing, setPulsing] = React.useState(false);
  const [shaking, setShaking] = React.useState(false);
  const isTouch = typeof window !== 'undefined' && 'ontouchstart' in window;
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  React.useEffect(() => {
    function onFullness(e) { setFullnessState(e.detail); }
    window.addEventListener('kiwifullness', onFullness);
    return () => window.removeEventListener('kiwifullness', onFullness);
  }, []);

  React.useLayoutEffect(() => {
    if (btnHovered && !open && containerRef.current) {
      const r = containerRef.current.getBoundingClientRect();
      const w = 96, pad = 10;
      let left = r.left + r.width / 2;
      left = Math.min(Math.max(left, pad + w / 2), window.innerWidth - pad - w / 2);
      setTipPos({ top: r.bottom + 8, left });
    }
  }, [btnHovered, open]);

  React.useLayoutEffect(() => {
    if (open) {
      const mobile = window.innerWidth < 768;
      if (mobile) {
        const anchor = document.getElementById('kiwi-food-anchor');
        const ar = anchor && anchor.getBoundingClientRect();
        if (ar && ar.top > 12 && ar.left > -1) {
          setPopupPos({ top: ar.top + 12, left: ar.left, width: ar.width });
        } else {
          const w = Math.min(340, window.innerWidth - 24);
          setPopupPos({ top: Math.max(12, window.innerHeight * 0.18), left: Math.round((window.innerWidth - w) / 2), width: w });
        }
        return;
      }
      const anchor = document.getElementById('kiwi-food-anchor');
      if (anchor) {
        const r = anchor.getBoundingClientRect();
        const w = Math.min(r.width, window.innerWidth - 24);
        const left = Math.max(12, Math.min(r.left, window.innerWidth - 12 - w));
        setPopupPos({ top: r.top, left, width: w });
      } else if (containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        setPopupPos({ top: r.bottom + 10, right: Math.max(12, window.innerWidth - r.right) });
      }
    }
  }, [open]);

  function openNow() {
    setOpen(true);
  }

  React.useEffect(() => {
    if (!open) return;
    function onDocClick(e) {
      const inBtn = containerRef.current && containerRef.current.contains(e.target);
      const inPopup = popupRef.current && popupRef.current.contains(e.target);
      if (!inBtn && !inPopup) setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [open]);

  React.useEffect(() => {
    function onClose() { setOpen(false); }
    window.addEventListener('kiwiclosepicker', onClose);
    return () => window.removeEventListener('kiwiclosepicker', onClose);
  }, []);

  function feed(id) {
    let message;
    if (id === 'kiwi') {
      message = pick(KIWI_FRUIT_REACTIONS);
      if (KiwiStats) KiwiStats.recordWrongKiwiAttempt();
    } else if (kiwiFullness >= 100) {
      message = pickNoRepeat(ALREADY_FULL_REACTIONS, () => lastAlreadyFullMsg, (v) => { lastAlreadyFullMsg = v; });
      if (!reducedMotion) {
        setShaking(true);
        setTimeout(() => setShaking(false), 320);
      }
    } else {
      feedCount += 1;
      if (KiwiStats) KiwiStats.recordKiwiSnack();
      const next = Math.min(100, kiwiFullness + 10);
      kiwiFullness = next;
      lastFeedAt = Date.now();
      lastDecayAt = null;
      shownPeckish = false;
      shownSnackTime = false;
      setFullnessState(next);
      window.dispatchEvent(new CustomEvent('kiwifullness', { detail: next }));
      if (next >= 100) {
        message = pickNoRepeat(FULL_REACTIONS, () => lastFullMsg, (v) => { lastFullMsg = v; });
        if (!reducedMotion) {
          setPulsing(true);
          setTimeout(() => setPulsing(false), 420);
        }
      } else {
        message = pick(FEED_REACTIONS);
      }
    }
    window.dispatchEvent(new CustomEvent('kiwifeed', { detail: message }));
    window.dispatchEvent(new CustomEvent('kiwifooddrop', { detail: { type: id } }));
  }

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <button
        type="button"
        aria-label="Feed Kiwi"
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        onClick={(e) => { e.stopPropagation(); setBtnHovered(false); setOpen((o) => !o); }}
        style={{
          all: 'unset',
          cursor: 'pointer',
          width: 30,
          height: 30,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1.5px solid ${(btnHovered || open) ? ringColorActive : ringColor}`,
          background: (btnHovered || open) ? hoverBg : 'transparent',
          boxShadow: open ? `0 0 0 2px ${ringColorActive}` : 'none',
          transition: 'background 0.15s ease, border-color 0.15s ease'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round">
          <path d="M6 3v7a3 3 0 0 0 3 3v8" />
          <path d="M6 3v5M9 3v5" />
          <path d="M18 3c-2 2-2 6-2 8a2 2 0 0 0 2 2v8" />
        </svg>
      </button>
      {tipPos && ReactDOM.createPortal(
        <div style={{
          position: 'fixed', top: tipPos.top, left: tipPos.left,
          transform: `translateX(-50%) translateY(${(btnHovered && !open) ? '0px' : '4px'})`,
          opacity: (btnHovered && !open) ? 1 : 0,
          transition: 'opacity 0.18s ease, transform 0.18s ease',
          background: '#1c1c24', color: '#f7f2e8', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
          fontSize: 11, padding: '9px 16px', borderRadius: 10, whiteSpace: 'nowrap', zIndex: 60, pointerEvents: 'none'
        }}>Feed Kiwi</div>, document.body
      )}
      {ReactDOM.createPortal(
      <div
          ref={popupRef}
          style={{
            position: 'fixed',
            top: popupPos ? popupPos.top : 0,
            left: popupPos && popupPos.left != null ? popupPos.left : undefined,
            width: popupPos && popupPos.width != null ? popupPos.width : undefined,
            right: popupPos && popupPos.right != null ? popupPos.right : undefined,
            maxWidth: 'calc(100vw - 24px)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            background: '#1c1c24',
            borderRadius: 12,
            padding: '10px 12px 12px',
            boxShadow: '0 12px 24px rgba(0,0,0,0.25)',
            zIndex: 50,
            opacity: open ? 1 : 0,
            transform: `translateY(${open ? 0 : -8}px) scale(${open ? 1 : 0.94})`,
            transformOrigin: 'top left',
            pointerEvents: open ? 'auto' : 'none',
            transition: 'opacity 0.18s ease, transform 0.22s cubic-bezier(0.34,1.56,0.64,1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
              <span style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                fontSize: 10,
                fontWeight: 400,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'rgba(244,241,234,0.55)',
                flex: 'none'
              }}>Hungry</span>
              <div
                role="progressbar"
                aria-label="Kiwi fullness"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={fullness}
                style={{
                  flex: 1,
                  minWidth: 40,
                  height: 6,
                  borderRadius: 999,
                  background: 'rgba(244,241,234,0.08)',
                  border: '1px solid rgba(244,241,234,0.18)',
                  overflow: 'hidden',
                  transform: shaking ? 'translateX(2px)' : 'translateX(0)',
                  transition: reducedMotion ? 'none' : 'transform 0.08s ease-in-out'
                }}
              >
                <div style={{
                  height: '100%',
                  width: `${fullness}%`,
                  borderRadius: 999,
                  background: fullness >= 100 ? '#22C55E' : '#F0B429',
                  boxShadow: pulsing ? '0 0 6px 1px rgba(34,197,94,0.9)' : 'none',
                  transform: pulsing ? 'scaleY(1.3)' : 'scaleY(1)',
                  transformOrigin: 'center',
                  transition: reducedMotion ? 'none' : 'width 0.28s ease, box-shadow 0.2s ease, transform 0.2s ease'
                }} />
              </div>
              <span style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                fontSize: 10,
                fontWeight: 400,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'rgba(244,241,234,0.55)',
                flex: 'none'
              }}>Full</span>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={(e) => { e.stopPropagation(); setOpen(false); }}
              style={{ all: 'unset', cursor: 'pointer', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(244,241,234,0.6)', flex: 'none' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4l16 16M20 4L4 20" /></svg>
            </button>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
          {['worms', 'berries', 'seeds', 'plants', 'kiwi'].map((id) => (
            <div key={id} style={{ position: 'relative' }}>
              <button
              onClick={() => { if (id !== 'kiwi') playFeedSound(); feed(id); }}
              onMouseEnter={() => setHoverId(id)}
              onMouseLeave={() => setHoverId((h) => (h === id ? null : h))}
              style={{
                all: 'unset',
                cursor: 'pointer',
                width: 30,
                height: 30,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: hoverId === id ? '1.5px solid rgba(255,255,255,0.5)' : '1.5px solid rgba(255,255,255,0.25)',
                background: hoverId === id ? 'rgba(255,255,255,0.14)' : 'transparent',
                transition: 'background 0.15s ease, border-color 0.15s ease, transform 0.15s ease'
              }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.88)'; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
              >
                <svg width="20" height="20" viewBox="0 0 36 32">{FOODS[id]}</svg>
              </button>
              {hoverId === id ? (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: '50%',
                  transform: 'translateX(-50%) translateY(0px)',
                  background: '#1c1c24',
                  color: '#f4f1ea',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                  fontSize: 11,
                  letterSpacing: '0.02em',
                  padding: '9px 16px',
                  borderRadius: 12,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  opacity: 1,
                  transition: 'opacity 0.18s ease, transform 0.18s ease'
                }}>
                  {id === 'kiwi' ? 'Kiwi fruit' : id.charAt(0).toUpperCase() + id.slice(1)}
                </div>
              ) : (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: '50%',
                  transform: 'translateX(-50%) translateY(4px)',
                  background: '#1c1c24',
                  color: '#f4f1ea',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                  fontSize: 11,
                  letterSpacing: '0.02em',
                  padding: '9px 16px',
                  borderRadius: 12,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  opacity: 0,
                  transition: 'opacity 0.18s ease, transform 0.18s ease'
                }}>
                  {id === 'kiwi' ? 'Kiwi fruit' : id.charAt(0).toUpperCase() + id.slice(1)}
                </div>
              )}
            </div>
          ))}
          </div>
        </div>, document.body)}
    </div>
  );
}
window.KiwiFoodPicker = FoodPicker;

function SleepToggle({ awake, onToggle, dark = false }) {
  const iconColor = dark ? '#1c1c24' : '#fff';
  const ringColor = dark ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.3)';
  const ringColorActive = dark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.5)';
  const hoverBg = dark ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.12)';
  const focusRing = dark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.85)';
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [tipPos, setTipPos] = React.useState(null);
  const btnRef = React.useRef(null);
  const label = awake ? 'Put Kiwi to sleep' : 'Wake Kiwi';
  const show = hovered;

  React.useLayoutEffect(() => {
    if (show && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      const w = 140, pad = 10;
      let left = r.left + r.width / 2;
      left = Math.min(Math.max(left, pad + w / 2), window.innerWidth - pad - w / 2);
      setTipPos({ top: r.bottom + 8, left });
    }
  }, [show]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        ref={btnRef}
        type="button"
        aria-label={label}
        onClick={onToggle}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          all: 'unset',
          cursor: 'pointer',
          width: 30,
          height: 30,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: (show || focused) ? `1.5px solid ${ringColorActive}` : `1.5px solid ${ringColor}`,
          background: (show || focused) ? hoverBg : 'transparent',
          boxShadow: focused ? `0 0 0 2px ${focusRing}` : 'none',
          transition: 'background 0.15s ease, border-color 0.15s ease'
        }}
      >
        {awake ? (
          <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', fontSize: 10, fontWeight: 700, color: iconColor, letterSpacing: '0.02em', lineHeight: 1 }}>Zzz</span>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="4.5" />
            <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
          </svg>
        )}
      </button>
      {tipPos && ReactDOM.createPortal(
        <div style={{
          position: 'fixed', top: tipPos.top, left: tipPos.left,
          transform: `translateX(-50%) translateY(${show ? '0px' : '4px'})`,
          opacity: show ? 1 : 0,
          transition: 'opacity 0.18s ease, transform 0.18s ease',
          background: '#1c1c24', color: '#f7f2e8', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
          fontSize: 11, padding: '9px 16px', borderRadius: 10, whiteSpace: 'nowrap', zIndex: 60, pointerEvents: 'none'
        }}>{label}</div>, document.body
      )}
    </div>
  );
}
window.KiwiSleepToggle = SleepToggle;

function ParachuteCanopy() {
  return (
    <svg width="140" height="96" viewBox="0 0 140 96" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <clipPath id="pchDome">
          <path d="M4 60 A66 56 0 0 1 136 60 L136 60 C136 60 128 50 120 60 C112 70 104 50 96 60 C88 70 80 50 72 60 C64 70 56 50 48 60 C40 70 32 50 24 60 C16 70 8 50 4 60 Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#pchDome)">
        <path d="M4 60 A66 56 0 0 1 136 60 L4 60 Z" fill="#e0491f" />
        <path d="M30.7 60 A66 56 0 0 1 55.4 12.6 L79 60 Z" fill="#f7c58a" />
        <path d="M55.4 12.6 A66 56 0 0 1 84.6 12.6 L79 60 L60 60 Z" fill="#f2861f" />
        <path d="M84.6 12.6 A66 56 0 0 1 109.3 60 L79 60 Z" fill="#f7c58a" />
      </g>
      {[24, 48, 70, 92, 116].map((x, i) => (
        <line key={i} x1={x} y1={58} x2={70} y2={92} stroke="#5a5a5a" strokeWidth="1.4" strokeLinecap="round" />
      ))}
    </svg>
  );
}
function KiwiWidget({ awake = true, onAsleep, introFall = false }) {
  const [toasts, setToasts] = React.useState([]);
  const [showFootprint, setShowFootprint] = React.useState(false);
  const toastTimersRef = React.useRef({});
  function scheduleToastDismiss(id) {
    toastTimersRef.current[id] = setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 400);
    }, 5000);
  }
  function pauseToastDismiss(id) {
    if (toastTimersRef.current[id]) { clearTimeout(toastTimersRef.current[id]); delete toastTimersRef.current[id]; }
    if (KiwiStats) {
      const p = KiwiStats.getAchievementProgress();
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, expanded: true, hoverUnlocked: p.unlocked, hoverTotal: p.total } : t)));
    }
  }
  function resumeToastDismiss(id) {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, expanded: false } : t)));
    scheduleToastDismiss(id);
  }
  React.useEffect(() => {
    if (KiwiStats) KiwiStats.checkNightOwl();
    function onAchievement(e) {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { ...e.detail, id, leaving: false, expanded: false }]);
      scheduleToastDismiss(id);
      if (KiwiStats) {
        const p = KiwiStats.getAchievementProgress();
        if (p.unlocked >= 3) setShowFootprint(!KiwiStats.getKiwiStats().kiwiPageDiscovered);
      }
    }
    function onKeyDown(e) {
      const tag = (document.activeElement && document.activeElement.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'k' || e.key === 'K') {
        if (awake) showMsg('You rang?', 2000);
      }
    }
    window.addEventListener('kiwiachievement', onAchievement);
    window.addEventListener('keydown', onKeyDown);
    if (KiwiStats) {
      const p = KiwiStats.getAchievementProgress();
      if (p.unlocked >= 3 && !KiwiStats.getKiwiStats().kiwiPageDiscovered) setShowFootprint(true);
    }
    return () => { window.removeEventListener('kiwiachievement', onAchievement); window.removeEventListener('keydown', onKeyDown); };
  }, []);
  const [introSky, setIntroSky] = React.useState(introFall);
  const [introTransition, setIntroTransition] = React.useState(introFall);
  React.useEffect(() => {
    if (!introFall) return;
    const t1 = setTimeout(() => setIntroSky(false), 60);
    const t2 = setTimeout(() => setIntroTransition(false), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [introFall]);
  const [, forceTick] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  const [msgIndex, setMsgIndex] = React.useState(0);
  const [feedMsg, setFeedMsg] = React.useState(null);
  const [sleepMsg, setSleepMsg] = React.useState(null);
  const feedTimerRef = React.useRef(null);
  const sleepMsgTimerRef = React.useRef(null);
  const foodsRef = React.useRef([]);
  const timeRef = React.useRef(0);
  const walkTimeRef = React.useRef(50);
  const peckRef = React.useRef(null);
  const lastRef = React.useRef(null);
  const hoverRef = React.useRef(false);
  const prevAwakeRef = React.useRef(awake);
  const sleepStartRef = React.useRef(awake ? null : performance.now());
  const wakeStartRef = React.useRef(null);
  const asleepFiredRef = React.useRef(!awake);
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Drag-to-move state ---
  const loadSavedPos = () => {
    try {
      const raw = localStorage.getItem('kiwiPosition');
      if (!raw) return null;
      const saved = JSON.parse(raw);
      if (typeof saved.fx !== 'number' || typeof saved.fy !== 'number') return null;
      return { x: saved.fx * window.innerWidth, y: saved.fy * window.innerHeight, facingRight: !!saved.facingRight };
    } catch (e) { return null; }
  };
  const initialPosRef = React.useRef(undefined);
  if (initialPosRef.current === undefined) initialPosRef.current = loadSavedPos();
  const [pinned, setPinned] = React.useState(!!initialPosRef.current);
  const [manualPos, setManualPos] = React.useState(initialPosRef.current ? { x: initialPosRef.current.x, y: initialPosRef.current.y } : null);
  const [facing, setFacing] = React.useState(initialPosRef.current ? initialPosRef.current.facingRight : true);
  const facingAutoRef = React.useRef(true);
  const manualPosRef = React.useRef(manualPos);
  manualPosRef.current = manualPos;
  const [discoDance, setDiscoDance] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const isDraggingRef = React.useRef(false);
  const [dragMsg, setDragMsg] = React.useState(null);
  const dragMsgTimerRef = React.useRef(null);
  const dragLongTimerRef = React.useRef(null);
  const lastMsgRef = React.useRef(null);
  const pointerStartRef = React.useRef(null);
  const dragThresholdMetRef = React.useRef(false);
  const wasDraggedRef = React.useRef(false);
  const clampedFlagRef = React.useRef(false);
  const [focused, setFocused] = React.useState(false);
  const usingPointerRef = React.useRef(false);
  const suppressHoverRef = React.useRef(false);
  const hoverSuppressUntilRef = React.useRef(0);
  const stalkerTimerRef = React.useRef(null);
  const fallbackTimerRef = React.useRef(null);
  const [falling, setFalling] = React.useState(false);
  const [parachute, setParachute] = React.useState(null);
  const [parachuteSquash, setParachuteSquash] = React.useState(false);
  const parachuteTimersRef = React.useRef([]);
  const [fallMsg, setFallMsg] = React.useState(null);
  const lastFallMsgRef = React.useRef(null);
  const lastLandMsgRef = React.useRef(null);
  const lastClickMsgRef = React.useRef(null);
  const clickBagRef = React.useRef([]);
  const fallMsgTimerRef = React.useRef(null);
  const fallCompleteTimerRef = React.useRef(null);
  const renderPosXRef = React.useRef(0);
  const renderPosYRef = React.useRef(0);
  const BOX_W = 80, BOX_H = 90;

  function clampPos(x, y) {
    const minX = BOX_W / 2, maxX = window.innerWidth - BOX_W / 2;
    const minY = 4, maxY = window.innerHeight - BOX_H - 4;
    let cx = x, cy = y, clamped = false;
    if (cx < minX) { cx = minX; clamped = true; } else if (cx > maxX) { cx = maxX; clamped = true; }
    if (cy < minY) { cy = minY; clamped = true; } else if (cy > maxY) { cy = maxY; clamped = true; }
    return { x: cx, y: cy, clamped };
  }

  function showMsg(msg, autoDismissMs) {
    lastMsgRef.current = msg;
    setDragMsg(msg);
    if (dragMsgTimerRef.current) clearTimeout(dragMsgTimerRef.current);
    if (autoDismissMs) dragMsgTimerRef.current = setTimeout(() => setDragMsg(null), autoDismissMs);
  }

  function pickDropMessage(pos) {
    if (clampedFlagRef.current) return LOCATION_OFFSCREEN_MSG;
    if (pos) {
      if (pos.x < 70 || pos.x > window.innerWidth - 70 || pos.y < 30 || pos.y > window.innerHeight - 100) return LOCATION_EDGE_MSG;
      const feedBtn = document.querySelector('[aria-label="Feed Kiwi"]');
      if (feedBtn) {
        const r = feedBtn.getBoundingClientRect();
        if (Math.hypot(pos.x - (r.left + r.width / 2), pos.y - (r.top + r.height / 2)) < 140) return LOCATION_FEED_MSG;
      }
      const contactEl = document.getElementById('contact-band');
      if (contactEl) {
        const r = contactEl.getBoundingClientRect();
        if (pos.y > r.top - 40 && pos.y < r.bottom + 40) return LOCATION_CONTACT_MSG;
      }
      if (pos.y < 120) return LOCATION_TOP_MSG;
    }
    return pickDifferent(DROP_MESSAGES, lastMsgRef.current);
  }

  function scheduleFallback() {
    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    fallbackTimerRef.current = setTimeout(() => fallToGround(), 5000);
  }
  function clearParachuteTimers() {
    parachuteTimersRef.current.forEach(clearTimeout);
    parachuteTimersRef.current = [];
  }
  function cancelParachute() {
    clearParachuteTimers();
    setParachute(null);
    setParachuteSquash(false);
  }
  function fallToGround() {
    if (!manualPosRef.current || isDraggingRef.current || falling || parachute) return;
    if (!awake || feedMsg || sleepMsg) { scheduleFallback(); return; }
    try { localStorage.removeItem('kiwiPosition'); } catch (e) {}
    const fallX = manualPosRef.current.x;
    const fallStartY = manualPosRef.current.y;
    const groundY = window.innerHeight - 84;
    const distance = groundY - fallStartY;
    const qualifies = distance >= 80;
    if (qualifies) fallCount += 1;
    const triggerParachute = qualifies && fallCount >= 2 && !reducedMotion;
    const showFallMsg = !reducedMotion && distance > 40 && !triggerParachute;
    function land() {
      syncWalkTimeToX(fallX);
      setPinned(false);
      setManualPos(null);
      setFalling(false);
      const lm = pickDifferent(LANDING_MESSAGES, lastLandMsgRef.current);
      lastLandMsgRef.current = lm;
      setFallMsg(lm);
      if (fallMsgTimerRef.current) clearTimeout(fallMsgTimerRef.current);
      fallMsgTimerRef.current = setTimeout(() => setFallMsg(null), 2600);
    }
    function landWithParachute() {
      setFalling(false);
      setParachuteSquash(true);
      parachuteTimersRef.current.push(setTimeout(() => setParachuteSquash(false), 220));
      syncWalkTimeToX(fallX);
      setPinned(false);
      setManualPos(null);
      const lm = pickDifferent(PARACHUTE_LANDING_MESSAGES, lastLandMsgRef.current);
      lastLandMsgRef.current = lm;
      setFallMsg(lm);
      if (fallMsgTimerRef.current) clearTimeout(fallMsgTimerRef.current);
      fallMsgTimerRef.current = setTimeout(() => setFallMsg(null), 2600);
      parachuteTimersRef.current.push(setTimeout(() => setParachute(null), 400));
      fallCount = 0;
    }
    if (triggerParachute) {
      if (KiwiStats) KiwiStats.recordParachuteTriggered();
      if (reducedMotion) {
        setParachute('floating');
        setHovered(false);
        hoverRef.current = false;
        setFallMsg(PARACHUTE_MSG);
        setManualPos({ x: fallX, y: groundY });
        parachuteTimersRef.current.push(setTimeout(landWithParachute, 400));
        return;
      }
      setFalling(true);
      setParachute('predrop');
      setHovered(false);
      hoverRef.current = false;
      setFallMsg(PARACHUTE_MSG);
      if (fallMsgTimerRef.current) { clearTimeout(fallMsgTimerRef.current); fallMsgTimerRef.current = null; }
      setManualPos({ x: fallX, y: fallStartY + 30 });
      parachuteTimersRef.current.push(setTimeout(() => {
        setParachute('deploy');
        setManualPos({ x: fallX, y: groundY });
        parachuteTimersRef.current.push(setTimeout(() => setParachute('floating'), 80));
        parachuteTimersRef.current.push(setTimeout(landWithParachute, 1900));
      }, 150));
      return;
    }
    if (showFallMsg) {
      const m = pickDifferent(FALLING_MESSAGES, lastFallMsgRef.current);
      lastFallMsgRef.current = m;
      if (fallMsgTimerRef.current) clearTimeout(fallMsgTimerRef.current);
      setFallMsg(m);
    }
    if (reducedMotion) {
      land();
      return;
    }
    setFalling(true);
    setManualPos({ x: fallX, y: groundY });
    fallCompleteTimerRef.current = setTimeout(land, 480);
  }
  function syncWalkTimeToX(x) {
    const desiredPercent = Math.max(0, Math.min(100, (x / window.innerWidth) * 100));
    const shapedVal = Math.max(-1, Math.min(1, (desiredPercent - 50) / 50));
    const sinVal = walkUnshape(shapedVal);
    let phase = Math.asin(sinVal);
    if ((Math.cos(phase) > 0) !== facing) phase = Math.PI - phase;
    walkTimeRef.current = (phase / (Math.PI * 2)) * 100;
  }

  function startDrag(startFacing) {
    setIsDragging(true);
    isDraggingRef.current = true;
    wasDraggedRef.current = true;
    setPinned(true);
    setFacing(startFacing);
    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    if (fallCompleteTimerRef.current) { clearTimeout(fallCompleteTimerRef.current); fallCompleteTimerRef.current = null; }
    if (fallMsgTimerRef.current) { clearTimeout(fallMsgTimerRef.current); fallMsgTimerRef.current = null; }
    setFalling(false);
    cancelParachute();
    setFallMsg(null);
    document.body.style.userSelect = 'none';
    window.dispatchEvent(new CustomEvent('kiwiclosepicker'));
    if (feedTimerRef.current) clearTimeout(feedTimerRef.current);
    setFeedMsg(null);
    if (sleepMsgTimerRef.current) clearTimeout(sleepMsgTimerRef.current);
    setSleepMsg(null);
    showMsg(pickDifferent(PICKUP_MESSAGES, lastMsgRef.current), null);
    if (dragLongTimerRef.current) clearTimeout(dragLongTimerRef.current);
    dragLongTimerRef.current = setTimeout(() => {
      if (isDraggingRef.current) showMsg(pickDifferent(DRAG_LONG_MESSAGES, lastMsgRef.current), null);
    }, 2000);
  }

  function endDrag() {
    setIsDragging(false);
    isDraggingRef.current = false;
    hoverRef.current = false;
    suppressHoverRef.current = true;
    hoverSuppressUntilRef.current = performance.now() + 600;
    setHovered(false);
    document.body.style.userSelect = '';
    if (dragLongTimerRef.current) clearTimeout(dragLongTimerRef.current);
    const pos = manualPosRef.current;
    if (pos) {
      try { localStorage.setItem('kiwiPosition', JSON.stringify({ fx: pos.x / window.innerWidth, fy: pos.y / window.innerHeight, facingRight: facing })); } catch (e) {}
    }
    showMsg(pickDropMessage(pos), 2600);
    scheduleFallback();
  }

  function handlePointerDown(e) {
    if (!awake) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const base = manualPosRef.current || { x: renderPosXRef.current, y: renderPosYRef.current };
    pointerStartRef.current = { x: e.clientX, y: e.clientY, baseX: base.x, baseY: base.y };
    dragThresholdMetRef.current = false;
    usingPointerRef.current = true;
    setFocused(false);
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
  }
  function handlePointerMove(e) {
    if (!pointerStartRef.current) return;
    const dx = e.clientX - pointerStartRef.current.x;
    const dy = e.clientY - pointerStartRef.current.y;
    if (!dragThresholdMetRef.current) {
      if (Math.hypot(dx, dy) < 6) return;
      dragThresholdMetRef.current = true;
      startDrag(facingAutoRef.current);
    }
    e.preventDefault();
    const { x: cx, y: cy, clamped } = clampPos(pointerStartRef.current.baseX + dx, pointerStartRef.current.baseY + dy);
    clampedFlagRef.current = clamped;
    setManualPos({ x: cx, y: cy });
  }
  function handlePointerUp(e) {
    if (!pointerStartRef.current) return;
    const wasDragging = dragThresholdMetRef.current;
    pointerStartRef.current = null;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (err) {}
    if (wasDragging) endDrag();
  }
  function handleKeyDown(e) {
    if (!awake) return;
    const step = e.shiftKey ? 40 : 10;
    let dx = 0, dy = 0;
    if (e.key === 'ArrowLeft') dx = -step;
    else if (e.key === 'ArrowRight') dx = step;
    else if (e.key === 'ArrowUp') dy = -step;
    else if (e.key === 'ArrowDown') dy = step;
    else return;
    e.preventDefault();
    const base = manualPosRef.current || { x: renderPosXRef.current, y: renderPosYRef.current };
    const { x: cx, y: cy } = clampPos(base.x + dx, base.y + dy);
    setPinned(true);
    setManualPos({ x: cx, y: cy });
    scheduleFallback();
    try { localStorage.setItem('kiwiPosition', JSON.stringify({ fx: cx / window.innerWidth, fy: cy / window.innerHeight, facingRight: facing })); } catch (err) {}
  }

  React.useEffect(() => {
    if (pinned) scheduleFallback();
    return () => {
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
      if (fallCompleteTimerRef.current) clearTimeout(fallCompleteTimerRef.current);
      if (fallMsgTimerRef.current) clearTimeout(fallMsgTimerRef.current);
      if (dragMsgTimerRef.current) clearTimeout(dragMsgTimerRef.current);
      if (dragLongTimerRef.current) clearTimeout(dragLongTimerRef.current);
      if (feedTimerRef.current) clearTimeout(feedTimerRef.current);
      if (sleepMsgTimerRef.current) clearTimeout(sleepMsgTimerRef.current);
      clearParachuteTimers();
    };
  }, []);

  React.useEffect(() => {
    function onDisco(e) {
      const on = !!(e && e.detail && e.detail.on);
      if (on) {
        if (fallbackTimerRef.current) { clearTimeout(fallbackTimerRef.current); fallbackTimerRef.current = null; }
        const target = clampPos(window.innerWidth / 2, window.innerHeight - 84);
        setDiscoDance(true);
        setPinned(true);
        setManualPos(target);
      } else {
        const cx = manualPosRef.current ? manualPosRef.current.x : window.innerWidth / 2;
        syncWalkTimeToX(cx);
        setDiscoDance(false);
        setPinned(false);
        setManualPos(null);
      }
    }
    window.addEventListener('kiwidisco', onDisco);
    return () => window.removeEventListener('kiwidisco', onDisco);
  }, []);

  React.useEffect(() => {
    function onResize() {
      if (manualPosRef.current) {
        const { x, y } = clampPos(manualPosRef.current.x, manualPosRef.current.y);
        setManualPos({ x, y });
      }
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  React.useEffect(() => {
    if (prevAwakeRef.current === awake) return;
    prevAwakeRef.current = awake;
    if (sleepMsgTimerRef.current) clearTimeout(sleepMsgTimerRef.current);
    if (!awake) {
      sleepStartRef.current = performance.now();
      asleepFiredRef.current = false;
      cancelParachute();
      setFalling(false);
      setSleepMsg(pick(SLEEP_MESSAGES));
      sleepMsgTimerRef.current = setTimeout(() => setSleepMsg(null), reducedMotion ? 500 : 2000);
    } else {
      wakeStartRef.current = performance.now();
      setSleepMsg(pick(WAKE_MESSAGES));
      sleepMsgTimerRef.current = setTimeout(() => setSleepMsg(null), reducedMotion ? 900 : 2600);
    }
  }, [awake, reducedMotion]);

  React.useEffect(() => {
    function onFeed(e) {
      setFeedMsg(e.detail);
      if (feedTimerRef.current) clearTimeout(feedTimerRef.current);
      feedTimerRef.current = setTimeout(() => setFeedMsg(null), 2600);
    }
    window.addEventListener('kiwifeed', onFeed);
    return () => { window.removeEventListener('kiwifeed', onFeed); if (feedTimerRef.current) clearTimeout(feedTimerRef.current); };
  }, []);

  React.useEffect(() => {
    const iv = setInterval(() => {
      if (!awake) return;
      if (typeof document !== 'undefined' && document.hidden) return;
      if (kiwiFullness <= 0) return;
      const now = Date.now();
      const sinceFeed = now - lastFeedAt;
      if (sinceFeed < 60000) return;
      const decayDue = lastDecayAt ? (now - lastDecayAt) >= 40000 : true;
      if (!decayDue) return;
      lastDecayAt = now;
      const next = Math.max(0, kiwiFullness - 10);
      kiwiFullness = next;
      window.dispatchEvent(new CustomEvent('kiwifullness', { detail: next }));
      if (next === 20 && !shownPeckish) {
        shownPeckish = true;
        window.dispatchEvent(new CustomEvent('kiwifeed', { detail: 'Getting peckish\u2026' }));
      } else if (next === 0 && !shownSnackTime) {
        shownSnackTime = true;
        window.dispatchEvent(new CustomEvent('kiwifeed', { detail: 'Snack time?' }));
      }
    }, 1000);
    return () => clearInterval(iv);
  }, [awake]);

  React.useEffect(() => {
    function onDrop(e) {
      const wDur = 100;
      const wPhase = (walkTimeRef.current / wDur) * Math.PI * 2;
      const currentPercent = 50 + walkShape(Math.sin(wPhase)) * 50;
      const movingRight = Math.cos(wPhase) > 0;
      const offset = 4 + Math.random() * 4;
      const xPercent = Math.max(6, Math.min(88, currentPercent + (movingRight ? offset : -offset)));
      foodsRef.current = foodsRef.current.concat([{
        uid: Math.random().toString(36).slice(2),
        type: e.detail.type,
        xPercent,
        startTime: performance.now(),
        landed: false,
        topPx: -40
      }]);
    }
    window.addEventListener('kiwifooddrop', onDrop);
    return () => window.removeEventListener('kiwifooddrop', onDrop);
  }, []);

  React.useEffect(() => {
    let raf;
    function loop(now) {
      if (lastRef.current == null) lastRef.current = now;
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      timeRef.current += dt;
      if (!hoverRef.current && !isDraggingRef.current) walkTimeRef.current += dt;
      if (peckRef.current != null && now - peckRef.current > 550) peckRef.current = null;

      if (foodsRef.current.length) {
        const wDur = 100;
        const wPhase = (walkTimeRef.current / wDur) * Math.PI * 2;
        const kiwiPercent = 50 + walkShape(Math.sin(wPhase)) * 50;
        const groundTop = window.innerHeight - 70;
        foodsRef.current = foodsRef.current
          .map((f) => {
            if (f.landed) return f;
            const progress = Math.min((now - f.startTime) / 1800, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const topPx = -40 + eased * (groundTop + 40);
            return progress >= 1 ? { ...f, topPx: groundTop, landed: true } : { ...f, topPx };
          })
          .filter((f) => !(f.landed && Math.abs(f.xPercent - kiwiPercent) < 4));
      }

      forceTick((n) => n + 1);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const dur = 1.1;
  const t = timeRef.current % dur;
  const intensity = hovered ? 1.6 : 1.3;
  let pose = idlePose(t, dur, intensity);
  const eyeScaleY = blinkScaleY(t);
  let beakAngle = 0;
  let jumpY = 0;
  let shadowOverride = null;

  const sleepDur = reducedMotion ? 260 : 1300;
  const wakeDur = reducedMotion ? 220 : 900;
  let sleepOffsetY = 0;
  let bodyOpacity = 1;
  let wakeStretch = 1;
  let hideWidget = false;
  if (!awake) {
    const start = sleepStartRef.current || performance.now();
    const progress = Math.min((performance.now() - start) / sleepDur, 1);
    const eased = progress * progress;
    sleepOffsetY = reducedMotion ? 0 : eased * 170;
    bodyOpacity = 1 - progress;
    if (progress >= 1) {
      hideWidget = true;
      if (!asleepFiredRef.current) {
        asleepFiredRef.current = true;
        if (onAsleep) onAsleep();
      }
    }
  } else if (wakeStartRef.current != null) {
    const progress = Math.min((performance.now() - wakeStartRef.current) / wakeDur, 1);
    if (progress < 1) {
      const eased = 1 - Math.pow(1 - progress, 3);
      sleepOffsetY = reducedMotion ? 0 : (1 - eased) * 170;
      bodyOpacity = Math.min(1, progress * 1.4);
      wakeStretch = reducedMotion ? 1 : 1 + Math.sin(progress * Math.PI) * 0.12;
    } else {
      wakeStartRef.current = null;
    }
  }
  if (hideWidget) return null;

  const walkDur = 100;
  const walkPhase = (walkTimeRef.current / walkDur) * Math.PI * 2;
  const walkPos = walkShape(Math.sin(walkPhase));
  facingAutoRef.current = Math.cos(walkPhase) > 0;

  if (peckRef.current != null) {
    const jumpDur = 550;
    const progress = Math.min((performance.now() - peckRef.current) / jumpDur, 1);
    const jumpEnvelope = Math.sin(progress * Math.PI);
    jumpY = -34 * jumpEnvelope;
    pose = { ...pose, toeAngle: pose.toeAngle + 16 * jumpEnvelope, hairAngle: pose.hairAngle + 8 * jumpEnvelope };
    beakAngle = -8 * jumpEnvelope;
    shadowOverride = { shadowScaleX: 1 - 0.5 * jumpEnvelope, shadowOpacity: 0.22 * (1 - 0.8 * jumpEnvelope) };
  }
  if (shadowOverride) pose = { ...pose, ...shadowOverride };

  const autoLeftPxRaw = (50 + walkPos * 50) / 100 * window.innerWidth;
  const autoLeftPx = Math.max(30, Math.min(window.innerWidth - 30, autoLeftPxRaw));
  const autoTopPx = window.innerHeight - 84;
  const posX = pinned && manualPos ? manualPos.x : autoLeftPx;
  const posY = introSky ? -160 : (pinned && manualPos ? manualPos.y : autoTopPx);
  const introScale = introSky ? 1.5 : (introTransition ? 1 : 1);
  const facingRight = pinned ? facing : facingAutoRef.current;
  renderPosXRef.current = posX;
  renderPosYRef.current = posY;
  const bubbleBelow = posY < 60;
  const parachuteOpen = parachute === 'predrop' || parachute === 'deploy' || parachute === 'floating';
  const cursor = !awake ? 'default' : (isDragging ? 'grabbing' : 'grab');

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 935
      }}
    >
      <div
        role="button"
        tabIndex={awake ? 0 : -1}
        aria-label="Move Kiwi around the page"
        onMouseEnter={() => {
          if (isDraggingRef.current || performance.now() < hoverSuppressUntilRef.current) return;
          if (suppressHoverRef.current) { suppressHoverRef.current = false; return; }
          if (falling) return;
          hoverRef.current = true;
          setHovered(true);
          setMsgIndex((i) => (i + 1) % TOOLTIP_MESSAGES.length);
          if (stalkerTimerRef.current) clearTimeout(stalkerTimerRef.current);
          stalkerTimerRef.current = setTimeout(() => {
            if (KiwiStats) KiwiStats.unlockAchievement('professional-stalker');
          }, 10000);
        }}
        onMouseLeave={() => { hoverRef.current = false; setHovered(false); if (stalkerTimerRef.current) { clearTimeout(stalkerTimerRef.current); stalkerTimerRef.current = null; } }}
        onClick={() => {
          if (!awake || wasDraggedRef.current) { wasDraggedRef.current = false; return; }
          if (falling || parachute || feedMsg || sleepMsg) return;
          playTapSound();
          peckRef.current = performance.now();
          hoverRef.current = false;
          setHovered(false);
          const m = (KiwiStats && KiwiStats.hasKiwiCompletedEver && KiwiStats.hasKiwiCompletedEver() && Math.random() < 0.15)
            ? EXCLUSIVE_CLICK_MESSAGE
            : drawFromBag(clickBagRef, CLICK_MESSAGES, lastClickMsgRef.current);
          lastClickMsgRef.current = m;
          showMsg(m, 2800);
          if (KiwiStats) KiwiStats.incrementKiwiClicks();
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        onFocus={() => { if (!usingPointerRef.current) setFocused(true); }}
        onBlur={() => { setFocused(false); usingPointerRef.current = false; }}
        style={{
          position: 'absolute',
          width: BOX_W,
          height: BOX_H,
          left: posX,
          top: posY,
          transform: `translateX(-50%) translateY(${jumpY + sleepOffsetY}px) scaleX(${(facingRight ? -1 : 1) * introScale}) scaleY(${wakeStretch * (parachuteSquash ? 0.82 : 1) * introScale})`,
          opacity: bodyOpacity,
          pointerEvents: (falling && !parachute) ? 'none' : 'auto',
          cursor,
          transition: [
            introTransition
              ? 'top 0.9s cubic-bezier(0.34,1.56,0.64,1), transform 0.9s cubic-bezier(0.34,1.56,0.64,1)'
              : (parachute === 'deploy' || parachute === 'floating')
                ? `top ${reducedMotion ? '0.4s ease' : '1.85s cubic-bezier(0.45,0,0.55,1)'}`
                : parachute === 'predrop'
                  ? 'top 0.15s ease-out'
                  : (falling ? 'top 0.48s cubic-bezier(0.4,0,1,1)' : null),
            'transform 0.18s ease-out',
            discoDance ? 'left 2.4s cubic-bezier(0.33,0,0.25,1), top 2.4s cubic-bezier(0.33,0,0.25,1)' : null
          ].filter(Boolean).join(', '),
          touchAction: 'none',
          userSelect: 'none',
          outline: 'none',
          outlineOffset: 4,
          borderRadius: 12
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: bubbleBelow ? 'auto' : 6,
            bottom: bubbleBelow ? 6 : 'auto',
            transform: `translate(-50%,${bubbleBelow ? '100%' : '-100%'}) scaleX(${facingRight ? -1 : 1}) translateY(${(!parachuteOpen && (sleepMsg || feedMsg || dragMsg || fallMsg || hovered)) ? '0px' : '4px'})`,
            opacity: (!parachuteOpen && (sleepMsg || feedMsg || dragMsg || fallMsg || hovered)) ? 1 : 0,
            transition: 'opacity 0.2s ease, transform 0.2s ease',
            pointerEvents: 'none'
          }}
        >
          {bubbleBelow ? (
            <div style={{ width: 0, height: 0, margin: '0 auto', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '7px solid #1c1c24' }} />
          ) : null}
          <div style={{
            background: '#1c1c24',
            color: '#f4f1ea',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
            fontSize: 11,
            letterSpacing: '0.02em',
            padding: '9px 16px',
            borderRadius: 12,
            whiteSpace: 'nowrap'
          }}>
            {sleepMsg || feedMsg || dragMsg || fallMsg || TOOLTIP_MESSAGES[msgIndex]}
          </div>
          {!bubbleBelow ? (
            <div style={{ width: 0, height: 0, margin: '0 auto', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '7px solid #1c1c24' }} />
          ) : null}
        </div>
        <Bird {...pose} eyeScaleY={eyeScaleY} beakAngle={beakAngle} />
        {parachute ? (() => {
          const open = parachute !== 'predrop';
          const sway = (parachute === 'floating' && !reducedMotion) ? Math.sin(timeRef.current * 2.4) * 2.5 : 0;
          const fadeOut = parachute === 'landing';
          return (
            <div style={{
              position: 'absolute',
              left: '50%',
              bottom: '78%',
              width: 140,
              height: 96,
              transform: `translateX(-50%) scaleX(${open ? 1 : 0.15}) rotate(${sway}deg)`,
              transformOrigin: '50% 100%',
              transition: reducedMotion ? 'none' : 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease',
              opacity: fadeOut ? 0 : 1,
              pointerEvents: 'none'
            }}>
              <ParachuteCanopy />
            </div>
          );
        })() : null}
      </div>
      {foodsRef.current.map((f) => (
        <div key={f.uid} style={{ position: 'fixed', left: `${f.xPercent}%`, top: f.topPx, transform: 'translate(-50%,0)', width: 26, height: 26, zIndex: 38, pointerEvents: 'none' }}>
          <svg width="26" height="26" viewBox="0 0 36 32">{FOODS[f.type]}</svg>
        </div>
      ))}
      <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 150000, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }} aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            onMouseEnter={() => pauseToastDismiss(t.id)}
            onMouseLeave={() => resumeToastDismiss(t.id)}
            style={{
              background: '#1c1c24',
              color: '#f4f1ea',
              borderRadius: 12,
              padding: '12px 16px',
              width: 260,
              boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
              pointerEvents: 'auto',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              transform: t.expanded ? 'scale(1.02)' : 'scale(1)',
              animation: reducedMotion ? 'none' : `${t.leaving ? 'kiwiToastOut' : 'kiwiToastIn'} 0.4s cubic-bezier(0.22,1,0.36,1) forwards`
            }}
          >
            <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', fontSize: 10, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(244,241,234,0.55)', marginBottom: 4 }}>Kiwi mischief unlocked</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
              <span style={{ fontSize: 18, lineHeight: 1 }}>{t.icon}</span>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</span>
            </div>
            <div style={{ fontSize: 12.5, color: 'rgba(244,241,234,0.8)' }}>{t.description}</div>
            {t.unlockedCount === 1 ? (
              <div style={{ fontSize: 11, color: 'rgba(244,241,234,0.5)', marginTop: 6, fontStyle: 'italic' }}>Kiwi seems to be keeping track of these somewhere\u2026</div>
            ) : t.unlockedCount === 3 ? (
              <div style={{ fontSize: 11, color: 'rgba(244,241,234,0.5)', marginTop: 6, fontStyle: 'italic' }}>There might be more to Kiwi than meets the eye.</div>
            ) : null}
            <div style={{
              display: 'grid',
              gridTemplateRows: t.expanded ? '1fr' : '0fr',
              opacity: t.expanded ? 1 : 0,
              transition: reducedMotion ? 'none' : 'grid-template-rows 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease'
            }}>
              <div style={{ overflow: 'hidden' }}>
                <div style={{
                  marginTop: 10,
                  paddingTop: 10,
                  borderTop: '1px solid rgba(244,241,234,0.15)',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                  fontSize: 11,
                  letterSpacing: '0.02em',
                  color: 'rgba(244,241,234,0.7)'
                }}>
                  {t.hoverUnlocked} / {t.hoverTotal} achievements unlocked
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
function KiwiHero({ size = 120, footColor, golden = false }) {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf, last = null;
    function loop(now) {
      if (last == null) last = now;
      setT((prev) => prev + (now - last) / 1000);
      last = now;
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const pose = idlePose(t, 2.4, 1);
  const eyeScaleY = blinkScaleY(t);
  return (
    <div style={{ width: size, height: size }}>
      <Bird {...pose} eyeScaleY={eyeScaleY} footColor={footColor} golden={golden} />
    </div>
  );
}
window.KiwiHero = KiwiHero;
window.KiwiWidget = KiwiWidget;
