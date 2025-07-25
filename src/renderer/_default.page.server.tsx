import React from 'react';
import { renderToString } from 'react-dom/server';

export { render };

function render(pageContext) {
  const { Page } = pageContext;
  const pageHtml = renderToString(<Page />);
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Premium Apartments at Godrej Properties Thanisandra Bangalore</title>
        <meta name="description" content="Godrej Properties Thanisandra presents luxurious residential apartments in Bangalore's growing corridor. Modern amenities, strategic location & trusted brand." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div id="root">${pageHtml}</div>
      </body>
    </html>`;
} 