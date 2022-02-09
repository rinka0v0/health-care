import { db } from "../../../firebase";
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

export const defaultConditions = {
  "1": 0,
  "2": 0,
  "3": 0,
  "4": 0,
  "5": 0,
  "6": 0,
  "7": 0,
  "8": 0,
  "9": 0,
  "10": 0,
  "11": 0,
  "12": 0,
  "13": 0,
  "14": 0,
  "15": 0,
  "16": 0,
  "17": 0,
  "18": 0,
  "19": 0,
  "20": 0,
  "21": 0,
  "22": 0,
  "23": 0,
  "24": 0,
  "25": 0,
  "26": 0,
  "27": 0,
  "28": 0,
  "29": 0,
  "30": 0,
  "31": 0,
};

type DateNumber = keyof typeof defaultConditions;

type ConditionData = {
  date: DateNumber;
  condition: number | null;
};

export const fetchConditions = async (
  userId: string,
  year: string,
  month: string
): Promise<typeof defaultConditions> => {
  const monthRef = collection(
    db,
    "users",
    userId,
    "years",
    year,
    "months",
    month,
    "days"
  );

  const snapshot = await getDocs(query(monthRef, where("condition", "==", 2)));

  const conditions = { ...defaultConditions };

  snapshot.forEach((doc) => {
    const data = doc.data() as ConditionData;
    const id = doc.id as DateNumber;
    if (data.condition) {
      conditions[id] = data.condition;
    }
  });
  return conditions;
};

export const getMemosRef = (
  userId: string,
  year: string,
  month: string,
  day: string
): CollectionReference<DocumentData> => {
  return collection(
    db,
    "users",
    userId,
    "years",
    year,
    "months",
    month,
    "days",
    day,
    "memos"
  );
};

export const saveMemo = async (
  content: string,
  userId: string,
  year: string,
  month: string,
  day: string
): Promise<void> => {
  try {
    await addDoc(getMemosRef(userId, year, month, day), {
      content,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const getConditionRef = (
  userId: string,
  year: string,
  month: string,
  day: string
): DocumentReference<DocumentData> => {
  return doc(db, "users", userId, "years", year, "months", month, "days", day);
};

export type Condition = {
  temperature: number | null;
  condition: number | null;
  headaches: number | null;
  dizzies: number | null;
  lowerBackPains: number | null;
};

export const fetchCondition = async (
  userId: string,
  year: string,
  month: string,
  day: string
): Promise<DocumentData | undefined> => {
  try {
    const docSnap = await getDoc(getConditionRef(userId, year, month, day));
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
export const saveCondition = async (
  condition: Condition,
  userId: string,
  year: string,
  month: string,
  day: string
): Promise<void> => {
  try {
    await setDoc(
      getConditionRef(userId, year, month, day),
      {
        temperature: condition?.temperature,
        condition: condition?.condition,
        headaches: condition?.headaches,
        dizzies: condition?.dizzies,
        lowerBackPains: condition?.lowerBackPains,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
