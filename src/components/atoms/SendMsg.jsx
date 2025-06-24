// 'use client';
// import { useState } from 'react';

// export default function SendMsg() {
//   const [to, setTo] = useState('');
//   const [message, setMessage] = useState('');
//   const [status, setStatus] = useState(null);

//   async function sendWhatsAppMessage() {
//     const res = await fetch('/api/send-whatsapp', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ to, message }),
//     });

//     const data = await res.json();
//     setStatus(data.success ? 'Message sent!' : `Error: ${data.error}`);
//   }

//   return (
//     <main className="p-6 max-w-md mx-auto">
//       <h1 className="text-xl mb-4 font-bold">Send WhatsApp Message</h1>
//       <input
//         type="text"
//         placeholder="+201234567890"
//         className="border p-2 w-full mb-2"
//         value={to}
//         onChange={(e) => setTo(e.target.value)}
//       />
//       <textarea
//         placeholder="Your message..."
//         className="border p-2 w-full mb-2"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button
//         onClick={sendWhatsAppMessage}
//         className="bg-green-600 text-white px-4 py-2 rounded"
//       >
//         Send Message
//       </button>
//       {status && <p className="mt-2 text-sm">{status}</p>}
//     </main>
//   );
// }
