import useStore, { LayoutStore, Store } from '.';

const layoutSelector = (state: Store): LayoutStore => ({
  toggleIsSidenavHidden: state.toggleIsSidenavHidden,
  isSidenavHidden: state.isSidenavHidden,
  isShowDiscardedItems: state.isShowDiscardedItems,
  toggleIsShowDiscardedItems: state.toggleIsShowDiscardedItems,
  themeColor: state.themeColor,
  setThemeColor: state.setThemeColor,
});

const useLayout = (): ReturnType<typeof layoutSelector> => {
  return useStore(layoutSelector);
};

export default useLayout;
