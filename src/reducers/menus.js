const OPEN_MENU = 'scratch-gui/menus/OPEN_MENU';
const CLOSE_MENU = 'scratch-gui/menus/CLOSE_MENU';

const MENU_FILE = 'fileMenu';
const MENU_EDIT = 'editMenu';
const MENU_LANGUAGE = 'languageMenu';
const MENU_PORT = 'portMenu';
const MENU_BOARD = 'boardMenu';
const MENU_HELP = 'helpMenu';
const MENU_PROFILE = 'profileMenu';

const initialState = {
    [MENU_FILE]: false,
    [MENU_EDIT]: false,
    [MENU_LANGUAGE]: false,
    [MENU_PORT]: false,
    [MENU_BOARD]: false,
    [MENU_HELP]: false,
    [MENU_PROFILE]: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case OPEN_MENU:
        return Object.assign({}, state, {
            [action.menu]: true
        });
    case CLOSE_MENU:
        return Object.assign({}, state, {
            [action.menu]: false
        });
    default:
        return state;
    }
};
const openMenu = menu => ({
    type: OPEN_MENU,
    menu: menu
});
const closeMenu = menu => ({
    type: CLOSE_MENU,
    menu: menu
});
const openFileMenu = () => openMenu(MENU_FILE);
const closeFileMenu = () => closeMenu(MENU_FILE);
const fileMenuOpen = state => state.scratchGui.menus[MENU_FILE];
const openEditMenu = () => openMenu(MENU_EDIT);
const closeEditMenu = () => closeMenu(MENU_EDIT);
const editMenuOpen = state => state.scratchGui.menus[MENU_EDIT];
const openLanguageMenu = () => openMenu(MENU_LANGUAGE);
const closeLanguageMenu = () => closeMenu(MENU_LANGUAGE);
const languageMenuOpen = state => state.scratchGui.menus[MENU_LANGUAGE];
const openPortMenu = () => openMenu(MENU_PORT);
const closePortMenu = () => closeMenu(MENU_PORT);
const portMenuOpen = state => state.scratchGui.menus[MENU_PORT];
const openBoardMenu = () => openMenu(MENU_BOARD);
const closeBoardMenu = () => closeMenu(MENU_BOARD);
const boardMenuOpen = state => state.scratchGui.menus[MENU_BOARD];
const openHelpMenu = () => openMenu(MENU_HELP);
const closeHelpMenu = () => closeMenu(MENU_HELP);
const helpMenuOpen = state => state.scratchGui.menus[MENU_HELP];
const openProfileMenu = () => openMenu(MENU_PROFILE);
const closeProfileMenu = () => closeMenu(MENU_PROFILE);
const profileMenuOpen = state => state.scratchGui.menus[MENU_PROFILE];

export {
    reducer as default,
    initialState as menuInitialState,
    openFileMenu,
    closeFileMenu,
    openEditMenu,
    closeEditMenu,
    openLanguageMenu,
    closeLanguageMenu,
    fileMenuOpen,
    editMenuOpen,
    languageMenuOpen,
    openPortMenu,
    closePortMenu,
    portMenuOpen,
    openBoardMenu,
    closeBoardMenu,
    boardMenuOpen,
    openHelpMenu,
    closeHelpMenu,
    helpMenuOpen,
    openProfileMenu,
    closeProfileMenu,
    profileMenuOpen
};
