import AppManifestWebpackPlugin from './index'

const LOGO_PATH = path.resolve(__dirname, 'fixtures/logo.png')

function baseWebpackConfig(plugin, testName) {
    return {
        devtool: 'eval',
        entry: path.resolve(__dirname, 'fixtures/entry.js'),
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, '../dist', `${testName}`),
        },
        plugins: [].concat(plugin),
    }
}

describe('app-manifest-webpack-plugin', () => {
    it('should throw error when called without arguments', () => {
        return new AppManifestWebpackPlugin()
            .then((plugin) => {
                expect(plugin).toThrow(Error);
                expect(plugin).toBeUndefined();
            });
    })

    it('should take a string as argument', () => {
        return new AppManifestWebpackPlugin(LOGO_PATH)
            .then((plugin) => {
                expect(plugin).not.toBeUndefined()
                expect(plugin.options.logo).toEqual('CAT')
            });
    })

    it('should take an object with just the logo as argument', () => {
        return new AppManifestWebpackPlugin({ logo: LOGO_PATH })
            .then((plugin) => {
                expect(plugin).not.toBeUndefined()
                expect(plugin.options.logo).toEqual('CAT')
            });
    })
})