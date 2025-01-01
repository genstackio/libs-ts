import { auth_data, tokens } from '../types';
import decodeJwt from 'jwt-decode';

function isAccessTokenValid({ accessToken }: tokens, minExpirationDelay = 2): boolean {
    if (!accessToken) return false;
    return !isTokenExpired(accessToken, minExpirationDelay);
}
function isIdentified({ accessToken }: tokens): boolean {
    return !!accessToken;
}
function decodeToken(token: string): auth_data {
    return decodeJwt(token) as auth_data;
}
function isTokenExpired(token: string | undefined, minExpirationDelay = 2) {
    if (!token) return true;
    const decodedToken = decodeToken(token);
    const now = Math.floor(Date.now() / 1000);
    return (decodedToken || {}).exp - now < ((minExpirationDelay as number) || 1);
}

export function factory(
    createAccessToken: () => Promise<tokens>,
    refreshAccessToken: (tokens: tokens) => Promise<tokens>,
    minExpirationDelay = 2,
) {
    const ctx: tokens = { accessToken: undefined, refreshToken: undefined };
    const setTokens = (tokens: tokens) => (Object.assign as any)(ctx, tokens);
    return async () => {
        if (!isIdentified(ctx)) setTokens(await createAccessToken());
        if (!isAccessTokenValid(ctx, minExpirationDelay)) setTokens(await refreshAccessToken(ctx));
        return `Bearer ${ctx.accessToken}`;
    };
}

export default factory;
