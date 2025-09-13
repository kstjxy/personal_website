"use client";

import { Button } from "@/components/ui/button";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Sparkles, Clock } from "lucide-react";

interface ViewToggleProps {
  active: "relevance" | "chronological";
}

const ViewToggle = ({ active }: ViewToggleProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const updateView = (view: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (view === "relevance") {
      newParams.delete("view");
    } else {
      newParams.set("view", view);
    }
    
    const newUrl = `/work${newParams.toString() ? `?${newParams.toString()}` : ""}`;
    navigate(newUrl, { replace: true });
  };

  const options = [
    { value: "relevance", label: "Most Relevant", Icon: Sparkles },
    { value: "chronological", label: "Chronological", Icon: Clock },
  ];

  return (
    <div className="flex gap-2 mb-8">
      {options.map((option) => (
        <Button
          key={option.value}
          variant={active === option.value ? "default" : "outline"}
          size="sm"
          onClick={() => updateView(option.value)}
          className="text-sm"
        >
          <option.Icon className="mr-2 h-4 w-4" />
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default ViewToggle;
