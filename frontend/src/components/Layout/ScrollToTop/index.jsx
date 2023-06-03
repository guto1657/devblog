//Imports
import React, { useEffect, useState } from "react";
//Styles
import * as Styled from "./styles";

export const ScrollToTop = () => {
    //initial states
    const [active, setActive] = useState(false);

    //function to go to top of the page
    const handleScrollTop = () => {
        window.scrollTo(0, 0);
    };

    //function to be called inside scroll listener useEffect
    const handleScrollListener = () => {
        if (window.scrollY > 100) {
            setActive(true);
        } else {
            setActive(false);
        }
    };

    //useEffect to set scroll listener
    useEffect(() => {
        document.addEventListener("scroll", handleScrollListener);

        return () => {
            document.removeEventListener("scroll", handleScrollListener);
        };
    }, []);

    return (
        <Styled.Container isActive={active ? 1 : 0} onClick={handleScrollTop}>
            <Styled.ArrowTop aria-label="Scroll to top Icon" />
        </Styled.Container>
    );
};
