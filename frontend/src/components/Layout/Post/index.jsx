//Imports
import P from "prop-types";
//Styles
import * as Styled from "./styles";
//Components
import { Heading } from "../Heading";
import { TextComponent } from "../TextComponent";
import { Button } from "../Button";
//Hooks
import { useNavigate } from "react-router-dom";
//Helpers
import { formatDate } from "../../../helpers/formatDate";

export const Post = ({ imgSrc, headingText, author, tags, postData, id }) => {
    const navigate = useNavigate();

    //function to redirect to post page on click
    function redirectToPostPage(id) {
        navigate(`/post/${id}`);
    }

    return (
        <Styled.Container>
            <Styled.Image src={imgSrc} alt={headingText} />
            <Heading text={headingText} size="large" type="h3" />
            <TextComponent>
                Por: {author} - {formatDate(postData)}
            </TextComponent>
            <Styled.TagsWrapper>
                {tags.map((t, i) => {
                    return (
                        <Styled.TagText key={i}>
                            {t.replace(/#/g, "")}
                        </Styled.TagText>
                    );
                })}
            </Styled.TagsWrapper>
            <Button
                text="Ler"
                variant="outline"
                onClickFn={() => redirectToPostPage(id)}
            />
        </Styled.Container>
    );
};

//PropTypes validation
Post.propTypes = {
    imgSrc: P.string.isRequired,
    headingText: P.string.isRequired,
    tags: P.arrayOf(P.string),
    author: P.string.isRequired,
    id: P.string.isRequired,
};
