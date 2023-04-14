export async function json(path: string) {
    const [fileName, json] = path.split('/', 2);
    return {
        input: 'undefined' === json ? undefined : JSON.parse(json),
        fileName,
    };
}

export default json;
