import clsx from "clsx";
import { forwardRef, TextareaHTMLAttributes, useEffect, useRef } from "react";

export type TextareaProps = {
  id: string;
  name: string;
  className?: string;
  rows?: number;
  isFocused?: boolean;
} & Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "id" | "name" | "className"
>;

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, name, className = "", rows, isFocused, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if(isFocused) textareaRef.current?.focus();
      const resizeTextarea = () => {
        if (textareaRef.current && !rows) {
          if(isFocused) textareaRef.current.style.height = "10px";
          if(!isFocused) textareaRef.current.style.height = "40px";
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
      };

      resizeTextarea();

      if (textareaRef.current && !rows) {
        textareaRef.current.addEventListener("input", resizeTextarea);
      }

      return () => {
        if (textareaRef.current && !rows) {
          textareaRef.current.removeEventListener("input", resizeTextarea);
        }
      };
    }, [rows]);

    return (
      <textarea
        id={id}
        ref={(node) => {
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          // textareaRef.current = node; // Remove this line
        }}
        name={name}
        className={clsx(
          `text-textLight relative h-input
          w-full
          rounded-lg border-0 p-input
          bg-white text-black
          focus:rounded focus:outline-sky-500`,
          className,
        )}
        {...props}
      />
    );
  }
);

export default TextAreaField;
