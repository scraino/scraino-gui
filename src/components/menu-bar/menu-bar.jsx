import classNames from 'classnames';
import {connect} from 'react-redux';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import {ComingSoonTooltip} from '../coming-soon/coming-soon.jsx';
import Menu from '../../containers/menu.jsx';
import {MenuItem, MenuSection} from '../menu/menu.jsx';
import MenuLogo from '../akari/menu-logo.jsx';
import MenuFile from '../akari/menu-file.jsx';
import ItemInstall from '../akari/item-install.jsx';
import MenuPort from '../akari/menu-port.jsx';
import ItemPort from '../akari/item-port.jsx';
import MenuBoard from '../akari/menu-board.jsx';
import ItemBoard from '../akari/item-board.jsx';
import MenuHelp from '../akari/menu-help.jsx';
import MenuStageCode from '../akari/menu-stage-code.jsx';
import MenuProfile from '../akari/menu-profile.jsx';

import {openTipsLibrary} from '../../reducers/modals';
import {setPlayer} from '../../reducers/mode';
import {
    openFileMenu,
    closeFileMenu,
    fileMenuOpen,
    openEditMenu,
    closeEditMenu,
    editMenuOpen,
    openLanguageMenu,
    closeLanguageMenu,
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
} from '../../reducers/menus';

import styles from './menu-bar.css';

const MenuBarItemTooltip = ({
    children,
    className,
    enable,
    id,
    place = 'bottom'
}) => {
    if (enable) {
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
    return (
        <ComingSoonTooltip
            className={classNames(styles.comingSoon, className)}
            place={place}
            tooltipClassName={styles.comingSoonTooltip}
            tooltipId={id}
        >
            {children}
        </ComingSoonTooltip>
    );
};


MenuBarItemTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    enable: PropTypes.bool,
    id: PropTypes.string,
    place: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
};

const MenuItemTooltip = ({id, children, className}) => (
    <ComingSoonTooltip
        className={classNames(styles.comingSoon, className)}
        place="right"
        tooltipClassName={styles.comingSoonTooltip}
        tooltipId={id}
    >
        {children}
    </ComingSoonTooltip>
);

MenuItemTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string
};

const MenuBarMenu = ({
    children,
    onRequestClose,
    open,
    place = 'right'
}) => (
    <Menu
        className={styles.menu}
        open={open}
        place={place}
        onRequestClose={onRequestClose}
    >
        {children}
    </Menu>
);

MenuBarMenu.propTypes = {
    children: PropTypes.node,
    onRequestClose: PropTypes.func,
    open: PropTypes.bool,
    place: PropTypes.oneOf(['left', 'right'])
};

const MenuBar = props => (
    <Box className={styles.menuBar}>
        <div className={styles.mainMenu}>
            <div className={styles.fileGroup}>
                <div className={classNames(styles.menuBarItem)}>
                    <MenuLogo />
                </div>
                <MenuFile
                    className={classNames(styles.menuBarItem, styles.hoverable, {
                        [styles.active]: props.fileMenuOpen
                    })}
                    onClickFile={props.onClickFile}
                    onRequestClose={props.onRequestCloseFile}
                >{(newClick, loadClick, saveClick, saveAsClick, exampleClick) => (
                    <MenuBarMenu
                        open={props.fileMenuOpen}
                        onRequestClose={props.onRequestCloseFile}
                    >
                        <MenuItem onClick={newClick}>新建</MenuItem>
                        <MenuItem onClick={loadClick}>打开</MenuItem>
                        <MenuItem onClick={saveClick}>保存</MenuItem>
                        <MenuSection>
                            <MenuItem onClick={saveAsClick}>另存为...</MenuItem>
                        </MenuSection>
                        <MenuSection>
                            <MenuItem onClick={exampleClick}>示例</MenuItem>
                        </MenuSection>
                    </MenuBarMenu>
                )}</MenuFile>
                <div
                    className={classNames(styles.menuBarItem, styles.hoverable, {
                        [styles.active]: props.editMenuOpen
                    })}
                    onMouseUp={props.onClickEdit}
                >
                    <FormattedMessage
                        defaultMessage="Edit"
                        description="Text for edit dropdown menu"
                        id="gui.menuBar.edit"
                    />
                    <MenuBarMenu
                        open={props.editMenuOpen}
                        onRequestClose={props.onRequestCloseEdit}
                    >
                        <ItemInstall onRequestClose={props.onRequestCloseEdit}>{(handleHexClick, handlePyClick, handleDriverClick) => (
                            <React.Fragment>
                                <MenuSection>
                                    <MenuItem onClick={handleHexClick}>安装交互固件</MenuItem>
                                    <MenuItem onClick={handlePyClick}>安装MicroPython固件</MenuItem>
                                </MenuSection>
                                <MenuSection>
                                    <MenuItem onClick={handleDriverClick}>安装驱动</MenuItem>
                                </MenuSection>
                            </React.Fragment>
                        )}</ItemInstall>
                    </MenuBarMenu>
                </div>
                <div
                    className={classNames(styles.menuBarItem, styles.hoverable, {
                        [styles.active]: props.portMenuOpen
                    })}
                    onMouseUp={props.onClickPort}
                >
                    <MenuPort />
                    <MenuBarMenu
                        open={props.portMenuOpen}
                        onRequestClose={props.onRequestClosePort}
                    >
                        <ItemPort onRequestClose={props.onRequestClosePort}>{(handleClick, ports, port) => (
                            ports.map(v => (
                                <MenuItem key={v} selected={v === port} onClick={handleClick(v)}>
                                    {v}
                                </MenuItem>
                            ))
                        )}</ItemPort>
                    </MenuBarMenu>
                </div>
                <div
                    className={classNames(styles.menuBarItem, styles.hoverable, {
                        [styles.active]: props.boardMenuOpen
                    })}
                    onMouseUp={props.onClickBoard}
                >
                    <MenuBoard />
                    <MenuBarMenu
                        open={props.boardMenuOpen}
                        onRequestClose={props.onRequestCloseBoard}
                    >
                        <ItemBoard onRequestClose={props.onRequestCloseBoard}>{(handleClick, boards, board) => (
                            boards.map(v => (
                                <MenuItem key={v} selected={v === board} onClick={handleClick(v)}>
                                    {v}
                                </MenuItem>
                            ))
                        )}</ItemBoard>
                    </MenuBarMenu>
                </div>
                <MenuHelp
                    className={classNames(styles.menuBarItem, styles.hoverable, {
                        [styles.active]: props.helpMenuOpen
                    })}
                    onClickHelp={props.onClickHelp}
                    onRequestClose={props.onRequestCloseHelp}
                >{(docClick, desClick, aboutClick) => (
                    <MenuBarMenu
                        open={props.helpMenuOpen}
                        onRequestClose={props.onRequestCloseHelp}
                    >
                        <MenuItem onClick={docClick}>使用文档</MenuItem>
                        <MenuItem onClick={desClick}>发行说明</MenuItem>
                        <MenuItem onClick={aboutClick}>关于</MenuItem>
                    </MenuBarMenu>
                )}</MenuHelp>
            </div>
        </div>
        <div className={styles.accountInfoWrapper}>
            <MenuStageCode />
        </div>
    </Box>
);

MenuBar.propTypes = {
    editMenuOpen: PropTypes.bool,
    enableCommunity: PropTypes.bool,
    fileMenuOpen: PropTypes.bool,
    intl: intlShape,
    languageMenuOpen: PropTypes.bool,
    onClickEdit: PropTypes.func,
    onClickFile: PropTypes.func,
    onClickLanguage: PropTypes.func,
    onOpenTipLibrary: PropTypes.func,
    onRequestCloseEdit: PropTypes.func,
    onRequestCloseFile: PropTypes.func,
    onRequestCloseLanguage: PropTypes.func,
    onSeeCommunity: PropTypes.func
};

const mapStateToProps = state => ({
    fileMenuOpen: fileMenuOpen(state),
    editMenuOpen: editMenuOpen(state),
    languageMenuOpen: languageMenuOpen(state),
    portMenuOpen: portMenuOpen(state),
    boardMenuOpen: boardMenuOpen(state),
    helpMenuOpen: helpMenuOpen(state),
    profileMenuOpen: profileMenuOpen(state)
});

const mapDispatchToProps = dispatch => ({
    onOpenTipLibrary: () => dispatch(openTipsLibrary()),
    onClickFile: () => dispatch(openFileMenu()),
    onRequestCloseFile: () => dispatch(closeFileMenu()),
    onClickEdit: () => dispatch(openEditMenu()),
    onRequestCloseEdit: () => dispatch(closeEditMenu()),
    onClickLanguage: () => dispatch(openLanguageMenu()),
    onRequestCloseLanguage: () => dispatch(closeLanguageMenu()),
    onSeeCommunity: () => dispatch(setPlayer(true)),
    onClickPort: () => dispatch(openPortMenu()),
    onRequestClosePort: () => dispatch(closePortMenu()),
    onClickBoard: () => dispatch(openBoardMenu()),
    onRequestCloseBoard: () => dispatch(closeBoardMenu()),
    onClickHelp: () => dispatch(openHelpMenu()),
    onRequestCloseHelp: () => dispatch(closeHelpMenu()),
    onClickProfile: () => dispatch(openProfileMenu()),
    onRequestCloseProfile: () => dispatch(closeProfileMenu())
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar));
