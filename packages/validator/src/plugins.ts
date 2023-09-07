const basePlugins = {
    code: {
        test: (v) =>
            /^[a-z0-9-_:]+$/i.test(v) && !/^(.+\.php|.+\.zip|.+\.env|cron|components|cronlab|crontab)$/i.test(v),
        clean: (v) => (v || '').replace(/[^a-z0-9-_:]+/gi, ''),
    },
    country: {
        test: (v) => /^[a-z-_]{2,}$/i.test(v),
        clean: (v) => (v || '').replace(/[^a-z-_]+/gi, '').toUpperCase(),
    },
    locale: {
        test: (v) => /^[a-z]{2}[_-][a-z]{2}$/i.test(v),
        clean: (v) => (v || '').replace(/[^a-z-_]+/gi, ''),
    },
    rna: {
        test: (v) => /^W[0-9]{9}$/i.test(v),
        clean: (v) => (v || '').replace(/[^w0-9]+/gi, '').toUpperCase(),
    },
    token: {
        test: (v) => /^[a-z0-9]{12,}$/i.test(v),
        clean: (v) => (v || '').replace(/[^a-z0-9]+/gi, ''),
    },
    uuid: {
        test: (v) => /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(v),
        clean: (v) => (v || '').replace(/[^a-f0-9-]+/gi, ''),
    },
    ipv4: {
        test: (v) => /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/.test(v),
        clean: (v) => (v || '').replace(/[^0-9.]+/gi, ''),
    },
    email: {
        test: (v) => /^[^@\s]+@[^@\s]+\.[^@\s.]+$/.test(v),
        clean: (v) => (v || '').replace(/[^@a-zàâæáäãåāéèêëęėēÿûùüúūîïìíįīôœöòóõøōçćčñń%0-9._\-+~]+/gi, ''),
    },
    phone: {
        test: (v) => /^[0-9-+]+$/.test(v),
        clean: (v) => (v || '').replace(/[^0-9-+]+/gi, ''),
    },
    url: {
        test: (v) => /^http[s]?:\/\/.+$/.test(v),
    },
    arn: {
        test: (v) => /^arn:[^:]*:[^:]*:[^:]*:[^:]*:.+$/.test(v),
        clean: (v) => (v || '').replace(/\s+/gi, ''),
    },
};

const plugins = {
    ...basePlugins,
    id: basePlugins.uuid,
    publicToken: basePlugins.uuid,
    privateToken: basePlugins.uuid,
    compositeToken: {
        test: (v) =>
            basePlugins.uuid.test((v || '').slice(0, 36)) &&
            '-' === (v || '').slice(36, 37) &&
            (basePlugins.token.test(v.slice(37)) || basePlugins.uuid.test(v.slice(37))),
    },
    key: basePlugins.code,
};

export default plugins;
