export type SylvaVariant = 'living-green' | 'ecostove-dawn' | 'moss-mist' | 'nocturne';

export interface SylvaThemeConfig {
  id: SylvaVariant;
  name: string;
  subtitle: string;
  bgHex: string;
  bgGradA: string;
  bgGradB: string;
  floorLight: string;
  cardBg: string;
  cardInk: string;
  cardLabel: string;
  ink: string;
  inkSoft: string;
  inkFaint: string;
  rule: string;
  dockBg: string;
  hazeCol: [number, number, number];
  farHazeCol: [number, number, number];
  keyCol: [number, number, number];
  fillCol: [number, number, number];
  mossDeep: [number, number, number];
  mossMid: [number, number, number];
  mossTip: [number, number, number];
  mossTipHi: [number, number, number];
  butterflyWingFace: [number, number, number];
  butterflyWingEdge: [number, number, number];
}

export const SYLVA_VARIANTS: Record<SylvaVariant, SylvaThemeConfig> = {
  'living-green': {
    id: 'living-green',
    name: 'Living Green',
    subtitle: 'Classic canopy & ancient moss forest',
    bgHex: '#383b34',
    bgGradA: 'rgba(232, 238, 222, 0.085)',
    bgGradB: 'rgba(24, 28, 20, 0.10)',
    floorLight: 'rgba(238, 243, 231, 0.50)',
    cardBg: '#f2f3ef',
    cardInk: '#23261f',
    cardLabel: '#7c8177',
    ink: '#ffffff',
    inkSoft: 'rgba(255, 255, 255, 0.62)',
    inkFaint: 'rgba(255, 255, 255, 0.44)',
    rule: 'rgba(255, 255, 255, 0.055)',
    dockBg: 'rgba(34, 40, 31, 0.74)',
    hazeCol: [0.176, 0.195, 0.145],
    farHazeCol: [0.150, 0.164, 0.120],
    keyCol: [1.14, 1.06, 0.88],
    fillCol: [0.78, 0.78, 0.62],
    mossDeep: [0.0126, 0.0192, 0.0031],
    mossMid: [0.0488, 0.0744, 0.0121],
    mossTip: [0.1222, 0.1860, 0.0304],
    mossTipHi: [0.2600, 0.3900, 0.0640],
    butterflyWingFace: [0.330, 0.560, 0.042],
    butterflyWingEdge: [0.062, 0.190, 0.014],
  },
  'ecostove-dawn': {
    id: 'ecostove-dawn',
    name: 'Ecostove Dawn',
    subtitle: 'Warm morning sun breaking over wet slate',
    bgHex: '#3d3731',
    bgGradA: 'rgba(245, 228, 202, 0.11)',
    bgGradB: 'rgba(38, 24, 16, 0.14)',
    floorLight: 'rgba(252, 238, 220, 0.54)',
    cardBg: '#f6f1eb',
    cardInk: '#2e251e',
    cardLabel: '#8a7d72',
    ink: '#ffffff',
    inkSoft: 'rgba(255, 255, 255, 0.65)',
    inkFaint: 'rgba(255, 255, 255, 0.45)',
    rule: 'rgba(255, 255, 255, 0.065)',
    dockBg: 'rgba(46, 38, 32, 0.78)',
    hazeCol: [0.215, 0.182, 0.142],
    farHazeCol: [0.185, 0.150, 0.115],
    keyCol: [1.25, 1.02, 0.80],
    fillCol: [0.85, 0.72, 0.58],
    mossDeep: [0.0180, 0.0190, 0.0040],
    mossMid: [0.0620, 0.0680, 0.0140],
    mossTip: [0.1540, 0.1650, 0.0320],
    mossTipHi: [0.3200, 0.3400, 0.0750],
    butterflyWingFace: [0.580, 0.420, 0.065],
    butterflyWingEdge: [0.220, 0.120, 0.020],
  },
  'moss-mist': {
    id: 'moss-mist',
    name: 'Moss Mist',
    subtitle: 'Pale overcast mountain fog & dew-soaked fern',
    bgHex: '#2f3836',
    bgGradA: 'rgba(215, 240, 235, 0.09)',
    bgGradB: 'rgba(18, 28, 26, 0.12)',
    floorLight: 'rgba(226, 244, 239, 0.46)',
    cardBg: '#eef4f1',
    cardInk: '#1a2724',
    cardLabel: '#6b7f7b',
    ink: '#ffffff',
    inkSoft: 'rgba(255, 255, 255, 0.62)',
    inkFaint: 'rgba(255, 255, 255, 0.42)',
    rule: 'rgba(255, 255, 255, 0.055)',
    dockBg: 'rgba(26, 38, 35, 0.76)',
    hazeCol: [0.155, 0.205, 0.190],
    farHazeCol: [0.130, 0.175, 0.160],
    keyCol: [1.02, 1.12, 1.08],
    fillCol: [0.70, 0.82, 0.80],
    mossDeep: [0.0080, 0.0210, 0.0120],
    mossMid: [0.0320, 0.0820, 0.0450],
    mossTip: [0.0850, 0.1950, 0.1150],
    mossTipHi: [0.1800, 0.3800, 0.2400],
    butterflyWingFace: [0.120, 0.480, 0.420],
    butterflyWingEdge: [0.030, 0.180, 0.160],
  },
  'nocturne': {
    id: 'nocturne',
    name: 'Nocturne',
    subtitle: 'Midnight bioluminescence & deep canopy shadows',
    bgHex: '#181e1a',
    bgGradA: 'rgba(140, 215, 175, 0.06)',
    bgGradB: 'rgba(6, 12, 9, 0.22)',
    floorLight: 'rgba(175, 230, 205, 0.28)',
    cardBg: '#212a24',
    cardInk: '#e2ebe4',
    cardLabel: '#8ca094',
    ink: '#ffffff',
    inkSoft: 'rgba(255, 255, 255, 0.60)',
    inkFaint: 'rgba(255, 255, 255, 0.40)',
    rule: 'rgba(255, 255, 255, 0.045)',
    dockBg: 'rgba(14, 20, 16, 0.86)',
    hazeCol: [0.075, 0.115, 0.095],
    farHazeCol: [0.055, 0.085, 0.070],
    keyCol: [0.85, 0.98, 1.15],
    fillCol: [0.45, 0.65, 0.58],
    mossDeep: [0.0040, 0.0120, 0.0080],
    mossMid: [0.0160, 0.0560, 0.0380],
    mossTip: [0.0450, 0.1450, 0.0980],
    mossTipHi: [0.1200, 0.3600, 0.2800],
    butterflyWingFace: [0.180, 0.540, 0.480],
    butterflyWingEdge: [0.040, 0.160, 0.140],
  },
};
