import { Suspense } from "react";
import { Await, useLoaderData } from "react-router";

export async function loader() {
  const nonCriticalResource = new Promise((resolve) => {
    setTimeout(() => {
      resolve("Non Critical Resource");
    }, 5000);
  });

  const criticalResource = await new Promise((resolve) => {
    setTimeout(() => {
      resolve("Critical Resource");
    }, 1000);
  });

  return { criticalResource, nonCriticalResource };
}

export default function HtmlStreaming() {
  const { criticalResource, nonCriticalResource } =
    useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Html Streaming</h1>
      <p>{criticalResource}</p>
      <Suspense fallback={<p>Loading non critical resource...</p>}>
        <Await resolve={nonCriticalResource}>
          {(nonCriticalResource) => <p>{nonCriticalResource}</p>}
        </Await>
      </Suspense>
    </div>
  );
}
