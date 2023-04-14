import fetch from 'node-fetch';

export async function url(url: string) {
    return {
        input: Buffer.from(await (await fetch(url)).arrayBuffer()),
        fileName: url,
    };
}

export default url;
