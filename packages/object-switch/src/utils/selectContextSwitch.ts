export function selectContextSwitch(o: Record<string, unknown>, context: any) {
    const x = Object.entries(o).find(([k, _]) => {
        const [attr, val = ''] = k.split(':');
        return context[attr] === val;
    });

    return x?.[1] || o?.['*'] || undefined;
}

export default selectContextSwitch;