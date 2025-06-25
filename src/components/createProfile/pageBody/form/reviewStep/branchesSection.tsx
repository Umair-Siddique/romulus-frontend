import React from "react";
import { BranchCard } from "./branchCard";

interface BranchesSectionProps {
  branches: any[];
}

export const BranchesSection: React.FC<BranchesSectionProps> = ({
  branches,
}) => {
  if (!Array.isArray(branches) || branches.length === 0) return null;

  return (
    <>
      {branches.map((branch: any, index: number) => (
        <BranchCard key={index} branch={branch} index={index} />
      ))}
    </>
  );
};
