# OpenTelemetry Test App. 🖤

This is a small Next.js app used for testing and demoing the Checkly OpenTelemetry integration. It randomly throws errors, 
so we can get some traces quickly. Have a look at the `app/page.tsx` file to see how it does this.
This demo repo already comes with the necessary instrumentation code. You can find it in `instrumentation.ts`.

## Deploying and Sending traces

1. Deploy this app to a personal / Hobby Vercel by clicking the button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcheckly%2Fcheckly-otel-test-app)

2. Enable OTel and create an OTel API key in the Checkly app [as per our own docs](https://www.checklyhq.com/docs/open-telemetry/instrumenting-code/nextjs/#step-3-start-your-app-with-the-instrumentation).

3. Add the following environment variables to your Vercel project settings. also as per the docs.

    - `OTEL_EXPORTER_OTLP_HEADERS="authorization=<otel-api-key>"`
    - `OTEL_EXPORTER_OTLP_ENDPOINT=https://otel.eu-west-1.checklyhq.com`

    You might need to redeploy your Vercel deployment after adding these environment variables.

4. Create a check targeting the Vercel deployment URL. A check is provided in the `__checks__` folder, just tweak the URL:

    ```ts
    import { test, expect } from '@playwright/test'
      test('Custom Browser Check', async ({ page }) => {
      const response = await page.goto('MY_VERCEL_DEPLOYMENT_URL') // <- Change this
      expect(response?.status()).toBeLessThan(400)
    })
   ```
   Run the regular `npx checkly test` and `npx checkly deploy` to create and deploy the check.

5. Now, with each check run, you should see traces in your Checkly account as part of the check result. This works for
test sessions, monitoring checks and adhoc results in the editor.


## Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
