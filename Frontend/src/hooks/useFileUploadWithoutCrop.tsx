import { UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import envConfig from '../config';
import GetGUID from '../services/GUIDService';
import { AnyObject } from '../types/AnyObject';

const useFileUploadNoCrop = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const resizeImage = async (file: File): Promise<File> => {
    // 1️⃣ Decode into an ImageBitmap (fast and memory-efficient)
    const bitmap = await createImageBitmap(file);

    // 2️⃣ Scale so the longest edge ≤ 1024 px
    const MAX = 1024; // Max dimension
    const MAX_SIZE = 500 * 1024; // 500KB

    // If file is already under 500KB, skip resizing
    if (file.size <= MAX_SIZE) {
      return file;
    }
    const ratio = Math.min(1, MAX / Math.max(bitmap.width, bitmap.height));

    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width * ratio;
    canvas.height = bitmap.height * ratio;

    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    // 3️⃣ Re-encode to WebP (quality 0.80)
    const blob: Blob = await new Promise((res, rej) =>
      canvas.toBlob(
        (blob) => {
          if (blob) {
            res(blob);
          } else {
            rej(new Error('Canvas toBlob returned null'));
          }
        },
        'image/webp',
        0.8
      )
    );

    // 4️⃣ Wrap blob in a File so the name & type look normal to the server
    return new File([blob], file.name.replace(/\.\w+$/, '.webp'), {
      type: 'image/webp',
    });
  };

  const beforeUpload = async (file: File) => {
    // const fileExtension = '.' + file.name.split('.').pop();
    const fileExtension = '.webp';
    const baseImageURL = envConfig.imageUrl;
    const imageId = GetGUID();
    const image: UploadFile = {
      uid: imageId,
      name: imageId + fileExtension,
      status: 'done',
      url: baseImageURL + imageId + fileExtension,
    };
    setFileList([...fileList, image]);
    let resizedFile = file;
    const MAX_SIZE = 500 * 1024; // 500KB
    // Keep resizing until file is under 500KB or resizing doesn't reduce size anymore
    while (resizedFile.size > MAX_SIZE) {
      const nextFile = await resizeImage(resizedFile);
      // If resizing doesn't reduce size, break to avoid infinite loop
      if (nextFile.size >= resizedFile.size) {
        break;
      }
      resizedFile = nextFile;
    }
    return resizedFile;
  };

  const onPreview = async (fileList: AnyObject) => {
    const src = envConfig.imageUrl + fileList.name;
    if (src) {
      window.open(src, '_blank');
    }
  };

  const onChange: UploadProps['onChange'] = ({
    file,
    fileList: newFileList,
  }): boolean => {
    const datalist: UploadFile[] = [];
    newFileList.forEach((file) => {
      if (!file.response) {
        datalist.push(file);
      }
    });
    setFileList(datalist);
    if (file.status === 'done') {
      return true;
    } else {
      return false;
    }
  };

  return { fileList, setFileList, beforeUpload, onPreview, onChange };
};

export default useFileUploadNoCrop;
