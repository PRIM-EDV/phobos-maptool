export default () => ({
    phobosAuthUrl: process.env.PHOBOS_AUTH_URL ? process.env.PHOBOS_AUTH_URL : 'http://localhost:3000',
    port: process.env.PHOBOS_MAPTOOL_PORT ?? 3002
});