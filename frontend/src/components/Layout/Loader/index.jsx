//Styles
import * as Styled from "./styles";

export const Loader = () => {
    return (
        <Styled.Container aria-label="Loader-wrapper">
            <Styled.Circle aria-label="Loading-dots"></Styled.Circle>
        </Styled.Container>
    );
};
