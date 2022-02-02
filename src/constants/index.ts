export const conditionsFace = [
  { label: null, value: 0 },
  { label: null, value: 1 },
  { label: "😵", value: 2 },
];

export const HEALTH_LABELS = {
  temperature: "体温",
  headaches: "頭痛",
  lowerBackPains: "腰痛",
  dizzies: "めまい",
  condition: "体調",
};

export const HEALTH_INFO_KEYS = Object.keys(HEALTH_LABELS).map((key) => {
  return key;
});

export const conditions = [
  { label: "良い", value: 0 },
  { label: "普通", value: 1 },
  { label: "悪い", value: 2 },
];

export const headaches = [
  { label: "激痛", value: 0 },
  { label: "痛い", value: 1 },
  { label: "少し痛い", value: 2 },
];
export const dizzies = [
  { label: "ふわふわ", value: 0 },
  { label: "ぐるぐる", value: 1 },
];
export const lowerBackPains = [
  { label: "激痛", value: 0 },
  { label: "痛い", value: 1 },
  { label: "少し痛い", value: 2 },
];

export const HEALTH_ITEM_LIST = {
  headaches,
  lowerBackPains,
  dizzies,
  condition: conditions,
};
