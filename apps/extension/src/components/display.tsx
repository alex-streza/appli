interface DisplayProps {
  value: string;
}

export const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div className="text-right text-4xl p-2 pr-3 text-white w-full bg-transparant rounded-md">
      {value}
    </div>
  );
};
