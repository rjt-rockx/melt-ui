import { isHTMLElement } from './is';

/**
 * Get an element's ancestor which has a `data-portal` attribute.
 * This is used to handle nested portals/overlays/dialogs/popovers.
 */
export function getPortalParent(node: HTMLElement) {
	let parent = node.parentElement;
	while (isHTMLElement(parent) && parent.getAttribute('data-portal') === null) {
		parent = parent.parentElement;
	}
	return parent || 'body';
}
