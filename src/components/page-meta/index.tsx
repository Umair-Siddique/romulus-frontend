import { Box } from "@mui/material";

import { PageDescription } from "./PageDescription";
import { PageTitle } from "./PageTitle";

import { PageMetaProps } from "#types";

export const PageMeta = ({ title, description }: PageMetaProps) => {
  return (
    <Box>
      {title && <PageTitle title={title} />}
      {description && <PageDescription description={description} />}
    </Box>
  );
};
