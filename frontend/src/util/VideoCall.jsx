import { useEffect, useRef, useState } from "react";
import axios from "axios";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  SpeakerLayout,
  CallControls,
} from "@stream-io/video-react-sdk";

const BASE_URL = "http://localhost:3000/api";

export default function VideoCall({ callId }) {
  const clientRef = useRef(null);
  const callRef = useRef(null);
  const initializedRef = useRef(false);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Prevent double init (React StrictMode safe)
    if (initializedRef.current) return;
    initializedRef.current = true;

    const init = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/chat/token`,
          { withCredentials: true }
        );

        const { token, userId } = res.data;
        const apiKey = import.meta.env.VITE_STREAM_API_KEY;

        const client = StreamVideoClient.getOrCreateInstance({
          apiKey,
          user: { id: userId },
          token,
        });

        const call = client.call("default", callId);
        await call.join({ create: true });

        clientRef.current = client;
        callRef.current = call;

        setReady(true);
      } catch (err) {
        console.error("Stream init error:", err);
      }
    };

    init();

    return () => {
      callRef.current?.leave();
    };
  }, [callId]);

  if (!ready || !callRef.current) {
    return (
      <div className="h-full flex items-center justify-center">
        Connecting…
      </div>
    );
  }

  return (
    <StreamVideo client={clientRef.current}>
      <StreamCall call={callRef.current}>
        <SpeakerLayout />
        <CallControls />
      </StreamCall>
    </StreamVideo>
  );
}





// import { useEffect, useState } from "react";
// import axios from "axios";

// import {
//   StreamVideo,
//   StreamVideoClient,
//   SpeakerLayout,
//   CallControls,
//   Call,
// } from "@stream-io/video-react-sdk";

// const BASE_URL = "http://localhost:3000/api";

// export default function VideoCall({ callId }) {
//   const [client, setClient] = useState(null);
//   const [call, setCall] = useState(null);

//   useEffect(() => {
//     let activeCall;

//     const initVideo = async () => {
//       try {
//         // 1️⃣ Fetch token
//         const res = await axios.get(
//           `${BASE_URL}/chat/token`,
//           { withCredentials: true }
//         );

//         const { token, userId } = res.data;
//         const apiKey = import.meta.env.VITE_STREAM_API_KEY;

//         // 2️⃣ Use singleton client (VERY IMPORTANT)
//         const streamClient =
//           StreamVideoClient.getOrCreateInstance({
//             apiKey,
//             user: { id: userId },
//             token,
//           });

//         // 3️⃣ Create / join call
//         activeCall = streamClient.call("default", callId);
//         await activeCall.join({ create: true });

//         setClient(streamClient);
//         setCall(activeCall);
//       } catch (err) {
//         console.error("Stream init error:", err);
//       }
//     };

//     initVideo();

//     return () => {
//       activeCall?.leave();
//     };
//   }, [callId]);

//   if (!client || !call) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         Connecting…
//       </div>
//     );
//   }

//   return (
//     <StreamVideo client={client}>
//       <Call call={call}>
//         <SpeakerLayout />
//         <CallControls />
//       </Call>
//     </StreamVideo>
//   );
// }
