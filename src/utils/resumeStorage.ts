import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

export interface ResumeEntry {
  id: string;
  title: string;
  lastModified: number;
  resumeData: any; // Replace 'any' with your ResumeData type if desired
}

type ResumesMap = Record<string, ResumeEntry>;

/**
 * Fetches the resumes map for a user from Firestore.
 */
export async function getUserResumes(uid: string): Promise<ResumesMap> {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  if (snap.exists()) {
    const data = snap.data();
    return (data.resumes as ResumesMap) || {};
  }
  return {};
}

/**
 * Saves/updates a single resume in the user's 'resumes' map field.
 * If the user doc doesn't exist, creates it.
 */
export async function saveResume(
  uid: string,
  resume: ResumeEntry
): Promise<void> {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    // Create user doc with a resumes map
    await setDoc(userRef, {
      resumes: {
        [resume.id]: resume,
      },
    });
  } else {
    // Update resumes map in user doc
    await updateDoc(userRef, {
      [`resumes.${resume.id}`]: resume,
    });
  }
}

/**
 * Deletes a resume from the user's 'resumes' map.
 */
export async function deleteResume(uid: string, resumeId: string): Promise<void> {
  const userRef = doc(db, "users", uid);
  // To unset a field, set it to FieldValue.delete()
  // But to keep this dependency-light, we'll read, remove, then update
  const snap = await getDoc(userRef);
  if (!snap.exists()) return;
  const data = snap.data();
  const resumes: ResumesMap = data.resumes || {};
  delete resumes[resumeId];
  await updateDoc(userRef, { resumes });
}

/**
 * Utility to generate a unique resume ID (timestamp + random).
 */
export function generateResumeId() {
  return (
    "resume_" +
    Date.now().toString(36) +
    "_" +
    Math.random().toString(36).substring(2, 8)
  );
}
