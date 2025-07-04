import { PageDescription } from "./pageDescription";
import { PageTitle } from "./pageTitle";

interface PageMetaProps {
  title?: string;
  description?: string;
}

export const PageMeta = ({ title, description }: PageMetaProps) => {
  return (
    <>
      {title && <PageTitle title={title} />}
      {description && <PageDescription description={description} />}
    </>
  );
};
