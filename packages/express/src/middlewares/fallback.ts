export function fallback(req, res, next) {
    res.status(404);
    res.json({});
}

export default fallback;
