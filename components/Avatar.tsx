import React, { FC, SyntheticEvent  } from 'react';
import { AvatarProps } from '../types';

const Avatar: FC<AvatarProps> = ({ img, diameter }) => {
  const addDefaultSrc = (e: SyntheticEvent<HTMLImageElement>) => {
    console.log("addDefaultSrc called");
    e.currentTarget.src = defaultImg;
  };
  {
    if (img == "") img = defaultImg;
  }

  const style = {...avatar, width: diameter, height: diameter};

  return (
    <div>
      <img src={img} style={style} onError={addDefaultSrc} />
    </div>
  );
}

const defaultImg = "/default-avatar.jpg";

Avatar.defaultProps = {
  img: defaultImg,
  diameter: "50px",
};

const avatar = {
  verticalAlign: "middle",
  borderRadius: "50%",
};

export default Avatar;