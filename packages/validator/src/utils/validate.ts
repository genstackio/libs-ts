import getPluginIfExist from './getPluginIfExist';
import applyValidator from './applyValidator';

export function validate(type: string, value: any, options: any = {}) {
    const r = applyValidator(getPluginIfExist(type), value, options);
    if (!r) {
        const e = new Error(`Malformed requested (#${type})`);
        e['code'] = 400;
        throw e;
    }
}

export default validate;
