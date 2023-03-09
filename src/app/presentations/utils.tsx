import fs from 'fs';
import dynamic from 'next/dynamic';
import path from 'path';

export const getPresentations = () => {
    return fs.readdirSync(path.resolve(`./src/presentations/`)).filter(path => !path.endsWith('index.ts'));
}

export const getPresentationSlides = (presentation: string) => {
    return fs.readdirSync(path.resolve(`./src/presentations/${presentation}`)).filter(path => !path.endsWith('index.ts')).map((fileName) => fileName.replace(".mdx", ""));
}

const findInModule = (presentation: string, slide: string) => (mod: any) => {
    return mod[`${presentation.replace(/[- ]/g, '')}`][`s${slide.slice(0,3).replace(/\D/g,'')}`];
}

export const getSlideComponent = async (presentation: string, slide: string) => {
    return dynamic(
        // () => import(`@/presentations/${fixSpaces(presentation)}/${fixSpaces(slide)}.mdx`), {
        () => import(`@/presentations`).then(findInModule(presentation, slide)),
        {
            loading: () => <section>Loading...</section>,
            ssr: true
        }
    );
}

export const fixSpaces = (str: string) => str.replaceAll('+', ' ').replaceAll('%20', ' ').replaceAll('%2B', ' ');
