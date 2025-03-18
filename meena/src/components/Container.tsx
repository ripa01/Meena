import { ReactNode, ElementType, JSX } from "react";

interface ContainerProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  [key: string]: any; 
}

export const Container = ({
  as: Element = "div",
  children,
  className = "",
  ...rest
}: ContainerProps): JSX.Element => {
  return (
    <Element {...rest} className={`px-5 w-full max-w-screen-md m-auto ${className}`}>
      {children}
    </Element>
  );
};

export default Container;
