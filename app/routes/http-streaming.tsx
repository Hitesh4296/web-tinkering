import { useCallback, useEffect, useRef, useState } from "react";
import useAnimatedText from "~/hooks/useAnimatedText";

export default function HttpStreaming() {
  const eventSourceRef = useRef<EventSource | null>(null);
  const [text, setText] = useState("");

  const animatedText = useAnimatedText(text);

  useEffect(() => {
    let text;

    if (eventSourceRef.current) {
      return;
    }
    // Create EventSource for SSE endpoint
    eventSourceRef.current = new EventSource("http://localhost:8000/sr");

    eventSourceRef.current.onopen = () => {
      console.log("EventSource connected");
      //Everytime the connection gets extablished clearing the previous data from UI
      console.log("open");
    };

    //eventSource can have event listeners based on the type of event.
    //Bydefault for message type of event it have the onmessage method which can be used directly or this same can be achieved through explicit eventlisteners
    eventSourceRef.current.addEventListener("message", function (event) {
      text = JSON.parse(event.data);
      appendText(text);
    });

    eventSourceRef.current.addEventListener("terminate", function (event) {
      console.log("terminate", event);
      eventSourceRef.current?.close();
      eventSourceRef.current = null;
    });

    //In case of any error, if eventSource is not closed explicitely then client will retry the connection a new call to backend will happen and the cycle will go on.
    eventSourceRef.current.onerror = (error) => {
      console.error("EventSource failed", error);
      eventSourceRef.current?.close();
      eventSourceRef.current = null;
    };

    // Function to update and display coordinates
    function appendText(text: any) {
      // Create a new paragraph text for each coordinate and append it
      console.log(text);
      setText((prevText) => prevText + " " + text);
    }
  }, []);

  const Text = ({ text }: { text: string }) => {
    console.log("rerender", text);
    return <div key="here">{text}</div>;
  };

  return (
    <div>
      Http Streaming
      <Text text={animatedText} />
    </div>
  );
}
