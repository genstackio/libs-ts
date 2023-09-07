// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function applyCleaner(v: any, value: any, options: any = {}) {
    value = value || '';
    return !!v?.clean ? v.clean(value) : value;
}

export default applyCleaner;
