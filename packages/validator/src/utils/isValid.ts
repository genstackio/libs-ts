import getPluginIfExist from './getPluginIfExist';
import applyValidator from './applyValidator';

export function isValid(type: string, value: any, options: { startsWith?: string } = {}) {
    return applyValidator(getPluginIfExist(type), value, options);
}

export default isValid;
