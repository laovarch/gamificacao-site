/// <reference types="react-scripts" />

declare namespace React {
  interface FC<P = {}> {
    (props: P & { children?: ReactNode }): ReactElement | null;
  }
  
  interface ReactElement {
    type: any;
    props: any;
    key: string | number | null;
  }
  
  interface ReactNode {
    [key: string]: any;
  }
  
  function useState<T>(initialState: T | (() => T)): [T, (value: T | ((prev: T) => T)) => void];
  function useEffect(effect: () => void | (() => void), deps?: any[]): void;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
