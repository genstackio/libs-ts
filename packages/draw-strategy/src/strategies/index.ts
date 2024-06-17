import { default as random } from './random';
import { default as applied_random } from './applied_random';
import { default as applied_or_noapplications_random } from './applied_or_noapplications_random';

export default {
    random,
    applied_random,
    applied_or_noapplications_random,
    default: random,
};