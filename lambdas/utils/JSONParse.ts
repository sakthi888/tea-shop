export const JSONParse = <Template>(str: string | null): Template => {
    if (str && str !== '') {
        try {
            return JSON.parse(str) as Template;
        } catch (error) {
            throw new Error(`Could not parse ${str}`)
        }
    } else {
        throw new Error(`Could not parse empty string`)
    }
};