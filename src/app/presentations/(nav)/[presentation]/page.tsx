import PresentationPreview from "@/components/PresentationPreview";

import { fixSpaces } from "@/app/presentations/utils";

type PageProps = {
  params: {
    presentation: string;
  };
  searchParams?: {
    search?: string;
  };
};

export default async function SlidePage(props: PageProps) {
  const {
    params: { presentation: rawPresentation },
  } = props;
  const presentation = fixSpaces(rawPresentation);
  // @ts-expect-error Server Component
  return <PresentationPreview presentation={presentation} />;
}
