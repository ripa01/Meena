import { ReactNode, ElementType, JSX } from "react";

/**
 * Renders a container component that wraps its children with styling and an optional custom element type.
 * @component
 * @param {Object} props - The component props.
 * @param {ElementType} [props.as='div'] - The HTML element type to be used as the container. Defaults to 'div'.
 * @param {ReactNode} props.children - The content to be wrapped inside the container.
 * @param {string} [props.className] - Additional CSS classes to be applied to the container.
 * @param {any} [props.rest] - Any other props to be spread onto the container element.
 * @returns {JSX.Element} The rendered container component.
 */

interface ContainerProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  [key: string]: any; // Allows passing additional props
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
