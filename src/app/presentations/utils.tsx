import fs from 'fs';
import dynamic from 'next/dynamic';
import path from 'path';

export const getPresentations = () => {
    return fs.readdirSync(path.resolve(`./src/presentations/`));
}

export const getPresentationSlides = (presentation: string) => {
    return fs.readdirSync(path.resolve(`./src/presentations/${presentation}`)).map((fileName) => fileName.replace(".mdx", ""));
}

export const getSlideComponent = async (presentation: string, slide: string) => {
    return dynamic(
        () => import(`@/presentations/${fixSpaces(presentation)}/${fixSpaces(slide)}.mdx`), {
        loading: () => <section>Loading...</section>,
        ssr: true
    }
    );
}

export const fixSpaces = (str: string) => str.replaceAll('+', ' ').replaceAll('%20', ' ').replaceAll('%2B', ' ');
