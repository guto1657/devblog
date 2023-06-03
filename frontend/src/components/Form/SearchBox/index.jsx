//Imports
import P from "prop-types";
//Styles
import * as Styled from "./styles";
//Components
import { Heading } from "../../Layout/Heading";
import { Button } from "../../Layout/Button";

export const SearchBox = ({ OnChangeFn, OnClickFn }) => {
    return (
        <Styled.Container>
            <Heading
                text="Veja os nossos posts mais recentes"
                type="h3"
                size="large"
            />
            <Styled.SearchWrapper>
                <Styled.SearchInput
                    type="text"
                    placeholder="Pesquisar por tags..."
                    onChange={OnChangeFn}
                />
                <Button text="Pesquisar" onClickFn={OnClickFn} />
            </Styled.SearchWrapper>
        </Styled.Container>
    );
};

//PropTypes validation
SearchBox.propTypes = {
    OnChangeFn: P.func,
    OnClickFn: P.func,
};
