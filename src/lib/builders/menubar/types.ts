import type { BuilderReturn } from '$lib/internal/types';
import type { Menu } from '../menu';
import type { createMenubar } from './create';

// Props
export type CreateMenubarProps = {
	/**
	 * Whether or not the menubar should loop when
	 * navigating with the arrow keys.
	 *
	 * @default true
	 */
	loop?: boolean;

	/**
	 * Whether to close the active menu when the escape key is pressed.
	 */
	closeOnEscape?: boolean;
};
export type CreateMenubarMenuProps = Menu['builder'];
export type CreateMenubarSubmenuProps = Menu['submenu'];
export type MenubarMenuItemProps = Menu['item'];
export type MenubarCheckboxItemProps = Menu['checkboxItem'];
export type CreateMenuRadioGroupProps = Menu['radioGroup'];
export type MenubarRadioItemProps = Menu['radioItem'];
export type MenubarRadioItemActionProps = Menu['radioItemAction'];

// Returns
export type Menubar = BuilderReturn<typeof createMenubar>;
export type MenubarElements = Menubar['elements'];
export type MenubarOptions = Menubar['options'];
export type MenubarBuilders = Menubar['builders'];

export type MenubarMenu = BuilderReturn<MenubarBuilders['createMenu']>;
export type MenubarMenuElements = MenubarMenu['elements'];
export type MenubarMenuOptions = MenubarMenu['options'];
export type MenubarMenuStates = MenubarMenu['states'];
export type MenubarMenuBuilders = MenubarMenu['builders'];

export type MenubarMenuSubmenu = BuilderReturn<MenubarMenuBuilders['createSubmenu']>;
export type MenubarMenuSubmenuElements = MenubarMenuSubmenu['elements'];
export type MenubarMenuSubmenuOptions = MenubarMenuSubmenu['options'];
export type MenubarMenuSubmenuStates = MenubarMenuSubmenu['states'];

export type MenubarMenuRadioGroup = BuilderReturn<MenubarMenuBuilders['createMenuRadioGroup']>;
export type MenubarMenuRadioGroupElements = MenubarMenuRadioGroup['elements'];
export type MenubarMenuRadioGroupStates = MenubarMenuRadioGroup['states'];
export type MenubarMenuRadioGroupHelpers = MenubarMenuRadioGroup['helpers'];
