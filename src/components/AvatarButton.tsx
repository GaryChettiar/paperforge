
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

interface AvatarButtonProps {
  name?: string;
  imageUrl?: string;
}

export const AvatarButton: React.FC<AvatarButtonProps> = ({ name, imageUrl }) => {
  const navigate = useNavigate();
  const initials =
    name && typeof name === "string"
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : undefined;

  return (
    <button
      type="button"
      className="rounded-full overflow-hidden border-2 border-[#243e36] hover:ring-2 hover:ring-[#243e36] focus:outline-none focus:ring"
      style={{ width: 40, height: 40 }}
      aria-label="Go to profile"
      onClick={() => navigate("/profile")}
    >
      <Avatar className="h-10 w-10">
        {imageUrl ? (
          <AvatarImage src={imageUrl} alt="Profile" />
        ) : initials ? (
          <AvatarFallback>{initials}</AvatarFallback>
        ) : (
          <AvatarFallback>
            <User className="w-5 h-5 text-[#243e36]" />
          </AvatarFallback>
        )}
      </Avatar>
    </button>
  );
};
