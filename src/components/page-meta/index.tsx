import { PageDescription } from "./pageDescription";
import { PageTitle } from "./pageTitle";

import { PageMetaProps } from "#types";

export const PageMeta = ({ title, description }: PageMetaProps) => {
  return (
    <>
      {title && <PageTitle title={title} />}
      {description && <PageDescription description={description} />}
    </>
  );
};
