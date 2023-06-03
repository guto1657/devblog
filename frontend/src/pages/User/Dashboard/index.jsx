//Imports
import { useContext, useEffect, useState, useRef } from "react";
//Styles
import * as Styled from "./styles";
//Hooks
import { useNavigate } from "react-router-dom";
//Contexts
import { Context } from "../../../context/UserContext";
import { PostContext } from "../../../context/PostContext";
import { CommentContext } from "../../../context/CommentContext";
//Components
import { Heading } from "../../../components/Layout/Heading";
import { ImageBox } from "../../../components/Layout/ImageBox";
import { formatDate } from "../../../helpers/formatDate";
import { Button } from "../../../components/Layout/Button";
import { Loader } from "../../../components/Layout/Loader";

export const Dashboard = () => {
    //initial states
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [userComments, setUserComments] = useState([]);
    const [currentAction, setCurrentAction] = useState("posts");
    const [activeEdit, setActiveEdit] = useState(false);
    //contexts
    const { authenticated, checkUser } = useContext(Context);
    const { removePost, getUserPosts } = useContext(PostContext);
    const { getUserComments, removeComment, editComment } =
        useContext(CommentContext);
    //ref to check if component is mounted
    const isMounted = useRef(true);
    //hooks
    const navigate = useNavigate();
    //ref of current input being edit
    const editCommentInputRef = useRef(null);

    //function to switch dashboard view
    const switchDashboardView = () => {
        if (currentAction === "posts") {
            setCurrentAction("comments");
        } else {
            setCurrentAction("posts");
        }
    };

    //function to be called on post comment remove
    const handlePostRemoveSuccess = () => {
        getUserPosts().then((data) => {
            setUserPosts(data);
        });
        getUserComments().then((data) => {
            setUserComments(data);
        });
    };

    //function to be called on edit comment success
    const handleCommentEditSuccess = () => {
        getUserComments().then((data) => {
            setUserComments(data);
        });
        setActiveEdit(null);
    };

    //function to remove comment
    const handleCommentRemoveSuccess = () => {
        getUserComments().then((data) => {
            setUserComments(data);
        });
    };

    //function to set active edit
    const handleActiveEdit = (commentId) => {
        setActiveEdit(commentId);
    };

    //function to set active edit to null
    const handleCancelActiveEdit = () => {
        setActiveEdit(null);
    };

    //function to redirect to post
    const handlePostRedirect = (postId) => {
        navigate(`/post/${postId}`);
    };

    //function to redirect to post edit
    const handlePostEditRedirect = (postId) => {
        navigate(`/post/edit/${postId}`);
        window.scrollTo(0, 0);
    };

    //set focus to input when user wants to edit comment
    useEffect(() => {
        if (activeEdit && editCommentInputRef.current) {
            editCommentInputRef.current.focus();
        }
    }, [activeEdit, editCommentInputRef]);

    //useEffect to redirect user if user is not authenticated
    useEffect(() => {
        if (!authenticated) {
            navigate("/home");
        }
    }, [authenticated]);

    //useEffect to fetch dashboard data if component is mounted and user is authenticated
    useEffect(() => {
        isMounted.current = true;

        if (isMounted.current && authenticated) {
            //fetch current user data
            checkUser().then((data) => {
                //set loading to false
                setIsLoading(false);
                //if current user exists
                if (data?.currentUser && data.currentUser !== null) {
                    setCurrentUser(data.currentUser);

                    //fetch user posts
                    getUserPosts().then((data) => {
                        setUserPosts(data);
                    });
                    //fetch user comments
                    getUserComments().then((data) => {
                        setUserComments(data);
                    });
                } else {
                    navigate("/home");
                }
            });
        }

        return () => {
            isMounted.current = false;
        };
    }, []);

    return (
        <>
            <Styled.Container>
                {/*displays user information only if the user's name exist*/}
                {currentUser?.name && (
                    <>
                        <Styled.TitleWrapper>
                            <Heading text="Dashboard" />
                        </Styled.TitleWrapper>
                        {/*displays user information*/}
                        <Styled.ProfileWrapper>
                            <Styled.ProfileImageWrapper>
                                {/* User image */}
                                <ImageBox
                                    src={currentUser.image}
                                    altText={currentUser.name}
                                />
                            </Styled.ProfileImageWrapper>
                            <Styled.ProfileInformationWrapper>
                                <Styled.RowStart>
                                    {/* User name */}
                                    <Heading
                                        text={`${currentUser.name}`}
                                        size="big"
                                    />
                                    {/* Redirect to user edit page */}
                                    <Styled.CogLink to="/users/edit">
                                        <Styled.CogIcon aria-label="Cog Icon" />
                                    </Styled.CogLink>
                                </Styled.RowStart>
                                {/* User email */}
                                <Heading
                                    text={`${currentUser.email}`}
                                    size="medium"
                                    bold={false}
                                />
                                {/* User created account date */}
                                <Heading
                                    text={`
                                    Data de entrada: ${formatDate(
                                        currentUser.createdAt
                                    )}
                                `}
                                    bold={false}
                                    size="medium"
                                />
                                {/*Display the number of posts the user has created */}
                                <Styled.PostsCommentsInfoWrapper>
                                    <Styled.PostsInfoWrapper>
                                        <Heading text={"Posts"} size="medium" />
                                        <Heading
                                            text={`${userPosts?.length || 0}`}
                                            size="medium"
                                        />
                                    </Styled.PostsInfoWrapper>
                                    {/*Display the number of comments the user has made */}
                                    <Styled.CommentsInfoWrapper>
                                        <Heading
                                            text={"Comentários"}
                                            size="medium"
                                        />
                                        <Heading
                                            text={`${
                                                userComments?.length || 0
                                            }`}
                                            size="medium"
                                        />
                                    </Styled.CommentsInfoWrapper>
                                </Styled.PostsCommentsInfoWrapper>
                            </Styled.ProfileInformationWrapper>
                        </Styled.ProfileWrapper>
                        {/*  Show buttons to switch between viewing the user's posts and comments, 
                    with "active" class indicating the currently selected view */}
                        <Styled.ViewOptionWrapper aria-label="View Options">
                            <Styled.ViewOption
                                className={
                                    currentAction === "posts" && "active"
                                }
                                onClick={switchDashboardView}
                                aria-label="View Option"
                            >
                                Posts
                            </Styled.ViewOption>
                            <Styled.ViewOption
                                className={
                                    currentAction === "comments" && "active"
                                }
                                onClick={switchDashboardView}
                                aria-label="View Option"
                            >
                                Comentários
                            </Styled.ViewOption>
                        </Styled.ViewOptionWrapper>
                        {/*Display a header for the dashboard, with the title of 
                    "Título do post" and user posts depending if the current view is "posts", 
                    and userPosts length is greater than 0 */}
                        {currentAction === "posts" && userPosts?.length > 0 && (
                            <>
                                <Styled.DashboardHeader>
                                    <Styled.DashboardText>
                                        Título do post
                                    </Styled.DashboardText>
                                    <Styled.DashboardText>
                                        Ações
                                    </Styled.DashboardText>
                                </Styled.DashboardHeader>
                                {userPosts?.map((post, index) => (
                                    <Styled.DashboardRow key={index}>
                                        <Styled.DashboardText>
                                            {post.title}
                                        </Styled.DashboardText>
                                        <Styled.DashboardActionsWrapper>
                                            <Button
                                                text="Ler"
                                                variant="outline"
                                                onClickFn={() =>
                                                    handlePostRedirect(post._id)
                                                }
                                                small={true}
                                            />
                                            <Button
                                                text="Editar"
                                                variant="outline"
                                                onClickFn={() =>
                                                    handlePostEditRedirect(
                                                        post._id
                                                    )
                                                }
                                                small={true}
                                            />
                                            <Button
                                                text="Excluir"
                                                variant="outline"
                                                onClickFn={() =>
                                                    removePost(
                                                        post._id,
                                                        handlePostRemoveSuccess
                                                    )
                                                }
                                                small={true}
                                            />
                                        </Styled.DashboardActionsWrapper>
                                    </Styled.DashboardRow>
                                ))}
                            </>
                        )}
                        {/* Display message if current view is "posts" and userPosts length is equal to 0 */}
                        {currentAction === "posts" &&
                            userPosts?.length == 0 && (
                                <Styled.CenterTextWrapper>
                                    <Heading
                                        text="Você ainda não tem nenhum post."
                                        size="medium"
                                        bold={false}
                                    />
                                </Styled.CenterTextWrapper>
                            )}
                        {/*Display user comments depending if the current view is "comments", 
                    and userComments length is greater than 0 */}
                        {currentAction === "comments" &&
                            userComments?.length > 0 && (
                                <>
                                    <Styled.DashboardHeader>
                                        <Styled.DashboardText>
                                            Comentário
                                        </Styled.DashboardText>
                                        <Styled.DashboardText>
                                            Ações
                                        </Styled.DashboardText>
                                    </Styled.DashboardHeader>
                                    {userComments?.map((comment, index) => (
                                        <Styled.DashboardRow key={index}>
                                            {/*Display a input to user edit comment if activeEdit is equal to comment id
                                         or comment text if activeEdit is false */}
                                            {activeEdit === comment._id ? (
                                                <Styled.EditInput
                                                    defaultValue={
                                                        comment.commentText
                                                    }
                                                    ref={editCommentInputRef}
                                                    placeholder="Edite seu comentário aqui.."
                                                />
                                            ) : (
                                                <Styled.DashboardText>
                                                    {comment.commentText}
                                                </Styled.DashboardText>
                                            )}
                                            {/* Display actions for the dashboard comments, 
                                with the conclude edit and cancel edit button
                                  or read,edit and remove button depending if the activeEdit is true*/}
                                            <Styled.DashboardActionsWrapper>
                                                {activeEdit === comment._id ? (
                                                    <>
                                                        <Button
                                                            text="Salvar"
                                                            variant="success"
                                                            onClickFn={() =>
                                                                editComment(
                                                                    comment.post
                                                                        ._id,
                                                                    comment._id,
                                                                    editCommentInputRef
                                                                        .current
                                                                        .value,
                                                                    handleCommentEditSuccess
                                                                )
                                                            }
                                                            small={true}
                                                        />
                                                        <Button
                                                            text="Cancelar"
                                                            variant="danger"
                                                            onClickFn={() => {
                                                                handleCancelActiveEdit(
                                                                    comment._id
                                                                );
                                                            }}
                                                            small={true}
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button
                                                            text="Post"
                                                            variant="outline"
                                                            onClickFn={() =>
                                                                handlePostRedirect(
                                                                    comment.post
                                                                        ._id
                                                                )
                                                            }
                                                            small={true}
                                                        />
                                                        <Button
                                                            text="Editar"
                                                            variant="outline"
                                                            onClickFn={() => {
                                                                handleActiveEdit(
                                                                    comment._id
                                                                );
                                                            }}
                                                            small={true}
                                                        />
                                                        <Button
                                                            text="Excluir"
                                                            variant="outline"
                                                            onClickFn={() => {
                                                                removeComment(
                                                                    comment._id,
                                                                    handleCommentRemoveSuccess
                                                                );
                                                            }}
                                                            small={true}
                                                        />
                                                    </>
                                                )}
                                            </Styled.DashboardActionsWrapper>
                                        </Styled.DashboardRow>
                                    ))}
                                </>
                            )}

                        {/* Display message if current view is "comments" and userComments length is equal to 0 */}
                        {currentAction === "comments" &&
                            userComments?.length == 0 && (
                                <Styled.CenterTextWrapper>
                                    <Heading
                                        text="Você ainda não tem nenhum comentário."
                                        size="medium"
                                        bold={false}
                                    />
                                </Styled.CenterTextWrapper>
                            )}
                    </>
                )}
            </Styled.Container>
            {isLoading && <Loader />}
        </>
    );
};
