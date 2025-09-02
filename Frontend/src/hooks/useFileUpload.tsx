import { UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import envConfig from '../config';
import GetGUID from '../services/GUIDService';
import { AnyObject } from '../types/AnyObject';

const useFileUpload = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const imageCropFunction = (file: AnyObject): boolean => {
    const fileExtension = '.' + file.name.split('.').pop();
    const baseImageURL = envConfig.imageUrl;
    const imageId = GetGUID();
    const image: UploadFile = {
      uid: imageId,
      name: imageId + fileExtension,
      status: 'done',
      url: baseImageURL + imageId + fileExtension,
    };
    setFileList([...fileList, image]);
    return true;
  };
  const onPreview = async (fileList: AnyObject) => {
    let src = envConfig.imageUrl + fileList.name;
    console.log('', src);
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileList.originFileObj);

        reader.onload = () => resolve(envConfig.imageUrl + reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    const datalist: UploadFile[] = [];
    newFileList.forEach((file) => {
      if (!file.response) {
        datalist.push(file);
      }
    });
    setFileList(datalist);
  };

  return { fileList, setFileList, imageCropFunction, onPreview, onChange };
};

export default useFileUpload;
