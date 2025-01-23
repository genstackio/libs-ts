import { Readable } from 'stream';
import toArray from 'stream-to-array';

async function stream2buffer(streamOrBuffer: Readable | Buffer) {
    return streamOrBuffer instanceof Buffer
        ? streamOrBuffer
        : Buffer.concat(
              (await toArray(streamOrBuffer)).reduce((buffers: Uint8Array[], part: unknown) => {
                  // eslint-disable-next-line
            buffers.push(part instanceof Buffer ? part : Buffer.from(part as any));
                  return buffers;
              }, [] as Buffer[]),
          );
}

export default stream2buffer;
