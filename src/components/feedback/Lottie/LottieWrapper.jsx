import React from "react";
import Lottie from "react-lottie";
 
const LottieWrapper = ({ MyLottieIcon, error }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: MyLottieIcon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={150} width={150} />;
};

export default LottieWrapper;
