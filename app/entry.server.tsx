import 'dotenv/config';
import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import type { EntryContext } from 'remix';
import { RemixServer } from 'remix';
import isbot from "isbot";


const ABORT_DELAY = 5000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const callbackName = isbot(request.headers.get("user-agent"))
  ? "onAllReady"
  : "onShellReady";

  return new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        [callbackName]() {
          let body = new PassThrough();

          responseHeaders.set("Content-Type", "text/html");
          responseHeaders.set("Transfer-Encoding", "chunked");
          responseHeaders.set("Connection", "keep-alive");

          resolve(
            new Response(body as any, {
              status: didError ? 500 : responseStatusCode,
              headers: responseHeaders,
            })
          );
          pipe(body);
        },
        onShellError(err) {
          reject(err);
        },
        onError(error) {
          didError = true;
          console.error(error);
        },
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });


  // let markup = renderToPipeableStream(
  //   <RemixServer context={remixContext} url={request.url} />
  // );

  // responseHeaders.set('Content-Type', 'text/html');

  // return new Response('<!DOCTYPE html>' + markup, {
  //   status: responseStatusCode,
  //   headers: responseHeaders,
  // });
}
