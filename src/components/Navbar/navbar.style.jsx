const styles = {
  navbar: {
    position: 'relative',
    backgroundColor: 'white',
    transition: 'all 0.3s ease-out 0s',
    boxShadow: '0px 10px 10px 0px rgba(9, 5, 29, 0.171)',
    fontSize: '1.2rem',
  },
  navbarFixed: {
    position: 'fixed',
    width: '100vw',
    left: 0,
    top: 0,
  },
  navbarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  navbarToggler: {
    position: 'relative',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  navbarTogglerSpan: {
    display: 'block',
    backgroundColor: 'black',
    height: '4px',
    width: '27px',
    marginTop: '5px',
    marginBottom: '5px',
    transform: 'rotate(0deg)',
    left: 0,
    opacity: 1,
  },
  navbarTogglerFocus: {
    border: 'none',
    outline: 0,
    boxShadow: '0 0 0 transparent',
  },
  navbarTogglerSpanFirst: {
    transition: 'transform 0.35s ease-in-out',
  },
  navbarTogglerSpanLast: {
    transition: 'transform 0.35s ease-in-out',
  },
  navbarTogglerNotCollapsedSpanFirst: {
    position: 'absolute',
    left: '12px',
    top: '10px',
    transform: 'rotate(135deg)',
    opacity: 0.9,
  },
  navbarTogglerNotCollapsedSpanSecond: {
    height: '12px',
    visibility: 'hidden',
    backgroundColor: 'transparent',
  },
  navbarTogglerNotCollapsedSpanLast: {
    position: 'absolute',
    left: '12px',
    top: '10px',
    transform: 'rotate(-135deg)',
    opacity: 0.9,
  },
  navbarBrand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
  },
  navbarBrandIcon: {
    fontSize: '25px',
  },
  logo: {
    fontSize: '25px',
    fontWeight: 500,
    color: 'black',
    margin: 0,
  },
  navbarLink: {
    display: 'flex',
    textDecoration: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    fontSize: '10px',
    padding: '0.8rem 0.5rem 0.2rem',
  },
  navLinkLabel: {
    color: 'black',
    fontSize: '18px',
    fontWeight: 600,
  },
  navIcon: {
    width: '30px',
    height: '30px',
    paddingBottom: '5px',
  },
  cart: {
    position: 'relative',
    zIndex: 3,
  },
  cartBefore: {
    content: 'attr(data-num)',
    position: 'absolute',
    right: 0,
    top: '-5px',
    backgroundColor: '#0f3460',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '16px',
    height: '16px',
    fontSize: '11px',
    fontWeight: 600,
    color: 'white',
    zIndex: 5,
  },
  navbarNavItem: {
    position: 'relative',
    paddingBottom: '3px',
    margin: '0 1rem',
    fontWeight: 400,
    transition: 'all 0.3s ease-out 0s',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: '10px',
    zIndex: 1,
  },
  offcanvasEnd: {
    width: '300px',
  },
  mediaCart: {
    display: 'none',
  },
  expandedCart: {
    display: 'none',
  },
  '@media (maxWidth: 767px)': {
    navbar: {
      fontSize: '1.4rem',
    },
    navbarNavItemAfter: {
      display: 'none',
    },
    navbarTogglerSpan: {
      width: '25px',
      height: '3px',
    },
    ionIcon: {
      fontSize: '20px',
    },
    logo: {
      fontSize: '20px',
    },
    expandedCart: {
      display: 'none',
    },
    mediaCart: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: '5px',
    },
  },
};

export default styles;
