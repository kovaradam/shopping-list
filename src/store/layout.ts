import useStore, { LayoutStore, Store } from '.';

const sideNavbarStateSelector = (state: Store): LayoutStore => ({
  toggleIsSidenavbar: state.toggleIsSidenavbar,
  isSideNavbarHidden: state.isSideNavbarHidden,
});

const useLayout = (): ReturnType<typeof sideNavbarStateSelector> => {
  return useStore(sideNavbarStateSelector);
};

export default useLayout;
