export const formatAddress = (address) =>  {
    const formattedAddr = address.slice(0, 5) + "..." + address.slice(-4);

    return formattedAddr;

}


export const shortenText = (text) =>  {
    const shortenedText = text.slice(0, 25) + "..."

    return shortenedText;

}


export const textToLink = (text) => {
    const newText = text.replace(/\s/g, "+");
    return newText;
}

export const linkToText = (text) => {
    const newText = text.replace(/\+/g, " ");
    return newText;
}