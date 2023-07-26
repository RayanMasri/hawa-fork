import React from "react"
import { storiesOf } from "@storybook/react"
import "../stories-styles.css"

const UsagePage = () => {
  const codeSnippet = `
:root {
    /* Primary Layout Colors */
    --layout-primary-700: #b7aff7;
    --layout-primary-500: #dfdcfc;
    --layout-primary-300: #e7e5fa;

    /* Secondary Layout Colors */
    --layout-secondary: #d2cdfa;

    /* Primary Button Colors */
    --button-primary-300: #6555e3;
    --button-primary-500: #4c37eb;
    --button-primary-700: #2e1dac;

    /* Secondary Button Colors */
    --button-secondary-500: #ffc011;
    --button-secondary-700: #b48d24;

    /* Global Border Radius */
    --border-radius: 10px;
}`
  return (
    <div>
      <h1>Usage</h1>
      <div className="tip-wrapper">
        <span className="tip">Notice</span>This page is still in progress.
      </div>
      If you want to customize the entirety of Hawa UI kit with a few lines of
      code, you can do so by changing the colors, and the border radius. In
      order to customize Hawa, you can do so using one of the following methods:
      <br />
      Method 1:
      <br />
      Overwrite the `root:` global variables in your project css file. The
      variables are as follows:
      {/* <pre className="rounded bg-gray-200 p-6 text-xs"> */}
      <pre className="my-4 items-center space-x-4 rounded-lg bg-gray-800 p-4 pl-6 text-left text-sm text-white sm:text-base">
        <code>{codeSnippet}</code>
      </pre>{" "}
      <br />
      <div>
        <h4>Method 2:</h4>
        <br />
        <p>
          Copy the content of Hawa
          <a
            className="mx-1 text-blue-600"
            href="https://github.com/sikka-software/Hawa/blob/main/tailwind.config.js"
          >
            tailwind.config.js
          </a>
          and use it in your project tailwind configuration file. And you can
          replace the global variables with your own static values. Or simply
          using the first method
        </p>
      </div>
      <br />
      <span>
        mention intelisence and ctrl + space to bring up the available props
        like this https://tailwindcss.com/docs/editor-setup
      </span>
    </div>
  )
}

storiesOf("Getting Started / Usage", module)
  .addParameters({
    docs: {
      page: () => <UsagePage />,
    },
    docsOnly: true,
  })
  .add("Getting Started / Usage", () => <UsagePage />)
