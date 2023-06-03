//Imports
import { useContext, useEffect, useRef, useState } from "react";
//Styles
import * as Styled from "./styles";
//Contexts
import { PostContext } from "../../context/PostContext";
//Components
import { Heading } from "../../components/Layout/Heading";
import { SearchBox } from "../../components/Form/SearchBox";
import { Pagination } from "../../components/Layout/Pagination";

export const Home = () => {
    //initial states
    const [allPosts, setAllPosts] = useState();
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [hasFiltered, setHasFiltered] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchedTags, setSearchedTags] = useState("");
    //contexts
    const { isLoading, getAllPosts } = useContext(PostContext);
    //component is mounted ref
    const isMounted = useRef(true);

    //function to handle search input change
    function handleSearchChange(e) {
        setSearchText(e.target.value);
    }

    //function to handle post filtering
    function handlePostFilter() {
        if (searchText !== "" && allPosts.length > 0) {
            //remove all # from string and split into array
            const searchTags = searchText.replace(/#/g, "").split(" ");

            //clean searched tags state
            setSearchedTags("");
            //add each tag from searchTags to string to show user if posts not found
            searchTags.forEach((t) => {
                setSearchedTags((st) => st + ` #${t}`);
            });

            const filtered = allPosts.filter((post) => {
                //transform post tags to lowerCase
                let postsTagsLowerCase = post.tags.map((tag) =>
                    tag.toLowerCase()
                );

                //check if every searchedTag is included in post tags
                // if all tags are included every returns true
                return searchTags.every((searchedTag) => {
                    return postsTagsLowerCase.includes(
                        `#${searchedTag.toLowerCase()}`
                    );
                });
            });
            setHasFiltered(true);
            setFilteredPosts(filtered);
        }
    }

    //useEffect to fetch all posts on component mounting
    useEffect(() => {
        isMounted.current = true;

        if (isMounted.current) {
            getAllPosts().then((data) => setAllPosts(data));
        }

        return () => {
            isMounted.current = false;
        };
    }, []);

    //useEffect to clean filtered posts if searchText is empty
    useEffect(() => {
        if (isMounted.current && searchText === "") {
            setHasFiltered(false);
            setFilteredPosts([]);
        }
    }, [searchText]);

    //SCROLL TO TOP WHEN USER ACCESS PAGE
    useEffect(() => {
        window.scrollTo(0, 0);

        return () => {};
    }, []);

    return (
        <Styled.HomeContainer>
            <SearchBox
                OnChangeFn={handleSearchChange}
                OnClickFn={handlePostFilter}
            />
            {/* Display pagination if no filter is applied and there are posts to show */}
            {!isLoading &&
                !hasFiltered &&
                filteredPosts.length === 0 &&
                allPosts?.length > 0 && (
                    <Pagination posts={allPosts} postsPerPage={5} />
                )}
            {/* Display error message if there was an error fetching posts */}
            {!isLoading && allPosts === null && (
                <Styled.MessageWrapper>
                    <Heading
                        type="h2"
                        size="big"
                        text="Não foi possível carregar os posts no momento. Por favor, tente novamente mais tarde."
                    />
                </Styled.MessageWrapper>
            )}
            {/* Display message if there are no posts to show */}
            {!isLoading && allPosts?.length === 0 && (
                <Styled.MessageWrapper>
                    <Heading
                        type="h2"
                        size="big"
                        text="Nenhum post encontrado :("
                    />
                </Styled.MessageWrapper>
            )}
            {/* Display loading message while fetching posts */}
            {isLoading && (
                <Styled.MessageWrapper>
                    <Heading type="h2" size="big" text="Carregando..." />
                </Styled.MessageWrapper>
            )}
            {/* Display pagination if a filter is applied and there are filtered posts to show */}
            {!isLoading &&
                allPosts?.length > 0 &&
                hasFiltered &&
                searchText &&
                filteredPosts.length > 0 && (
                    <Pagination posts={filteredPosts} postsPerPage={5} />
                )}
            {/* Display message if a filter is applied but no posts match the filter */}
            {!isLoading &&
                allPosts?.length > 0 &&
                hasFiltered &&
                searchText &&
                filteredPosts.length === 0 && (
                    <Styled.MessageWrapper>
                        <Heading
                            type="h2"
                            size="big"
                            text={`Nenhum post encontrado com a(s) tag(s) "${searchedTags}"`}
                        />
                    </Styled.MessageWrapper>
                )}
        </Styled.HomeContainer>
    );
};
