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
    // coverageProvider: 'v8',
    testTimeout: 15000,
    // Transpile .ts (and ESM-only .js deps such as squares-rng that are
    // allow-listed above) with swc.
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest', { jsc: { target: 'es2022' } }],
    },
};


export default config;
