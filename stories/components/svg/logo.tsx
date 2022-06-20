import React, { CSSProperties } from 'react';

interface Props {
  width?: number;
  height?: number;
  style?: CSSProperties
  fill?: string;
}

const Logo = ({ width = 48, height = 25, fill = '#211634', ...props }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.762 5.388V25H0V2.218C0 .392 2.07-.65 3.515.449L21.386 14.02c.552.418.875 1.073.875 1.769v9.208h-3.762V16.58L3.761 5.388zM44.12 25V5.387L28.925 16.58V25h-3.88v-9.208c0-.696.333-1.351.902-1.77L44.376.452C45.866-.65 48 .391 48 2.217V25h-3.88z"
        fill={fill}
      />
    </svg>
  );
};

export default Logo;