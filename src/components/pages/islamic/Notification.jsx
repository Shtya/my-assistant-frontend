export default function Notification({ content, onClose }) {
  if (!content) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-2 text-green-800">{content.title}</h3>
        <p className="text-2xl mb-4 text-right font-arabic">{content.message}</p>
        <p className="mb-2">{content.translation}</p>
        {content.reference && (
          <p className="text-sm text-gray-600 mb-4">الفضل: {content.reference}</p>
        )}
        <button
          onClick={onClose}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
        >
          تم
        </button>
      </div>
    </div>
  );
}