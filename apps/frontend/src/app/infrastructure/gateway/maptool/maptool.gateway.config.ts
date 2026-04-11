const MAPTOOL_SERVER_HOSTNAME = window?.__env?.MAPTOOL_SERVER_HOSTNAME || window.location.hostname;
const MAPTOOL_SERVER_PORT = window?.__env?.MAPTOOL_SERVER_PORT || 3002;

const WS_PROTOCOL = window.location.protocol === 'https:' ? 'wss' : 'ws';
const WS_URL = `${WS_PROTOCOL}://${MAPTOOL_SERVER_HOSTNAME}:${MAPTOOL_SERVER_PORT}`;

export const MaptoolGatewayConfig = {
    defaultApiUrl: WS_URL
};