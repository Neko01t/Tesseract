const Button = ({ text, onClick, type, disabled, className = "" }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white transition duration-200 ease-in-out ${className}
      ${disabled
        ? 'bg-indigo-300 cursor-not-allowed'
        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 active:bg-indigo-800'
      }`}
  >
    {text}
  </button>
);
// export default function Button({ text, className = "", ...props }: any) {
//   return (
//     <button
//       {...props}
//       className={`w-full bg-blue-600 hover:bg-blue-700 text-white
//                  py-2 rounded-lg font-medium shadow-sm transition ${className}`}
//     >
//       {text}
//     </button>
//   );
// }
export default Button;
