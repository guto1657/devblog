//Imports
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
//Styles
import * as Styled from "./styles";
//Helpers
import { formatDate } from "../../../helpers/formatDate";
//Contexts
import { Context } from "../../../context/UserContext";
import { PostContext } from "../../../context/PostContext";
import { CommentContext } from "../../../context/CommentContext";
//React icons
import { MdChevronLeft } from "react-icons/md";
//Components
import { Heading } from "../../../components/Layout/Heading";
import { TextComponent } from "../../../components/Layout/TextComponent";
import { ImageBox } from "../../../components/Layout/ImageBox";
import { CommentBox } from "../../../components/Form/CommentBox";
import { UserComment } from "../../../components/Layout/UserComment";
import { Button } from "../../../components/Layout/Button";

export const ReadPost = () => {
    //initial state
    const [post, setPost] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [comments, setComments] = useState([]);
    //contexts
    const { authenticated, checkUser } = useContext(Context);
    const { getPostById } = useContext(PostContext);
    const { createComment, editComment, removeComment, getCommentsByPostId } =
        useContext(CommentContext);
    //ref to check if component is mounted
    const isMounted = useRef(true);
    //ref of create comment input
    const commentInputRef = useRef(null);
    //post id from url
    const { id: postId } = useParams();
    //hook
    const navigate = useNavigate();

    //function to be called on comments success
    const handleCommentSuccess = () => {
        getCommentsByPostId(postId).then((data) => {
            if (data) {
                setComments(data);
            }
        });
    };

    //function to be called on create comment success
    const handleCreateCommentSuccess = () => {
        getCommentsByPostId(postId).then((data) => {
            if (data) {
                setComments(data);
            }
        });

        commentInputRef.current.value = "";
    };

    //useEffect to fetch posts,comments and current user data
    useEffect(() => {
        isMounted.current = true;

        if (isMounted.current) {
            //fetch post data
            getPostById(postId).then((data) => {
                //if post data is null redirect to home
                if (data === null) {
                    navigate("/page/404");
                    return;
                }

                setPost(data);
            });
            //fetch post comments data
            getCommentsByPostId(postId).then((data) => {
                if (data) {
                    setComments(data);
                }
            });
            //fetch current user data
            checkUser().then((data) => {
                setCurrentUser(data?.currentUser);
            });
        }

        return () => {
            isMounted.current = false;
        };
    }, []);

    //scroll to top when user access page
    useEffect(() => {
        window.scrollTo(0, 0);

        return () => {};
    }, []);

    if (!post) return null;

    return (
        <Styled.Container>
            {/* Only display if post has a title */}
            {post.title && (
                <>
                    {/* Post header */}
                    <Styled.PostHeader>
                        <Styled.BackWrapper>
                            <Styled.BackLink to="/">
                                <MdChevronLeft />
                                Voltar
                            </Styled.BackLink>
                        </Styled.BackWrapper>
                        {/* Post title */}
                        <Heading text={post.title} />
                        {/* Post author and creation date */}
                        <TextComponent>
                            Por: {post.user.name} - {formatDate(post.createdAt)}
                        </TextComponent>
                        {/* Post image */}
                        <ImageBox src={post.image} altText={post.title} />
                    </Styled.PostHeader>
                    {/* Post content */}
                    <Styled.ContentWrapper>
                        <Styled.DisplayContent
                            dangerouslySetInnerHTML={{
                                __html: post.content,
                            }}
                        />
                        {/* Post tags */}
                        <Styled.TagsWrapper>
                            <Styled.TagsInfo>Tags: </Styled.TagsInfo>
                            {post.tags.map((tag, index) => {
                                return (
                                    <Styled.TagText key={index}>
                                        {tag.replace(/#/g, "")}
                                    </Styled.TagText>
                                );
                            })}
                        </Styled.TagsWrapper>
                        {/* Number of comments */}
                        <Styled.CommentsNumberText>{`Comentários (${comments.length})`}</Styled.CommentsNumberText>
                        <Styled.Line></Styled.Line>
                        {/* If user is AUTHENTICATED show input to comment 
                        ELSE show button to SIGN UP */}
                        {authenticated ? (
                            <CommentBox
                                onClickFn={() =>
                                    createComment(
                                        postId,
                                        commentInputRef.current.value,
                                        handleCreateCommentSuccess
                                    )
                                }
                                placeHolderText={
                                    /* Check if post HAS Comments  */
                                    comments.length > 0
                                        ? "Deixe seu comentário aqui..."
                                        : "Seja o primeiro a comentar!"
                                }
                                inputRef={commentInputRef}
                            />
                        ) : (
                            <Styled.SignUpWrapper>
                                <Styled.SignUpText>
                                    Crie uma conta para comentar.
                                </Styled.SignUpText>
                                <Button
                                    text="Criar uma conta"
                                    onClickFn={() => {
                                        window.scrollTo(0, 0);
                                        navigate("/register");
                                    }}
                                />
                            </Styled.SignUpWrapper>
                        )}

                        {/* If there are comments, show them */}
                        {comments.length > 0 && (
                            <Styled.CommentsWrapper>
                                {comments.map((comment, index) => {
                                    return (
                                        <UserComment
                                            key={index}
                                            imageSrc={comment.user.image}
                                            userName={comment.user.name}
                                            creationDate={formatDate(
                                                comment.createdAt
                                            )}
                                            commentText={comment.commentText}
                                            showActions={
                                                /* CONDITIONAL TO CHECK IF CURRENT USER OWNS COMMENT */
                                                currentUser?._id ===
                                                comment.user._id
                                                    ? true
                                                    : false
                                            }
                                            removeCommentFn={() =>
                                                removeComment(
                                                    comment._id,
                                                    handleCommentSuccess
                                                )
                                            }
                                            editCommentFn={editComment}
                                            commentId={comment._id}
                                            postId={postId}
                                            successEditFn={handleCommentSuccess}
                                        />
                                    );
                                })}
                            </Styled.CommentsWrapper>
                        )}
                    </Styled.ContentWrapper>
                </>
            )}
        </Styled.Container>
    );
};
