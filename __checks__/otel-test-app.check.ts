import {BrowserCheck, RetryStrategyBuilder} from 'checkly/constructs'

new BrowserCheck('otel-test-app-check-1',{
  name: 'Otel Test App Check',
  frequency: 30,
  tags: ['otel'],
  code: {
    entrypoint: './otel-test-app.spec.ts'
  },
  retryStrategy: RetryStrategyBuilder.noRetries(),
  alertChannels: [] // empty on purpose, we don't need alerts for this test app
})
