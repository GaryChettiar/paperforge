
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// User profile type for Firestore user doc
type UserProfile = {
  uid: string;
  name: string;
  email: string;
  createdAt: string; // stored as ISO string in Firestore
};

export function useUserProfile() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Fetch the Firestore user doc
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfile(snap.data() as UserProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, profile, loading };
}
