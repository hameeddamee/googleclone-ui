import React from "react";

import shortSleeve from "../../../shared/assets/img/variants/Fitted-ShortSleeve.png";
import longSleeve from "../../../shared/assets/img/variants/Fitted-LongSleeve.png";

import cufflink from "../../../shared/assets/img/variants/Fitted-Cufflinks.png";
import button from "../../../shared/assets/img/variants/Fitted-Button.png";

import NoBreastPocket from "../../../shared/assets/img/variants/Breastpocket-None2.png";
import LeftBreastPocket from "../../../shared/assets/img/variants/Breastpocket-Left2.png";
import RightBreastPocket from "../../../shared/assets/img/variants/Breastpocket-Right2.png";
import BothBreastPocket from "../../../shared/assets/img/variants/Breastpocket-Left-Right.png";

import DrawstringTrouser from "../../../shared/assets/img/variants/Trousers-Drawstring.png";
import WesternTrouser from "../../../shared/assets/img/variants/Trousers-Western.png";
import BothTrouser from "../../../shared/assets/img/variants/Trousers-Both.png";

const selectImage = (type) => {
  switch (type) {
    case "Short Sleeve":
      return shortSleeve;
    case "Long Sleeve":
      return longSleeve;
    case "Drawstring":
      return DrawstringTrouser;
    case "Western":
      return WesternTrouser;
    case "Drawstring + Western":
      return BothTrouser;
    case "Left Breast":
      return LeftBreastPocket;
    case "Right Breast":
      return RightBreastPocket;
    case "No Breast":
      return NoBreastPocket;
    case "Both Breast":
      return BothBreastPocket;
    default:
      break;
  }
};

const VariantImage = ({ imgType }) => {
  const img = selectImage(imgType);

  return <img src={img} width="100%" />;
};

export default VariantImage;
