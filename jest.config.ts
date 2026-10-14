import type { Config } from 'jest';


const esModules = [
    'squares-rng',
    // 'flo-bezier3', 'flo-graham-scan',
    // 'flo-poly', 'flo-gauss-quadrature',
    // 'flo-vector2d', 'big-float-ts', 'double-double',
    // 'flo-boolean'
].join('|');


const config: Config = {
    transformIgnorePatterns: [
        `/node_modules/(?!${esModules})`
    ],
    testEnvironment: 'node',
    resolver: "jest-ts-webcompat-resolver",
    testMatch: [ "**/__tests__/**/*.spec.ts"],
    // collectCoverage: true,
    collectCoverage: false,
    // v8 coverage works with any transformer (babel instrumentation does not
    // apply to files transformed by @swc/jest); use `npm run coverage`
    coverageProvider: 'v8',
    collectCoverageFrom: ['src/**/*.ts'],
    testTimeout: 15000,
    // Transpile .ts (and ESM-only .js deps such as squares-rng that are
    // allow-listed above) with swc.
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest', { jsc: { target: 'es2022' } }],
    },
};


export default config;
