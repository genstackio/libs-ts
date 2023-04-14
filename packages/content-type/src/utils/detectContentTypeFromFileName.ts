const mapping = {
    // data
    json: 'application/json',
    csv: 'text/csv',
    // code
    js: 'text/javascript',
    css: 'text/css',
    html: 'text/html;charset=utf-8',
    // doc
    pdf: 'application/pdf',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    xls: 'application/vnd.ms-excel',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    doc: 'application/msword',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ppt: 'application/vnd.ms-powerpoint',
    rtf: 'application/rtf',
    // images
    svg: 'image/svg+xml',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    tiff: 'image/tiff',
    avif: 'image/avif',
    heif: 'image/heif',
    raw: 'image/x-dcraw',
    webp: 'image/webp',
    // video
    mp4: 'video/mp4',
};

export function detectContentTypeFromFileName(name: string): [string, string] | undefined {
    if (!name) return undefined;
    const type = (name.replace(/\?.*$/, '').slice(name.lastIndexOf('.') + 1) || '').toLowerCase();
    const contentType = mapping[type] || undefined;
    return contentType ? [contentType, type] : undefined;
}

// noinspection JSUnusedGlobalSymbols
export default detectContentTypeFromFileName;
