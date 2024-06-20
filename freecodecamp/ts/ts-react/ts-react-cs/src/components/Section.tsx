import React from "react";


type sectionProps = {
    title?: string;
    children: React.ReactNode;
}

export const Section = ({ children, title = "My Subheading" }: sectionProps) => {
    return (
        <section>
            <h2>{title}</h2>
            <p>{children}</p>
        </section>
    );
}

