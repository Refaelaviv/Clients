```javascript
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>טופס לקוחות</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```
