import useStore, { LayoutStore, Store } from '.';

const sidenavStateSelector = (state: Store): LayoutStore => ({
  toggleIsSidenavHidden: state.toggleIsSidenavHidden,
  isSidenavHidden: state.isSidenavHidden,
});

const useLayout = (): ReturnType<typeof sidenavStateSelector> => {
  return useStore(sidenavStateSelector);
};

export default useLayout;
