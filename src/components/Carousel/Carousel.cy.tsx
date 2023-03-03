import React from 'react'
import ArrowNext from './Arrow/ArrowNext/ArrowNext';
import ArrowPrevious from './Arrow/ArrowPrevious/ArrowPrevious';
import Carousel from './Carousel'
import CarouselContextProvider from './CarouselContextProvider';
import CarouselCount from './CarouselCount/CarouselCount';
import CarouselPagination from './CarouselPagination/CarouselPaginatoin';

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
                        src={element.src}
                    />
                );
            })}
        </Carousel>
        <ArrowPrevious />
        <ArrowNext />
        <CarouselCount />
        <CarouselPagination />
    </CarouselContextProvider>
);
const ANIMATION_TIME = 500;


describe('Carousel With Controls', () => {
    beforeEach(() => {
        cy.viewport(500, 700);
        cy.mount(<CarouselWControls />);
    })
    it('renders', () => {
    });

    it('shows the first slide', () => {
        cy.isInView('#slide-0', '[data-testid="carousel-list"]');
        cy.isNotInView('#slide-1', '[data-testid="carousel-list"]');
    });

    it('shows the previous button as disabled initially', () => {
        cy.get('[data-testid="arrow-previous"]').should('be.disabled');
    });

    it('shows the second slide when you click next', () => {
        cy.get('[data-testid="arrow-next"]').click().blur();
        cy.wait(ANIMATION_TIME);
        cy.isNotInView('#slide-0', '[data-testid="carousel-list"]');
        cy.isInView('#slide-1', '[data-testid="carousel-list"]');
        cy.isNotInView('#slide-2', '[data-testid="carousel-list"]');
    });

    it("shows the previous button as enabled when you're not on the first slide", () => {
        cy.get('[data-testid="arrow-next"]').click().blur();
        cy.wait(ANIMATION_TIME);
        cy.get('[data-testid="arrow-previous"]').should('not.be.disabled');
    });

    it("shows the next button as enabled when you're not on the last slide", () => {
        cy.get('[data-testid="arrow-next"]').should('not.be.disabled');
    });

    it("shows the next button as disabled when you're on the last slide", () => {
        cy.get('[data-testid="arrow-next"]').click().click().click();
        cy.wait(ANIMATION_TIME);
        cy.get('[data-testid="arrow-next"]').should('be.disabled');
    });
});

describe('Infinite Carousel', () => {
    beforeEach(() => {
        cy.viewport(500, 700);
        cy.mount(<CarouselWControls infinite={true} />);
    })
    it('renders', () => {
    });

    it('shows the first slide', () => {
        cy.isInView('#slide-0', '[data-testid="carousel-list"]');
        cy.isNotInView('#slide-1', '[data-testid="carousel-list"]');
    });

    it('shows the previous button as not disabled initially', () => {
        cy.get('[data-testid="arrow-previous"]').should('not.be.disabled');
    });

    it('shows the last slide when you click previous', () => {
        cy.get('[data-testid="arrow-previous"]').click().blur();
        cy.wait(ANIMATION_TIME);
        cy.isNotInView('#slide-0', '[data-testid="carousel-list"]');
        cy.isInView('#slide-3', '[data-testid="carousel-list"]');
        cy.isNotInView('#slide-2', '[data-testid="carousel-list"]');
    });

    it.only("shows the first slide when you click next from the last slide", () => {
        cy.get('[data-testid="arrow-next"]').click().click().click().click();
        cy.wait(ANIMATION_TIME);
        cy.isNotInView('#slide-3', '[data-testid="carousel-list"]');
        cy.isInView('#slide-0', '[data-testid="carousel-list"]');
        cy.isNotInView('#slide-1', '[data-testid="carousel-list"]');
    });
});
