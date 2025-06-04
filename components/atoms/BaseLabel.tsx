interface Props {
  text: string;
}

export const BaseLabel = ({ text }: Props) => {
  return (
    <span className="inline-block bg-black text-white text-sm px-2 py-0.5 rounded-md">{text}</span>
  );
};