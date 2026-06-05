
export default function(wallaby) {
    return {
        env: {
            type: 'node',
            params: {
                runner: '--experimental-vm-modules node_modules/jest/bin/jest.js'
            }
        },
        testFramework: 'jest',
        files: [
            'package.json',
            'src/**/*.ts',
        ],
        tests: [
            '__tests__/**/*.spec.ts',
            '__tests__/**/*.ts'
        ],

        compilers: {
            "**/*.+(t|j)s?(x)": wallaby.compilers.typeScript({
                outDir: './any'
            }),
        },


        maxLogEntrySize: 32*32768,
        maxConsoleMessagesPerTest: 32*1000,
        logLimits: {
            inline: {
              // The depth to log for values displayed inline beside your code
              depth: 32*15,
      
              // The maximum number of elements to log for values displayed 
              // inline beside your code
              elements: 32*5000,
            },
            values: {
                default: {
                    // The string length at which strings are truncated within
                    // value explorer and log messages
                    stringLength: 32*8192,
                },
                autoExpand: {
                    // The string length at which strings are truncated when
                    // using the auto-expand feature
                    stringLength: 32*8192,
            
                    // The maximum number of elements to log for values displayed
                    // using the auto-expand feature
                    elements: 32*5000,
            
                    // The maximum depth to log for values displayed using the
                    // auto-expand feature
                    depth: 32*10,
                }
            }
        }
    }
}
