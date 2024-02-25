import React from 'react';
import './ImagesContainer.scss';
import { MdDelete } from 'react-icons/md';
import { IImageObj } from '../../common/AddTweetForm/AddTweetForm';

interface IImageContainerProps {
  imagesPreview?: IImageObj[];
  pictures?: string[];
  removeImage?: (url: string) => void;
}

const ImagesContainer: React.FC<IImageContainerProps> = ({
  imagesPreview,
  pictures,
  removeImage
}: IImageContainerProps) => {
  const imagesStyle = {
    maxWidth: '245px',
    height: '280px',
  };

  if (imagesPreview?.length === 1 || pictures?.length === 1) {
    imagesStyle.maxWidth = '500px';
    imagesStyle.height = '280px';
  }

  return (
    <div className="images-container">
      {imagesPreview && imagesPreview.map((item, index) => (
        <div key={index} className="images-container__item" style={imagesStyle}>
          {<img src={item.blobUrl} alt="Header background" />}
          {removeImage && <MdDelete className="images-container__remove" onClick={() => removeImage(item.blobUrl)} />}
        </div>
      ))}

      {pictures && pictures.map((item, index) => (
        <div key={index} className="images-container__item" style={imagesStyle}>
          {<img src={item} alt="Header background" />}
        </div>
      ))}
    </div>
  );
};

export default ImagesContainer;
