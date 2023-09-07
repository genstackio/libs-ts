import getPluginIfExist from './getPluginIfExist';
import applyValidator from './applyValidator';
import applyCleaner from './applyCleaner';

export function clean(type: string, value: any, defaultValue: any = undefined, options: any = {}) {
    const x = getPluginIfExist(type);
    let r = applyValidator(x, value, options);
    if (!r) {
        value = applyCleaner(x, value, options);
        r = applyValidator(x, value, options);
        if (!r) {
            return defaultValue;
        }
    }
    return value;
}

export default clean;
