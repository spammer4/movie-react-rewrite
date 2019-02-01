import * as constants from "@app/constants";

export const updateBackground = (backgroundUrl: string) => {
  const imageUri = `${constants.BACKGROUND_URL_PREFIX}${backgroundUrl}`;
  console.log(imageUri);
  document.body.style.backgroundImage = `url("${imageUri}")`;
  /*
  const downloadingImage = new Image();
  downloadingImage.onload = function(this: any | ImageBitmap) {
    console.log(document.body.style);
    // console.log(new URL("/", imageUri).toString());
    document.body.style.backgroundImage = this.src;
    document.body.style.backgroundColor = "red";
  };
  downloadingImage.src = imageUri;*/
};

export const commaStringArray = (arr: string[]): string => {
  if (!arr || arr.length === 0) {
    return "";
  }
  return arr.join(", ");
};

export const currencyNumber = (
  amount: number,
  currencyPrefix = "$"
): string => {
  if (!amount) {
    return "-";
  }

  return `${currencyPrefix}${amount.toLocaleString()}`;
};
