import plugins from '../plugins';

export function getPluginIfExist(type: string) {
    return plugins[type || ''] || undefined;
}

export default getPluginIfExist;
