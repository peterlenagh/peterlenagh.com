import { expect, test } from "@jest/globals";
import { act, render, screen } from "@testing-library/react";
import ArrowNext from "./Arrow/ArrowNext/ArrowNext";
import ArrowPrevious from "./Arrow/ArrowPrevious/ArrowPrevious";
import Carousel from "./Carousel";
import CarouselContextProvider from "./CarouselContextProvider";
import CarouselCount from "./CarouselCount/CarouselCount";

const slides = [
    {
        type: 'image',
        src: 'https://placekitten.com/g/700/700',
        ratio: 1
    },
    {
        type: 'image',
        src: 'https://placekitten.com/g/800/800',
        ratio: 1
    },
    {
        type: 'image',
        src: 'https://placekitten.com/g/900/900',
        ratio: 1
    },
    {
        type: 'image',
        src: 'https://placekitten.com/g/1000/1000',
        ratio: 1
    }
];

Element.prototype.scrollTo = jest.fn();
type CarouselWControlsProps = {
    infinite?: boolean
};

const CarouselWControls = ({ infinite = false }: CarouselWControlsProps) => (
    <CarouselContextProvider>
        <Carousel options={{ infinite }}>
            {slides.map((element, index) => {
                return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        id={`slide-${index}`}
                        key={`slide-${index}`}
                        className="carousel__image"
                        alt={`image #${index + 1}`}
                    />
                );
            })}
        </Carousel>
        <ArrowPrevious />
        <ArrowNext />
        <CarouselCount />

    </CarouselContextProvider>
);

test("renders nothing if no children", () => {
    const carousel = render(
        <CarouselContextProvider>
            <Carousel />
        </CarouselContextProvider>
    );
    const list = carousel.getByTestId("carousel-list");
    expect(list.children.length).toBe(0);
});


test("renders carousel with images", () => {
    const carousel = render(<CarouselWControls />);
    const list = carousel.getByTestId("carousel-list");
    expect(list.children.length).toBe(slides.length);
});

test("renders snapshot", () => {
    const carousel = render(<CarouselWControls />);
    expect(carousel).toMatchSnapshot();
});

// test("next button scrolls carousel", async () => {
//     const carousel = render(<CarouselWControls />);
//     const next = carousel.getByTestId("arrow-next");
//     act(() => {
//         next.click();
//     });
//     const count = carousel.getByTestId("carousel-count");
//     expect(count.textContent).toBe("2/4");
// });
