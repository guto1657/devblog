export const postMock = {
    _id: "1",
    image: "example.png",
    title: "post title 1",
    content: "<p>post content</p>",
    user: {
        name: "john doe",
    },
    tags: ["#tag1", "#tag2"],
    createdAt: "2023-04-05T19:27:03.125+00:00",
    updatedAt: "2023-04-05T19:27:03.125+00:00",
};

export const commentsMock = [
    {
        user: {
            image: "example.png",
            name: "john doe",
        },
        createdAt: "2023-04-05T19:27:03.125+00:00",
        _id: "1",
        commentText: "this is a comment 01",
    },
    {
        user: {
            image: "example.png",
            name: "jane doe",
            _id: "2",
        },
        createdAt: "2023-04-05T19:27:03.125+00:00",
        _id: "2",
        commentText: "this is a comment 02",
    },
];

export const currentUserMock = {
    name: "john doe",
    _id: "1",
};
