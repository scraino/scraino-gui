const CODE = 'scratch-gui/blocks/CODE'
const CODE_TYPE = 'scratch-gui/blocks/CODE_TYPE'
const PORTS = 'scratch-gui/akari/port/PORTS'
const PORT = 'scratch-gui/akari/port/PORT'
const BOARDS = 'scratch-gui/akari/baord/BOARDS'
const BOARD = 'scratch-gui/akari/baord/BOARD'
const CODE_PANEL_OPEN = 'scratch-gui/akari/CODE_PANEL_OPEN'
const IS_ABOUT_MENU = 'scratch-gui/akari/IS_ABOUT_MENU'
const AUTHORIZED = 'scratch-gui/akari/AUTHORIZED'
const FILE_TITLE = 'scratch-gui/akari/file/FILE_TITLE'

const initialState = {
    code: '',
    codeType: 'arduino',
    ports: [],
    port: null,
    boards: ['Arduino Nano', 'Arduino Uno', 'ESP32'],
    board: 'Arduino Nano',
    codePanelOpen: false,
    isAboutMenu: false,
    authorized: false,
    fileTitle: '未命名.sb3'
}

document.title = `${initialState.fileTitle} - 未连接 - ${initialState.board}`

const reducer = function(state, action) {
    if (typeof state === 'undefined') state = initialState
    switch (action.type) {
        case CODE:
            return Object.assign({}, state, {
                code: action.data
            })
        case CODE_TYPE:
            return Object.assign({}, state, {
                codeType: action.data
            })
        case PORTS:
            return Object.assign({}, state, {
                ports: action.data
            })
        case PORT:
            document.title = `${state.fileTitle} - ${action.data ? action.data : '未连接'} - ${state.board}`
            return Object.assign({}, state, {
                port: action.data
            })
        case BOARDS:
            return Object.assign({}, state, {
                boards: action.data
            })
        case BOARD:
            document.title = `${state.fileTitle} - ${state.port ? state.port : '未连接'} - ${action.data}`
            return Object.assign({}, state, {
                board: action.data
            })
        case CODE_PANEL_OPEN:
            return Object.assign({}, state, {
                codePanelOpen: action.data
            })
        case IS_ABOUT_MENU:
            return Object.assign({}, state, {
                isAboutMenu: action.data
            })
        case AUTHORIZED:
            return Object.assign({}, state, {
                authorized: action.data
            })
        case FILE_TITLE:
            document.title = `${action.data} - ${state.port ? state.port : '未连接'} - ${state.board}`
            return Object.assign({}, state, {
                fileTitle: action.data
            })
        default:
            return state
    }
}

const setCode = data => ({ type: CODE, data })
const setCodeType = data => ({ type: CODE_TYPE, data })
const setPorts = data => ({ type: PORTS, data })
const setPort = data => ({ type: PORT, data })
const setBoards = data => ({ type: BOARDS, data })
const setBoard = data => ({ type: BOARD, data })
const setCodePanel = data => ({ type: CODE_PANEL_OPEN, data })
const setAboutMenu = data => ({ type: IS_ABOUT_MENU, data })
const setAuth = data => ({ type: AUTHORIZED, data })
const setFileTitle = data => ({ type: FILE_TITLE, data })

export {
    reducer as default,
    initialState as akariInitialState,
    setCode,
    setCodeType,
    setPorts,
    setPort,
    setBoards,
    setBoard,
    setCodePanel,
    setAboutMenu,
    setAuth,
    setFileTitle
}
