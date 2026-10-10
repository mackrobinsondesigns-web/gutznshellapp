import { ScrollViewStyleReset } from "expo-router/html";
import { type PropsWithChildren } from "react";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <ScrollViewStyleReset />

        {/* Global CSS fix to prevent canvas collapse */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          html, body, #root, #__next {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
        `,
          }}
        />

        {/* iOS mobile web app capability tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GutzNShell" />

        {/* Mobile Browser Address Bar and Splash Sync Color */}
        <meta name="theme-color" content="#000000" />

        {/* Advanced multi-size favicon tags */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        {/* Force linking directly to your custom manifest layout */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* Service Worker Registration Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((reg) => console.log('Service Worker registered successfully!', reg.scope))
                    .catch((err) => console.error('Service Worker registration failed:', err));
                });
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
