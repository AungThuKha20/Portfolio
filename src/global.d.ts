import React from "react";

declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      src?: string;
      alt?: string;
      "auto-rotate"?: boolean | string;
      "camera-controls"?: boolean | string;
      ar?: boolean | string;
      style?: React.CSSProperties;
    };
  }
}
