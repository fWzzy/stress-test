import { existsSync, mkdirSync } from 'fs';
import sharp from 'sharp';

type ResizeImageArgs = {
  src: string;
  sizes: string[];
};
export default async function resizeImage({ src, sizes }: ResizeImageArgs) {
  const splitSrc = src.split('/');
  const [filename] = splitSrc.splice(-1);

  const sharpFile = sharp(src);

  sizes.map(async (size) => {
    const outputPath = `${splitSrc.join('/')}/${size}`;
    if (!existsSync(outputPath)) {
      mkdirSync(outputPath);
    }

    const [width, height] = size.split('x').map((n) => parseInt(n));

    await sharpFile
      .resize(height, width, { fit: 'cover' })
      .toFile(`${outputPath}/${filename}`);
  });
}
