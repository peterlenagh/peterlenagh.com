import { getPresentations } from '@/app/presentations/utils';
import PresentationPreview from '@/components/PresentationPreview';

type PageProps = {
  searchParams?: {
    search?: string
  }
};

export default async function SlidePage(props: PageProps) {

    const presentations = getPresentations();
    return (
        <>
            {presentations.map((presentation) => (
                // @ts-expect-error Server Component
                <PresentationPreview key={presentation} presentation={presentation} linkTitle />
            ))}
        </>
    );
}
