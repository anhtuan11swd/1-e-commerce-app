const Title = ({ text1, text2 }) => {
  return (
    <div className="mb-8 flex flex-col items-center gap-2 text-center">
      <div className="flex items-center gap-2">
        <p className="text-gray-500 text-sm">{text1}</p>
        <p className="font-medium text-gray-700 text-sm">{text2}</p>
      </div>
      <div className="h-[1px] w-16 bg-gray-400" />
    </div>
  );
};

export default Title;
