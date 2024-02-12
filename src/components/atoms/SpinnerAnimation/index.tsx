import clsx from "clsx";

type Props = {
  classNameSpinner?: string;
  classNameString?: string;
  titleLoading: string;
}

const SpinnerAnimation = ({classNameSpinner, classNameString, titleLoading}: Props) => {
  return (
    <>
      <div className={clsx(classNameSpinner, "border-gray-300 animate-spin self-center rounded-full border-4 ")} />
      <span className={clsx(classNameString, "ml-2 font-normal ")}>
        {titleLoading}
      </span>
    </>
  )
}

export default SpinnerAnimation
