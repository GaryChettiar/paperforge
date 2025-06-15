
import React from "react";
import { Eye } from "lucide-react";

// Placeholder cover images
const tileImages = [
  "photo-1649972904349-6e44c42644a7",
  "photo-1488590528505-98d2b5aba04b",
  "photo-1461749280684-dccba630e2f6",
  "photo-1486312338219-ce68d2c6f44d",
  "photo-1581091226825-a6a2a5aee158",
  "photo-1531297484001-80022131f5a1",
  "photo-1487058792275-0ad4aaf24ca7",
  "photo-1605810230434-7631ac76ec81",
];

const getTileImage = (idx: number) => `/placeholder/${tileImages[idx % tileImages.length]}.jpg`;

interface ResumeTileProps {
  resume: any;
  idx: number;
  onClick: () => void;
}

export const ResumeTile: React.FC<ResumeTileProps> = ({ resume, idx, onClick }) => (
  <button
    onClick={onClick}
    className="rounded-xl overflow-hidden shadow-lg relative group border border-gray-100 bg-white hover:shadow-xl focus:outline-none flex flex-col"
    tabIndex={0}
  >
    <img
      src={getTileImage(idx)}
      alt="Resume Preview"
      className="w-full h-40 object-cover"
      style={{ background: "#f1f7ed" }}
      loading="lazy"
    />
    <div className="p-4 flex-1 flex flex-col">
      <div className="font-bold text-lg mb-2 text-[#243e36] truncate">
        {resume.title || "Untitled Resume"}
      </div>
      <div className="text-sm text-gray-500 truncate">
        Last updated:{" "}
        {resume.lastModified
          ? new Date(resume.lastModified).toLocaleDateString()
          : "--"}
      </div>
    </div>
    <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow-sm pointer-events-none opacity-0 group-hover:opacity-100 transition">
      <Eye className="w-4 h-4 text-[#243e36]" />
    </div>
  </button>
);
