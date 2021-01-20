import React from 'react';
import Svg, {Path} from 'react-native-svg';

const LogoutIcon = () => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M14.08 15.59L16.67 13H7v-2h9.67l-2.59-2.59L15.5 7l5 5-5 5-1.42-1.41zM19 3a2 2 0 012 2v4.67l-2-2V5H5v14h14v-2.67l2-2V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5c0-1.11.89-2 2-2h14z"
        fill="#001CD6"
      />
    </Svg>
  );
};

export default LogoutIcon;
