//Imports
import P from "prop-types";
import { useState } from "react";
//Styles
import * as Styled from "./styles";
//Components
import { Post } from "../Post";
//React icons
import { MdChevronRight, MdChevronLeft } from "react-icons/md";

export const Pagination = ({ posts, postsPerPage = 5 }) => {
    //initial states
    const [currentPage, setCurrentPage] = useState(1);
    //get start index to display posts
    const startIndex = (currentPage - 1) * postsPerPage;
    //get last index
    const lastIndex = startIndex + postsPerPage;
    // Get current items to be displayed on the current page
    const currentItems = posts.slice(startIndex, lastIndex);
    // Get total number of pages
    const totalPages = Math.ceil(posts.length / postsPerPage);

    //function to go to next page
    const handleNextPage = () => {
        if (currentPage === totalPages) {
            return;
        } else {
            handleGoToTop();
            setCurrentPage((cp) => cp + 1);
        }
    };

    //function to go to previous page
    const handlePreviousPage = () => {
        if (currentPage <= 1) {
            setCurrentPage(1);
        } else {
            handleGoToTop();
            setCurrentPage(currentPage - 1);
        }
    };

    // Function to go to a specific page on button click
    const handleCurrentPage = (page) => {
        if (currentPage == page) {
            return;
        } else {
            handleGoToTop();
            setCurrentPage(page);
        }
    };

    // Function to render pagination buttons
    const handleRenderPaginationButtons = () => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }

        return pages.map((page, index) => (
            <Styled.PaginationPage
                className={currentPage == page ? "active" : ""}
                onClick={() => handleCurrentPage(page)}
                key={index}
                aria-label="Pagination Button"
            >
                {page}
            </Styled.PaginationPage>
        ));
    };

    // Function to go to top of the page
    const handleGoToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <>
            <Styled.PostsContainer>
                {currentItems.map((p) => (
                    <Post
                        key={p._id}
                        imgSrc={p.image}
                        headingText={p.title}
                        author={p.user.name}
                        tags={p.tags}
                        postData={p.createdAt}
                        id={p._id}
                    />
                ))}
            </Styled.PostsContainer>
            {totalPages > 1 && (
                <Styled.PaginationWrapper>
                    {currentPage > 1 && (
                        <Styled.PaginationNavigate
                            onClick={handlePreviousPage}
                            aria-label="Previous Page"
                        >
                            <MdChevronLeft />
                        </Styled.PaginationNavigate>
                    )}
                    {handleRenderPaginationButtons()}
                    {currentPage !== totalPages && (
                        <Styled.PaginationNavigate
                            onClick={handleNextPage}
                            aria-label="Next Page"
                        >
                            <MdChevronRight />
                        </Styled.PaginationNavigate>
                    )}
                </Styled.PaginationWrapper>
            )}
        </>
    );
};

//PropTypes validation
Pagination.propTypes = {
    posts: P.arrayOf(
        P.shape({
            _id: P.string.isRequired,
            title: P.string.isRequired,
            content: P.string.isRequired,
            image: P.string.isRequired,
            tags: P.array.isRequired,
            user: P.object.isRequired,
            createdAt: P.string.isRequired,
            updatedAt: P.string.isRequired,
        })
    ).isRequired,
    postsPerPage: P.number,
};
