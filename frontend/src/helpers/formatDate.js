export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ];
    return `${date.getDate()} de ${
        monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
};
