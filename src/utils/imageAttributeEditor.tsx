import { memo, useEffect } from "react";

type ImageAttributeEditorProps = {
  elementID: string;
  CssKey: keyof React.CSSProperties;
  CssValue: string;
};

const ImageAttributeEditor = memo(
  ({ elementID, CssKey, CssValue }: ImageAttributeEditorProps) => {
    useEffect(() => {
      const element = document.getElementById(elementID);
      if (element) {
        element.style.setProperty(CssKey, CssValue);
      }
    }, [elementID, CssKey, CssValue]);

    return null;
  },
  (prevProps, nextProps) => {
    return (
      prevProps.elementID === nextProps.elementID &&
      prevProps.CssKey === nextProps.CssKey &&
      prevProps.CssValue === nextProps.CssValue
    );
  },
);

export default ImageAttributeEditor;
