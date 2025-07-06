import { BranchCard } from "./temp";

import { BranchesSectionProps } from "#types";

export const BranchesSection = ({ branches }: BranchesSectionProps) => {
  if (!Array.isArray(branches) || branches.length === 0) return null;

  return (
    <>
      {branches.map((branch: any, index: number) => (
        <BranchCard key={index} branch={branch} index={index} />
      ))}
    </>
  );
};
