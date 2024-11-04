import { defineConfig } from 'checkly'

const config = defineConfig({
  projectName: 'otel-test-app',
  logicalId: 'otel-test-app-1',
  repoUrl: 'https://github.com/MariadeAnton/checkly-otel-test-app',
  checks: {
    frequency: 10,
    locations: ['us-east-1', 'eu-west-1'],
    tags: ['otel'],
    runtimeId: '2024.02',
    checkMatch: '**/__checks__/**/*.check.ts',
    playwrightConfig: {},
    browserChecks: {
      testMatch: '**/__checks__/**/*.spec.ts',
    },
  },
  cli: {
    runLocation: 'eu-west-1',
    reporters: ['list'],
  },
})

export default config
