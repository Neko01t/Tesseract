export default function SocialLogin() {
  return (
    <div className="flex gap-4">
      <button className="flex-1 border border-gray-300 rounded-lg py-2 
                         flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100">
        <img src="/google.svg" className="h-5" />
        <span className="text-gray-700 text-sm">Google</span>
      </button>

      <button className="flex-1 border border-gray-300 rounded-lg py-2 
                         flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100">
        <img src="/facebook.svg" className="h-5" />
        <span className="text-gray-700 text-sm">Facebook</span>
      </button>
    </div>
  );
}
