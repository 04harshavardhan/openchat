import React from "react";

const Vector = () => {
  return (
    <svg
      viewBox="0 0 480 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <path
        d="M394.216 141.17C411.218 141.17 425 154.952 425 171.954V339.618C425 356.62 411.218 370.402 394.216 370.402H241.194L176.643 409.188C174.56 410.44 171.916 408.898 171.98 406.469L172.924 370.402H172.844V171.953C172.844 154.952 186.626 141.17 203.628 141.17H394.216Z"
        fill="#89DDFF"
      />
      <path
        d="M55 101.151C55 84.1492 68.7824 70.3668 85.7839 70.3668H276.372C293.374 70.3668 307.156 84.1492 307.156 101.151V268.815C307.156 285.817 293.374 299.599 276.372 299.599H85.7838C68.7824 299.599 55 285.817 55 268.815V101.151Z"
        fill="#82AAFF"
      />
    </svg>
  );
};

export const LogoLarge = () => {
  const style = {
    width: "100%",
    height: "100%",
    maxWidth: "360px",
    maxHeight: "360px",
  };

  return (
    <div style={style}>
      <Vector />
    </div>
  );
};

export const LogoSmall = () => {
  const style = {
    width: "100%",
    height: "100%",
    maxWidth: "36px",
    maxHeight: "36px",
  };

  return (
    <div style={style}>
      <Vector />
    </div>
  );
};
