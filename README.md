# ngx-quill-universal-example

The demo app for the usage of the [ngx-quill](https://github.com/KillerCodeMonkey/ngx-quill) module with ssr and angular universal.

## Donate/Support

If you like my work, feel free to support it. Donations to the project are always welcomed :)

PayPal: [PayPal.Me/bengtler](https://paypal.me/bengtler)

<a href="https://www.buymeacoffee.com/bengtler" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

BTC Wallet Address:
`3QVyr2tpRLBCw1kBQ59sTDraV6DTswq8Li`

ETH Wallet Address:
`0x394d44f3b6e3a4f7b4d44991e7654b0cab4af68f`

LTC Wallet Address:
`MFif769WSZ1g7ReAzzDE7TJVqtkFpmoTyT`

XRP Wallet Address:
`rXieaAC3nevTKgVu2SYoShjTCS2Tfczqx?dt=159046833`

## Clone, Install and Run

1. Clone the project then cd into project directory.
2. Install dependencies with `yarn install`.
3. Run the development server with `yarn dev:ssr`.

## View Examples

Navigate in your browser to http://localhost:4200 to view the example.

## The trick :)

QuillJS (1.x) is directly using the `document`, `window`, `Node` and `navigator` context of the browser, when you require or import it.
To get things working in ssr you need to mock them on server side.

Change your `main.server.ts` to something like

```TS
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Mock all used objects and functions used by Quill
global['window'] = {}
global['document'] = {
  createElement: () => ({
    classList: {
      toggle: () => {},
      contains: () => {}
    }
  }),
  addEventListener: () => {}
}
global['Node'] = {}
global['navigator'] = {}

export { AppServerModule } from './app/app.server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
```

The `quill-editor` and `quill-view` component of ngx-quill are doing the rest for you to check, if it is running on server- or browser side.
On server-side both components will not render or do anything, because they depend on QuillJS and so on the real browser environment.

If you want to render your html content of the editor for seo purposes check out the `quill-view-html` component, that simply renders the html content :).
