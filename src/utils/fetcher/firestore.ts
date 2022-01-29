import { db } from "../../../firebase";
import {
  addDoc,
  collection,
  CollectionReference,
  DocumentData,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

export const defaultConditions = {
  "1": 1,
  "2": 0,
  "3": 0,
  "4": 0,
  "5": 0,
  "6": 0,
  "7": 1,
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
  "23": 1,
  "24": 0,
  "25": 0,
  "26": 0,
  "27": 0,
  "28": 0,
  "29": 0,
  "30": 0,
  "31": 0,
};

// const defaultConditions = {
//   1: null,
//   2: null,
//   3: null,
//   4: null,
//   5: null,
//   6: null,
//   7: null,
//   8: null,
//   9: null,
//   10: null,
//   11: null,
//   12: null,
//   13: null,
//   14: null,
//   15: null,
//   16: null,
//   17: null,
//   18: null,
//   19: null,
//   20: null,
//   21: null,
//   22: null,
//   23: null,
//   24: null,
//   25: null,
//   26: null,
//   27: null,
//   28: null,
//   29: null,
//   30: null,
//   31: null,
// };

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
    "month",
    month
  );

  const snapshot = await getDocs(
    query(monthRef, where("condition", "!=", "null"))
  );

  const conditions = { ...defaultConditions };

  snapshot.forEach((doc) => {
    const data = doc.data() as ConditionData;
    if (data.condition) {
      conditions[data.date] = data.condition;
    }
  });
  console.log(conditions, "conditions");

  return conditions;
};

export const fetchCondition = async (
  userId: string,
  year: string,
  month: string,
  day: string
): Promise<DocumentData | undefined> => {
  const docRef = collection(
    db,
    "users",
    userId,
    "years",
    year,
    "months",
    month,
    "day",
    day,
    "memos"
  );
  const docSnap = await getDocs(docRef);
  console.log(docSnap, "docSnap");

  if (!docSnap.empty) {
    const memos: DocumentData[] = [];
    docSnap.forEach((doc) => {
      const memoData = doc.data();
      memos.push({
        content: memoData.content,
        createdAt: memoData.createdAt,
      });
    });
    return memos;
  } else {
    return undefined;
  }
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
