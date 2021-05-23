# barcode generator

Provided an input from an OCR scan, displays barcodes of UPCs found in the scan data.

## Special Keys

- https://www.zebra.com/us/en/support-downloads/knowledge-articles/evm/Sample-Barcodes-for-VT-Host-to-send-Function-key.html
  F1: %AA
  F2: %AB
  F3: %AC
  ...
  F24: %AX

  Enter: %A0
  Clear: %A1
  Reset: %A2
  Roll Up / PA1: %A3
  Roll Down / PA2: %A4
  --- / PA3: %A5

## to do

- remove your sign in codes so Rayna can use app
<!-- - DONE - remove dashes that aren't in the front -->
- auto-confirm quantites over 100
- add bottle deposit mode
- add automatic fix for '1687...' (when 0 gets read as 1 and isn't removed), and a fix for '1###...' that shifts the numbers down to fix for generic case

- number of current barcode in sequence
  - (advanced) show crop of photo of scan so you can see the quantity, verify the accuracy, and don't need to keep track on the paper
  - (advanced) note where the system missed a barcode so you know you have to do it manually
  - (advanced) what text proceeded it in the case of milk invoices
  - (advanced) easy way to adjust barcode on the fly to correct single-digit errors

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
