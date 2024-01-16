function parseObjdsl(raw: string | undefined) {
    raw = (raw || '').trim();
    if (!raw.length) return {};
    const modules = raw.split(/\s*,\s*/g);
    return modules.reduce((res, module) => {
        const x = module.split(/\s*=\s*/g);
        const params = !x[1] ? [] : x[1].split(/\s*;\s*/g);

        const values = params.reduce((acc, param) => {
            const y = param.split(/\s*:\s*/g);
            return Object.assign(acc, { [y[0]]: y[1] });
        }, {});

        return Object.assign(res, { [x[0]]: values });
    }, {});
}
export default parseObjdsl;
