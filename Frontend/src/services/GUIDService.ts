const GetGUID = (): string => {
    const uniqueFileName = `${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
    return uniqueFileName.toString();
}

export default GetGUID;