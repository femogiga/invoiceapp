


export const splitName = (fullName) => {
    const trimmed = fullName.trim();
    const splitted = trimmed.split(' ')
    const firstname = splitted[0]
    const lastname = splitted[1]
    return {firstname,lastname}

}
