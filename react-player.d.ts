declare module "react-player" {
  import * as React from "react";

  export interface ReactPlayerProps {
    url: string;
    playing?: boolean;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    width?: string | number;
    height?: string | number;
    style?: React.CSSProperties;
  }

  export default class ReactPlayer extends React.Component<ReactPlayerProps> {}
}
