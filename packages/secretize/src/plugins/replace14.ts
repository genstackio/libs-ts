export function marshall(data: string) {
    return data.replace(/[1]/g, '@@1@@').replace(/[4]/g, '1').replace(/@@1@@/g, '4');
}
export function unmarshall(data: string) {
    return data.replace(/[4]/g, '@@4@@').replace(/[1]/g, '4').replace(/@@4@@/g, '1');
}
