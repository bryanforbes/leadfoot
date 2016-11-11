import Promise = require('dojo/Promise');
import Session = require('./Session');

/**
 * An Element represents a DOM or UI element within the remote environment.
 */
declare class Element {
	constructor(elementId: string | Element | { ELEMENT: string; }, session: Session);

	/**
		* The opaque, remote-provided ID of the element.
		* @readonly
		*/
	elementId: string;

	/**
		* The session that the element belongs to.
		*
		* @readonly
		*/
	session: Session;

	/**
		* A function that performs an HTTP request to a JsonWireProtocol endpoint and normalises response status and
		* data.
		*
		* @param path
		* The path-part of the JsonWireProtocol URL. May contain placeholders in the form `/\$\d/` that will be
		* replaced by entries in the `pathParts` argument.
		*
		* @param requestData
		* The payload for the request.
		*
		* @param pathParts Optional placeholder values to inject into the path of the URL.
		*/
	protected _get(path: string, requestData: {}, pathParts?: string[]): Promise<{}>;

	/**
		* A function that performs an HTTP request to a JsonWireProtocol endpoint and normalises response status and
		* data.
		*
		* @param path
		* The path-part of the JsonWireProtocol URL. May contain placeholders in the form `/\$\d/` that will be
		* replaced by entries in the `pathParts` argument.
		*
		* @param requestData
		* The payload for the request.
		*
		* @param pathParts Optional placeholder values to inject into the path of the URL.
		*/
	protected _post(path: string, requestData: {}, pathParts?: string[]): Promise<{}>;

	toJSON(): { ELEMENT: string; };

	/**
		* Gets the first element within this element that matches the given query.
		*
		* @see {@link module:leadfoot/Session#setFindTimeout} to set the amount of time it the remote environment
		* should spend waiting for an element that does not exist at the time of the `find` call before timing
		* out.
		*
		* @param using
		* The element retrieval strategy to use. See {@link module:leadfoot/Session#find} for options.
		*
		* @param value
		* The strategy-specific value to search for. See {@link module:leadfoot/Session#find} for details.
		*/
	find(using: string, value: string): Promise<Element>;

	/**
		* Gets all elements within this element that match the given query.
		*
		* @param using
		* The element retrieval strategy to use. See {@link module:leadfoot/Session#find} for options.
		*
		* @param value
		* The strategy-specific value to search for. See {@link module:leadfoot/Session#find} for details.
		*/
	findAll(using: string, value: string): Promise<Element[]>;

	/**
		* Clicks the element. This method works on both mouse and touch platforms.
		*/
	click(): Promise<void>;

	/**
		* Submits the element, if it is a form, or the form belonging to the element, if it is a form element.
		*/
	submit(): Promise<void>;

	/**
		* Gets the visible text within the element. `<br>` elements are converted to line breaks in the returned
		* text, and whitespace is normalised per the usual XML/HTML whitespace normalisation rules.
		*/
	getVisibleText(): Promise<string>;

	/**
		* Types into the element. This method works the same as the {@link module:leadfoot/Session#pressKeys} method
		* except that any modifier keys are automatically released at the end of the command.
		*
		* @param value
		* The text to type in the remote environment. See {@link module:leadfoot/Session#pressKeys} for more information.
		*/
	type(value: string | string[]): Promise<void>;

	/**
		* Gets the tag name of the element. For HTML documents, the value is always lowercase.
		*/
	getTagName(): Promise<string>;

	/**
		* Clears the value of a form element.
		*/
	clearValue(): Promise<void>;

	/**
		* Returns whether or not a form element is currently selected (for drop-down options and radio buttons), or
		* whether or not the element is currently checked (for checkboxes).
		*/
	isSelected(): Promise<boolean>;

	/**
		* Returns whether or not a form element can be interacted with.
		*/
	isEnabled(): Promise<boolean>;

	/**
		* Gets a property or attribute of the element according to the WebDriver specification algorithm. Use of this
		* method is not recommended; instead, use {@link module:leadfoot/Element#getAttribute} to retrieve DOM attributes
		* and {@link module:leadfoot/Element#getProperty} to retrieve DOM properties.
		*
		* This method uses the following algorithm on the server to determine what value to return:
		*
		* 1. If `name` is 'style', returns the `style.cssText` property of the element.
		* 2. If the attribute exists and is a boolean attribute, returns 'true' if the attribute is true, or null
		*    otherwise.
		* 3. If the element is an `<option>` element and `name` is 'value', returns the `value` attribute if it exists,
		*    otherwise returns the visible text content of the option.
		* 4. If the element is a checkbox or radio button and `name` is 'selected', returns 'true' if the element is
		*    checked, or null otherwise.
		* 5. If the returned value is expected to be a URL (e.g. element is `<a>` and attribute is `href`), returns the
		*    fully resolved URL from the `href`/`src` property of the element, not the attribute.
		* 6. If `name` is 'class', returns the `className` property of the element.
		* 7. If `name` is 'readonly', returns 'true' if the `readOnly` property is true, or null otherwise.
		* 8. If `name` corresponds to a property of the element, and the property is not an Object, return the property
		*    value coerced to a string.
		* 9. If `name` corresponds to an attribute of the element, return the attribute value.
		*
		* @param name The property or attribute name.
		* @returns The value of the attribute as a string, or `null` if no such property or
		* attribute exists.
		*/
	getSpecAttribute(name: string): Promise<string>;

	/**
		* Gets an attribute of the element.
		*
		* @see Element#getProperty to retrieve an element property.
		* @param name The name of the attribute.
		* @returns The value of the attribute, or `null` if no such attribute exists.
		*/
	getAttribute(name: string): Promise<string>;

	/**
		* Gets a property of the element.
		*
		* @see Element#getAttribute to retrieve an element attribute.
		* @param name The name of the property.
		* @returns The value of the property.
		*/
	getProperty<T extends any>(name: string): Promise<T>;

	/**
		* Determines if this element is equal to another element.
		*
		* @param other The other element.
		*/
	equals(other: Element): Promise<boolean>;

	/**
		* Returns whether or not the element would be visible to an actual user. This means that the following types
		* of elements are considered to be not displayed:
		*
		* 1. Elements with `display: none`
		* 2. Elements with `visibility: hidden`
		* 3. Elements positioned outside of the viewport that cannot be scrolled into view
		* 4. Elements with `opacity: 0`
		* 5. Elements with no `offsetWidth` or `offsetHeight`
		*/
	isDisplayed(): Promise<boolean>;

	/**
		* Gets the position of the element relative to the top-left corner of the document, taking into account
		* scrolling and CSS transformations (if they are supported).
		*/
	getPosition(): Promise<{ x: number; y: number; }>;

	/**
		* Gets the size of the element, taking into account CSS transformations (if they are supported).
		*/
	getSize(): Promise<{ width: number; height: number; }>;

	/**
		* Gets a CSS computed property value for the element.
		*
		* @param propertyName
		* The CSS property to retrieve. This argument must be camel-case, *not* hyphenated.
		*/
	getComputedStyle(propertyName: string): Promise<string>;

	/**
		* Gets the first element inside this element matching the given CSS class name.
		*
		* @param className The CSS class name to search for.
		*/
	findByClassName(className: string): Promise<Element>;

	/**
		* Gets the first element inside this element matching the given CSS selector.
		*
		* @param selector The CSS selector to search for.
		*/
	findByCssSelector(selector: string): Promise<Element>;

	/**
		* Gets the first element inside this element matching the given ID.
		*
		* @param id The ID of the element.
		*/
	findById(id: string): Promise<Element>;

	/**
		* Gets the first element inside this element matching the given name attribute.
		*
		* @param name The name of the element.
		*/
	findByName(name: string): Promise<Element>;

	/**
		* Gets the first element inside this element matching the given case-insensitive link text.
		*
		* @param text The link text of the element.
		*/
	findByLinkText(text: string): Promise<Element>;

	/**
		* Gets the first element inside this element partially matching the given case-insensitive link text.
		*
		* @param text The partial link text of the element.
		*/
	findByPartialLinkText(text: string): Promise<Element>;

	/**
		* Gets the first element inside this element matching the given HTML tag name.
		*
		* @param tagName The tag name of the element.
		*/
	findByTagName(tagName: string): Promise<Element>;

	/**
		* Gets the first element inside this element matching the given XPath selector.
		*
		* @param path The XPath selector to search for.
		*/
	findByXpath(path: string): Promise<Element>;

	/**
		* Gets all elements inside this element matching the given CSS class name.
		*
		* @param className The CSS class name to search for.
		*/
	findAllByClassName(className: string): Promise<Element[]>;

	/**
		* Gets all elements inside this element matching the given CSS selector.
		*
		* @param selector The CSS selector to search for.
		*/
	findAllByCssSelector(selector: string): Promise<Element[]>;

	/**
		* Gets all elements inside this element matching the given name attribute.
		*
		* @param name The name of the element.
		*/
	findAllByName(name: string): Promise<Element[]>;

	/**
		* Gets all elements inside this element matching the given case-insensitive link text.
		*
		* @param text The link text of the element.
		*/
	findAllByLinkText(text: string): Promise<Element[]>;

	/**
		* Gets all elements inside this element partially matching the given case-insensitive link text.
		*
		* @param text The partial link text of the element.
		*/
	findAllByPartialLinkText(text: string): Promise<Element[]>;

	/**
		* Gets all elements inside this element matching the given HTML tag name.
		*
		* @param tagName The tag name of the element.
		*/
	findAllByTagName(tagName: string): Promise<Element[]>;

	/**
		* Gets all elements inside this element matching the given XPath selector.
		*
		* @param path The XPath selector to search for.
		*/
	findAllByXpath(path: string): Promise<Element[]>;

	/**
		* Waits for all elements inside this element that match the given query to be destroyed.
		*
		* @param using
		* The element retrieval strategy to use. See {@link module:leadfoot/Session#find} for options.
		*
		* @param value
		* The strategy-specific value to search for. See {@link module:leadfoot/Session#find} for details.
		*/
	waitForDeleted(using: string, value: string): Promise<void>;

	/**
		* Waits for all elements inside this element matching the given CSS class name to be destroyed.
		*
		* @param className The CSS class name to search for.
		*/
	waitForDeletedByClassName(className: string): Promise<void>;

	/**
		* Waits for all elements inside this element matching the given CSS selector to be destroyed.
		*
		* @param selector The CSS selector to search for.
		*/
	waitForDeletedByCssSelector(className: string): Promise<void>;

	/**
		* Waits for all elements inside this element matching the given ID to be destroyed.
		*
		* @param id The ID of the element.
		*/
	waitForDeletedById(id: string): Promise<void>;

	/**
		* Waits for all elements inside this element matching the given name attribute to be destroyed.
		*
		* @param name The name of the element.
		*/
	waitForDeletedByName(name: string): Promise<void>;

	/**
		* Waits for all elements inside this element matching the given case-insensitive link text to be destroyed.
		*
		* @param text The link text of the element.
		*/
	waitForDeletedByLinkText(text: string): Promise<void>;

	/**
		* Waits for all elements inside this element partially matching the given case-insensitive link text to be
		* destroyed.
		*
		* @param text The partial link text of the element.
		*/
	waitForDeletedByPartialLinkText(text: string): Promise<void>;

	/**
		* Waits for all elements inside this element matching the given HTML tag name to be destroyed.
		*
		* @param tagName The tag name of the element.
		*/
	waitForDeletedByTagName(tagName: string): Promise<void>;

	/**
		* Waits for all elements inside this element matching the given XPath selector to be destroyed.
		*
		* @param path The XPath selector to search for.
		*/
	waitForDeletedByXpath(path: string): Promise<void>;
}

export = Element;
