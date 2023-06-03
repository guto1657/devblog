//Imports
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
//Contexts
import { Context } from "../../../context/UserContext";
import { PostContext } from "../../../context/PostContext";
//Components
import { PostForm } from "../../../components/Form/PostForm";
import { Loader } from "../../../components/Layout/Loader";

export const EditPost = () => {
    //initial states
    const [postData, setPostData] = useState({});
    //contexts
    const { authenticated } = useContext(Context);
    const { isLoading, editPost, getPostById } = useContext(PostContext);
    //hooks
    const navigate = useNavigate();
    const { id: postId } = useParams();
    //components is mounted ref
    const isMounted = useRef(true);

    //useEffect to redirect user if user is not authenticated and fetch post data if authenticated
    useEffect(() => {
        isMounted.current = true;

        if (!authenticated) {
            navigate("/home");
        } else if (isMounted.current && authenticated) {
            getPostById(postId).then((data) => {
                setPostData(data);
            });
        }

        return () => {
            isMounted.current = false;
        };
    }, [authenticated]);

    //scroll to top when user access page
    useEffect(() => {
        window.scrollTo(0, 0);

        return () => {};
    }, []);

    return (
        <>
            {authenticated && postData?.title ? (
                <PostForm
                    btnText="Edite seu post"
                    headingText="Editar Post"
                    subHeadingText="Revise e atualize o seu post"
                    handleSubmit={editPost}
                    postData={postData}
                />
            ) : null}
            {isLoading && <Loader />}
        </>
    );
};
