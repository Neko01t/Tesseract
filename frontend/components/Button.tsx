export default function Button({ text, className = "", ...props }: any) {
  return (
    <button
      {...props}
      className={`w-full bg-blue-600 hover:bg-blue-700 text-white 
                 py-2 rounded-lg font-medium shadow-sm transition ${className}`}
    >
      {text}
    </button>
  );
}

