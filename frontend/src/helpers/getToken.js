export const getToken = () => {
    const tokenValue = localStorage.getItem("token");
    const token = tokenValue ? JSON.parse(tokenValue) : "";
    return token;
};
