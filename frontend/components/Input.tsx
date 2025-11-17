export default function Input({ label, className = "", ...props }: any) {
  return (
    <div className={`mt-3 ${className}`}>
      <label className="text-sm text-gray-700 font-medium">{label}</label>
      <input
        {...props}
        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg 
                   focus:ring-2 focus:ring-blue-400 focus:border-blue-500 
                   text-gray-800 placeholder-gray-400 outline-none"
      />
    </div>
  );
}
