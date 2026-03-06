// Central image exports for local assets
import campusVibe from './campus_vibe.png';
import imageMain from './image.png';
import imageCopy from './image copy.png';
import icon from './icon.png';
import favicon from './favicon.png';
import featureImage from './{d5fc0cf5-3de7-4bb1-928f-9b69b602d948}.png';

export {
  campusVibe,
  imageMain,
  imageCopy,
  icon,
  favicon,
  featureImage,
};

// Cycle through available content images
export const contentImages = [campusVibe, imageMain, imageCopy, featureImage];
export const getContentImage = (index: number) => contentImages[index % contentImages.length];
