import clsx from "clsx";
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";

export type InputProps = {
    id: string;
    name: string;
    type?: string;
    className?: string;
    isSelect?: boolean;
    labelText: string;
} & Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    ""
>;

export const InputField =
    forwardRef<HTMLInputElement, InputProps>(
        (
            {
                id,
                name,
                type,
                className = "",
                placeholder,
                labelText,
                ...props
            },
            ref,
        ) => {
            return (
                <>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
                        {labelText}
                    </label>
                    <input
                        id={id}
                        ref={ref}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        className={clsx(
                            `relative
                            shadow appearance-none border rounded w-full py-3 px-4
                            bg-white text-gray-700
                             focus:outline-sky-400`,
                            className,
                        )}
                        {...props}
                    />
                </>
            );
        },
    );

