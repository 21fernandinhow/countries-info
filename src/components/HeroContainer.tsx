import { ReactNode } from "react";

interface HeroContainerProps {
    children: ReactNode;
}

const HeroContainer = ({children}: HeroContainerProps) => (
    <section className="py-20">
        <div className="container mx-auto text-center px-4">
            {children}
        </div>
    </section>
)

export default HeroContainer