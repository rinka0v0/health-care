export const conditionsFace = [
  { label: null, value: 0 },
  { label: null, value: 1 },
  { label: "đ”", value: 2 },
];

export const HEALTH_LABELS = {
  temperature: "äœæž©",
  headaches: "é ­ç",
  lowerBackPains: "è°ç",
  dizzies: "ăăŸă",
  condition: "äœèȘż",
};

export const HEALTH_INFO_KEYS = Object.keys(HEALTH_LABELS).map((key) => {
  return key;
});

export const conditions = [
  { label: "èŻă", value: 0 },
  { label: "æźé", value: 1 },
  { label: "æȘă", value: 2 },
];

export const headaches = [
  { label: "æżç", value: 0 },
  { label: "çă", value: 1 },
  { label: "ć°ăçă", value: 2 },
];
export const dizzies = [
  { label: "ă”ăă”ă", value: 0 },
  { label: "ăăăă", value: 1 },
];
export const lowerBackPains = [
  { label: "æżç", value: 0 },
  { label: "çă", value: 1 },
  { label: "ć°ăçă", value: 2 },
];

export const HEALTH_ITEM_LIST = {
  headaches,
  lowerBackPains,
  dizzies,
  condition: conditions,
};
