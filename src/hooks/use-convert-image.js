// Function to convert an image file to a base64 string with reduced quality
const convertImageToBase64WithReducedQuality = (image, quality) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      const img = new Image();
      img.src = event.target?.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Could not create canvas context.'));
          return;
        }

        // Calculate the new dimensions (e.g., reduce to 50% of the original size)
        const maxWidth = img.width * 0.5;
        const maxHeight = img.height * 0.5;

        // Ensure the image fits within the maxWidth and maxHeight while preserving aspect ratio
        let newWidth = img.width;
        let newHeight = img.height;
        if (img.width > maxWidth || img.height > maxHeight) {
          const aspectRatio = img.width / img.height;
          if (img.width > maxWidth) {
            newWidth = maxWidth;
            newHeight = newWidth / aspectRatio;
          }
          if (newHeight > maxHeight) {
            newHeight = maxHeight;
            newWidth = newHeight * aspectRatio;
          }
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        // Draw the image on the canvas with the new dimensions
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Convert the canvas to a base64 string with reduced quality
        const base64 = canvas.toDataURL('image/jpeg', quality);

        resolve(base64);
      };

      img.onerror = (error) => {
        reject(error);
      };
    };

    reader.readAsDataURL(image);
  });

export const useConvertImages = async (images, quality) => {
  if (images) {
    const imagesArray = Array.from(images);
    const imageDataPromises = imagesArray.map((image) => convertImageToBase64WithReducedQuality(image, quality));
    const imageDataList = await Promise.all(imageDataPromises);
    return imageDataList;
  } else {
    return [];
  }
};
