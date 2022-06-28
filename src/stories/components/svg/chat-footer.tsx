import * as React from 'react';

interface Props {
    width?: number;
    height?: number;
    fill?: string;
}
const ChatFooter = ({ height = 17, width = 21, fill = '#333', ...props }: Props) => {
  return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 21 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.616 14.947c1.27-.92 2.081-2.281 2.081-3.795 0-2.771-2.697-5.018-6.023-5.018-3.327 0-6.024 2.247-6.024 5.018 0 2.773 2.697 5.02 6.024 5.02a7.11 7.11 0 001.966-.275l.177-.027c.116 0 .22.036.32.093l1.319.761.116.038a.2.2 0 00.2-.201l-.032-.147-.272-1.012-.02-.128a.4.4 0 01.168-.327zM7.928.592C3.936.592.699 3.288.699 6.615c0 1.815.973 3.45 2.497 4.553a.48.48 0 01.203.393l-.025.153-.326 1.215-.039.176c0 .133.108.241.24.241l.14-.045 1.583-.914a.757.757 0 01.383-.11l.213.031c.738.213 1.535.33 2.36.33l.396-.01a4.655 4.655 0 01-.242-1.475c0-3.034 2.951-5.493 6.592-5.493l.392.01C14.522 2.792 11.533.592 7.928.592zm4.737 9.758a.803.803 0 11.002-1.606.803.803 0 01-.002 1.606zm4.017 0a.803.803 0 110-1.606.803.803 0 010 1.606zM5.518 5.651a.963.963 0 110-1.926.963.963 0 010 1.926zm4.819 0a.963.963 0 110-1.926.963.963 0 010 1.926z"
                fill={fill}
            />
        </svg>
  );
};

export default ChatFooter;