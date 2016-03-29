

var OpenSideNav = function () {
  return {
    type: 'SIDENAV',
    isOpen: true
  };
};

var CloseSideNav = function () {
  return {
    type: 'SIDENAV',
    isOpen: false
  };
};

var ToggleSideNav = function () {
  return {
    type: 'SIDENAV_TOGGLE',
  }
}

module.exports = {
  open: OpenSideNav,
  close: CloseSideNav,
  toggle: ToggleSideNav
};