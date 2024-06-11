import ITranslatorService from '@genstackio/translator/lib/ITranslatorService';
import { TranslatorService } from '@genstackio/translator';
import DeeplPlugin from '@genstackio/translator-deepl';
import { AmazonTranslatePlugin } from '@genstackio/translator-amazontranslate';

const caches: Record<string, ITranslatorService> = {};

export function getTranslator(): ITranslatorService {
    if (!caches['default']) {
        const t = new TranslatorService();
        t.registerPlugin('deepl', new DeeplPlugin(), { '*': 10 });
        t.registerPlugin('amazontranslate', new AmazonTranslatePlugin(), { '*': 1 });
        caches['default'] = t;
    }
    return caches['default'];
}

export default getTranslator;
