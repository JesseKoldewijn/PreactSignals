import type { CSSProperties } from "preact/compat";
import { useEffect } from "preact/hooks";

type ImageAttributeEditorProps = {
  elementID: string;
  CssKey: keyof CSSProperties;
  CssValue: string;
};

const ImageAttributeEditor = ({
  elementID,
  CssKey,
  CssValue,
}: ImageAttributeEditorProps) => {
  useEffect(() => {
    const element = document.getElementById(elementID);
    if (element) {
      element.style.setProperty(String(CssKey), CssValue);
    }
  }, [elementID, CssKey, CssValue]);

  return null;
};

export default ImageAttributeEditor;
