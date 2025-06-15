
import { useState, useEffect, useCallback } from "react";
import { ResumeEntry, getUserResumes, saveResume, deleteResume, generateResumeId } from "@/utils/resumeStorage";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useToast } from "@/hooks/use-toast";

export function useResumeStorage() {
  const { user } = useUserProfile();
  const { toast } = useToast();
  const [resumes, setResumes] = useState<Record<string, ResumeEntry>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all resumes on mount or when user changes
  useEffect(() => {
    async function fetchResumes() {
      setLoading(true);
      setError(null);
      if (!user) {
        setResumes({});
        setLoading(false);
        return;
      }
      try {
        const all = await getUserResumes(user.uid);
        setResumes(all);
      } catch (err: any) {
        setError("Failed to load resumes");
        toast({
          title: "Could not load resumes",
          description: err?.message || String(err),
          variant: "destructive",
        });
      }
      setLoading(false);
    }
    fetchResumes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  const saveOrUpdateResume = useCallback(
    async (resume: ResumeEntry) => {
      if (!user) {
        setError("Not logged in");
        return;
      }
      try {
        await saveResume(user.uid, resume);
        setResumes((old) => ({
          ...old,
          [resume.id]: resume,
        }));
        toast({
          title: "Saved!",
          description: `${resume.title} has been saved.`,
        });
      } catch (err: any) {
        setError("Save failed");
        toast({
          title: "Could not save resume",
          description: err?.message || String(err),
          variant: "destructive",
        });
      }
    },
    [user, toast]
  );

  const removeResume = useCallback(
    async (resumeId: string) => {
      if (!user) {
        setError("Not logged in");
        return;
      }
      try {
        await deleteResume(user.uid, resumeId);
        setResumes((old) => {
          const copy = { ...old };
          delete copy[resumeId];
          return copy;
        });
        toast({
          title: "Deleted",
          description: "Resume has been deleted.",
        });
      } catch (err: any) {
        setError("Delete failed");
        toast({
          title: "Could not delete resume",
          description: err?.message || String(err),
          variant: "destructive",
        });
      }
    },
    [user, toast]
  );

  // Optionally: auto-save (debounced) or expose a debounced save function

  return {
    resumes,
    loading,
    error,
    saveOrUpdateResume,
    removeResume,
    generateResumeId,
  };
}
