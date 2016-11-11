import 'dojo-typings/custom/dojo2/dojo';
import '@types/node';

import * as leadfoot from './typedefs';

import Element = require('./Element');
import Promise = require('dojo/Promise');
import Server = require('./Server');

/**
	* A Session represents a connection to a remote environment that can be driven programmatically.
	*/
declare class Session {
	/**
		* @param sessionId The ID of the session, as provided by the remote.
		* @param server The server that the session belongs to.
		* @param capabilities A map of bugs and features that the remote environment exposes.
		*/
	constructor(sessionId: string, server: Server, capabilities: leadfoot.Capabilities);

	/**
		* Information about the available features and bugs in the remote environment.
		*
		* @readonly
		*/
	capabilities: leadfoot.Capabilities;

	/**
		* The current session ID.
		*
		* @readonly
		*/
	sessionId: string;

	/**
		* The Server that the session runs on.
		*
		* @member {module:leadfoot/Server} server
		* @memberOf module:leadfoot/Session#
		* @readonly
		*/
	server: Server;

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
	protected _delete(path: string, requestData: {}, pathParts?: string[]): Promise<{}>;

	/**
		* Gets the current value of a timeout for the session.
		*
		* @param type The type of timeout to retrieve. One of 'script', 'implicit', or 'page load'.
		* @returns The timeout, in milliseconds.
		*/
	getTimeout(type: string): Promise<number>;

	/**
		* Sets the value of a timeout for the session.
		*
		* @param type
		* The type of timeout to set. One of 'script', 'implicit', or 'page load'.
		*
		* @param ms
		* The length of time to use for the timeout, in milliseconds. A value of 0 will cause operations to time out
		* immediately.
		*/
	setTimeout(type: string, ms: number): Promise<void>;

	/**
		* Gets the identifier for the window that is currently focused.
		*
		* @returns A window handle identifier that can be used with other window handling functions.
		*/
	getCurrentWindowHandle(): Promise<string>;

	/**
		* Gets a list of identifiers for all currently open windows.
		*/
	getAllWindowHandles(): Promise<string[]>;

	/**
		* Gets the URL that is loaded in the focused window/frame.
		*/
	getCurrentUrl(): Promise<string>;

	/**
		* Navigates the focused window/frame to a new URL.
		*/
	get(url: string): Promise<void>;

	/**
		* Navigates the focused window/frame forward one page using the browser’s navigation history.
		*/
	goForward(): Promise<void>;

	/**
		* Navigates the focused window/frame back one page using the browser’s navigation history.
		*/
	goBack(): Promise<void>;

	/**
		* Reloads the current browser window/frame.
		*/
	refresh(): Promise<void>;

	/**
		* Executes JavaScript code within the focused window/frame. The code should return a value synchronously.
		*
		* @see {@link module:leadfoot/Session#executeAsync} to execute code that returns values asynchronously.
		*
		* @param script
		* The code to execute. If a string value is passed, it will be converted to a function on the remote end.
		*
		* @param args
		* An array of arguments that will be passed to the executed code. Only values that can be serialised to JSON, plus
		* {@link module:leadfoot/Element} objects, can be specified as arguments.
		*
		* @returns
		* The value returned by the remote code. Only values that can be serialised to JSON, plus DOM elements, can be
		* returned.
		*/
	execute<T>(script: Function | string, args: any[]): Promise<T>;

	/**
		* Executes JavaScript code within the focused window/frame. The code must invoke the provided callback in
		* order to signal that it has completed execution.
		*
		* @see {@link module:leadfoot/Session#execute} to execute code that returns values synchronously.
		* @see {@link module:leadfoot/Session#setExecuteAsyncTimeout} to set the time until an asynchronous script is
		* considered timed out.
		*
		* @param script
		* The code to execute. If a string value is passed, it will be converted to a function on the remote end.
		*
		* @param args
		* An array of arguments that will be passed to the executed code. Only values that can be serialised to JSON, plus
		* {@link module:leadfoot/Element} objects, can be specified as arguments. In addition to these arguments, a
		* callback function will always be passed as the final argument to the script. This callback function must be
		* invoked in order to signal that execution has completed. The return value of the script, if any, should be passed
		* to this callback function.
		*
		* @returns
		* The value returned by the remote code. Only values that can be serialised to JSON, plus DOM elements, can be
		* returned.
		*/
	executeAsync<T>(script: Function | string, args: any[]): Promise<T>;

	/**
		* Gets a screenshot of the focused window and returns it in PNG format.
		*
		* @returns A buffer containing a PNG image.
		*/
	takeScreenshot(): Promise<Buffer>;

	/**
		* Gets a list of input method editor engines available to the remote environment.
		* As of April 2014, no known remote environments support IME functions.
		*/
	getAvailableImeEngines(): Promise<string[]>;

	/**
		* Gets the currently active input method editor for the remote environment.
		* As of April 2014, no known remote environments support IME functions.
		*/
	getActiveImeEngine(): Promise<string>;

	/**
		* Returns whether or not an input method editor is currently active in the remote environment.
		* As of April 2014, no known remote environments support IME functions.
		*/
	isImeActivated(): Promise<boolean>;

	/**
		* Deactivates any active input method editor in the remote environment.
		* As of April 2014, no known remote environments support IME functions.
		*/
	deactivateIme(): Promise<void>;

	/**
		* Activates an input method editor in the remote environment.
		* As of April 2014, no known remote environments support IME functions.
		*
		* @param engine The type of IME to activate.
		*/
	activateIme(engine: string): Promise<void>;

	/**
		* Switches the currently focused frame to a new frame.
		*
		* @param id
		* The frame to switch to. In most environments, a number or string value corresponds to a key in the
		* `window.frames` object of the currently active frame. If `null`, the topmost (default) frame will be used.
		* If an Element is provided, it must correspond to a `<frame>` or `<iframe>` element.
		*/
	switchToFrame(id: string | number | Element): Promise<void>;

	/**
		* Switches the currently focused window to a new window.
		*
		* @param name
		* The name of the window to switch to. In most environments, this value corresponds to the `window.name`
		* property of a window; however, this is not the case in mobile environments. In mobile environments, use
		* {@link module:leadfoot/Session#getAllWindowHandles} to learn what window names can be used.
		*/
	switchToWindow(name: string): Promise<void>;

	/**
		* Switches the currently focused frame to the parent of the currently focused frame.
		*/
	switchToParentFrame(): Promise<void>;

	/**
		* Closes the currently focused window. In most environments, after the window has been closed, it is necessary
		* to explicitly switch to whatever window is now focused.
		*/
	closeCurrentWindow(): Promise<void>;

	/**
		* Sets the dimensions of a window.
		*
		* @param windowHandle
		* The name of the window to resize. See {@link module:leadfoot/Session#switchToWindow} to learn about valid
		* window names. Omit this argument to resize the currently focused window.
		*
		* @param width
		* The new width of the window, in CSS pixels.
		*
		* @param height
		* The new height of the window, in CSS pixels.
		*/
	setWindowSize(windowHandle: string, width: number, height: number): Promise<void>;
	setWindowSize(width: number, height: number): Promise<void>;

	/**
		* Gets the dimensions of a window.
		*
		* @param windowHandle
		* The name of the window to query. See {@link module:leadfoot/Session#switchToWindow} to learn about valid
		* window names. Omit this argument to query the currently focused window.
		*
		* @returns
		* An object describing the width and height of the window, in CSS pixels.
		*/
	getWindowSize(windowHandle?: string): Promise<{ width: number; height: number; }>;

	/**
		* Sets the position of a window.
		*
		* @param windowHandle
		* The name of the window to move. See {@link module:leadfoot/Session#switchToWindow} to learn about valid
		* window names. Omit this argument to move the currently focused window.
		*
		* @param x
		* The screen x-coordinate to move to, in CSS pixels, relative to the left edge of the primary monitor.
		*
		* @param y
		* The screen y-coordinate to move to, in CSS pixels, relative to the top edge of the primary monitor.
		*/
	setWindowPosition(windowHandle: string, x: number, y: number): Promise<void>;
	setWindowPosition(x: number, y: number): Promise<void>;

	/**
		* Gets the position of a window.
		*
		* @param windowHandle
		* The name of the window to query. See {@link module:leadfoot/Session#switchToWindow} to learn about valid
		* window names. Omit this argument to query the currently focused window.
		*
		* @returns
		* An object describing the position of the window, in CSS pixels, relative to the top-left corner of the
		* primary monitor. If a secondary monitor exists above or to the left of the primary monitor, these values
		* will be negative.
		*/
	getWindowPosition(windowHandle?: string): Promise<{ x: number; y: number; }>;

	/**
		* Maximises a window according to the platform’s window system behaviour.
		*
		* @param windowHandle
		* The name of the window to resize. See {@link module:leadfoot/Session#switchToWindow} to learn about valid
		* window names. Omit this argument to resize the currently focused window.
		*/
	maximizeWindow(windowHandle?: string): Promise<void>;

	/**
		* Gets all cookies set on the current page.
		*/
	getCookies(): Promise<leadfoot.WebDriverCookie[]>;

	/**
		* Sets a cookie on the current page.
		*
		* @param cookie
		*/
	setCookie(cookie: leadfoot.WebDriverCookie): Promise<void>;

	/**
		* Clears all cookies for the current page.
		*/
	clearCookies(): Promise<void>;

	/**
		* Deletes a cookie on the current page.
		*
		* @param name The name of the cookie to delete.
		*/
	deleteCookie(name: string): Promise<void>;

	/**
		* Gets the HTML loaded in the focused window/frame. This markup is serialised by the remote environment so
		* may not exactly match the HTML provided by the Web server.
		*/
	getPageSource(): Promise<string>;

	/**
		* Gets the title of the focused window/frame.
		*/
	getPageTitle(): Promise<string>;

	/**
		* Gets the first element from the focused window/frame that matches the given query.
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
		* Gets all elements from the focused window/frame that match the given query.
		*
		* @param using
		* The element retrieval strategy to use. See {@link module:leadfoot/Session#find} for options.
		*
		* @param value
		* The strategy-specific value to search for. See {@link module:leadfoot/Session#find} for details.
		*/
	findAll(using: string, value: string): Promise<Element[]>;

	/**
		* Gets the currently focused element from the focused window/frame.
		*/
	getActiveElement(): Promise<Element>;

	/**
		* Types into the focused window/frame/element.
		*
		* @param keys
		* The text to type in the remote environment. It is possible to type keys that do not have normal character
		* representations (modifier keys, function keys, etc.) as well as keys that have two different representations
		* on a typical US-ASCII keyboard (numpad keys); use the values from {@link module:leadfoot/keys} to type these
		* special characters. Any modifier keys that are activated by this call will persist until they are
		* deactivated. To deactivate a modifier key, type the same modifier key a second time, or send `\uE000`
		* ('NULL') to deactivate all currently active modifier keys.
		*/
	pressKeys(keys: string | string[]): Promise<void>;

	/**
		* Gets the current screen orientation.
		*
		* @returns Either 'portrait' or 'landscape'.
		*/
	getOrientation(): Promise<string>;

	/**
		* Sets the screen orientation.
		*
		* @param orientation Either 'portrait' or 'landscape'.
		*/
	setOrientation(orientation: string): Promise<void>;

	/**
		* Gets the text displayed in the currently active alert pop-up.
		*/
	getAlertText(): Promise<string>;

	/**
		* Types into the currently active prompt pop-up.
		*
		* @param text The text to type into the pop-up’s input box.
		*/
	typeInPrompt(text: string | string[]): Promise<void>;

	/**
		* Accepts an alert, prompt, or confirmation pop-up. Equivalent to clicking the 'OK' button.
		*/
	acceptAlert(): Promise<void>;

	/**
		* Dismisses an alert, prompt, or confirmation pop-up. Equivalent to clicking the 'OK' button of an alert pop-up
		* or the 'Cancel' button of a prompt or confirmation pop-up.
		*/
	dismissAlert(): Promise<void>;

	/**
		* Moves the remote environment’s mouse cursor to the specified element or relative position. If the element is
		* outside of the viewport, the remote driver will attempt to scroll it into view automatically.
		*
		* @param element
		* The element to move the mouse to. If x-offset and y-offset are not specified, the mouse will be moved to the
		* centre of the element.
		*
		* @param xOffset
		* The x-offset of the cursor, maybe in CSS pixels, relative to the left edge of the specified element’s
		* bounding client rectangle. If no element is specified, the offset is relative to the previous position of the
		* mouse, or to the left edge of the page’s root element if the mouse was never moved before.
		*
		* @param yOffset
		* The y-offset of the cursor, maybe in CSS pixels, relative to the top edge of the specified element’s bounding
		* client rectangle. If no element is specified, the offset is relative to the previous position of the mouse,
		* or to the top edge of the page’s root element if the mouse was never moved before.
		*/
	moveMouseTo(element: Element, xOffset?: number, yOffset?: number): Promise<void>;
	moveMouseTo(xOffset: number, yOffset: number): Promise<void>;

	/**
		* Clicks a mouse button at the point where the mouse cursor is currently positioned. This method may fail to
		* execute with an error if the mouse has not been moved anywhere since the page was loaded.
		*
		* @param button
		* The button to click. 0 corresponds to the primary mouse button, 1 to the middle mouse button, 2 to the
		* secondary mouse button. Numbers above 2 correspond to any additional buttons a mouse might provide.
		*/
	clickMouseButton(button?: number): Promise<void>;

	/**
		* Depresses a mouse button without releasing it.
		*
		* @param button The button to press. See {@link module:leadfoot/Session#click} for available options.
		*/
	pressMouseButton(button?: number): Promise<void>;

	/**
		* Releases a previously depressed mouse button.
		*
		* @param button The button to press. See {@link module:leadfoot/Session#click} for available options.
		*/
	releaseMouseButton(button?: number): Promise<void>;

	/**
		* Double-clicks the primary mouse button.
		*/
	doubleClick(): Promise<void>;

	/**
		* Taps an element on a touch screen device. If the element is outside of the viewport, the remote driver will
		* attempt to scroll it into view automatically.
		*
		* @param element The element to tap.
		*/
	tap(element: Element): Promise<void>;

	/**
		* Depresses a new finger at the given point on a touch screen device without releasing it.
		*
		* @param x The screen x-coordinate to press, maybe in device pixels.
		* @param y The screen y-coordinate to press, maybe in device pixels.
		*/
	pressFinger(x: number, y: number): Promise<void>;

	/**
		* Releases whatever finger exists at the given point on a touch screen device.
		*
		* @param x The screen x-coordinate where a finger is pressed, maybe in device pixels.
		* @param y The screen y-coordinate where a finger is pressed, maybe in device pixels.
		*/
	releaseFinger(x: number, y: number): Promise<void>;

	/**
		* Moves the last depressed finger to a new point on the touch screen.
		*
		* @param x The screen x-coordinate to move to, maybe in device pixels.
		* @param y The screen y-coordinate to move to, maybe in device pixels.
		*/
	moveFinger(x: number, y: number): Promise<void>;

	/**
		* Scrolls the currently focused window on a touch screen device.
		*
		* @param element
		* An element to scroll to. The window will be scrolled so the element is as close to the top-left corner of the
		* window as possible.
		*
		* @param xOffset
		* An optional x-offset, relative to the left edge of the element, in CSS pixels. If no element is specified,
		* the offset is relative to the previous scroll position of the window.
		*
		* @param yOffset
		* An optional y-offset, relative to the top edge of the element, in CSS pixels. If no element is specified,
		* the offset is relative to the previous scroll position of the window.
		*/
	touchScroll(element: Element, xOffset: number, yOffset: number): Promise<void>;
	touchScroll(xOffset: number, yOffset: number): Promise<void>;

	/**
		* Performs a double-tap gesture on an element.
		*
		* @param element The element to double-tap.
		*/
	doubleTap(element: Element): Promise<void>;

	/**
		* Performs a long-tap gesture on an element.
		*
		* @param element The element to long-tap.
		*/
	longTap(element: Element): Promise<void>;

	/**
		* Flicks a finger. Note that this method is currently badly specified and highly dysfunctional and is only
		* provided for the sake of completeness.
		*
		* @param element The element where the flick should start.
		* @param xOffset The x-offset in pixels to flick by.
		* @param yOffset The x-offset in pixels to flick by.
		* @param speed The speed of the flick, in pixels per *second*. Most human flicks are 100–200ms, so
		* this value will be higher than expected.
		*/
	flickFinger(element: Element, xOffset: number, yOffset: number, speed: number): Promise<void>;

	/**
		* Gets the current geographical location of the remote environment.
		*
		* @returns
		* Latitude and longitude are specified using standard WGS84 decimal latitude/longitude. Altitude is specified
		* as meters above the WGS84 ellipsoid. Not all environments support altitude.
		*/
	getGeolocation(): Promise<leadfoot.Geolocation>;

	/**
		* Sets the geographical location of the remote environment.
		*
		* @param location
		* Latitude and longitude are specified using standard WGS84 decimal latitude/longitude. Altitude is specified
		* as meters above the WGS84 ellipsoid. Not all environments support altitude.
		*/
	setGeolocation(location: leadfoot.Geolocation): Promise<void>;

	/**
		* Gets all logs from the remote environment of the given type. The logs in the remote environment are cleared
		* once they have been retrieved.
		*
		* @param type
		* The type of log entries to retrieve. Available log types differ between remote environments. Use
		* {@link module:leadfoot/Session#getAvailableLogTypes} to learn what log types are currently available. Not all
		* environments support all possible log types.
		*
		* @returns
		* An array of log entry objects. Timestamps in log entries are Unix timestamps, in seconds.
		*/
	getLogsFor(type: string): Promise<leadfoot.LogEntry[]>;

	/**
		* Gets the types of logs that are currently available for retrieval from the remote environment.
		*/
	getAvailableLogTypes(): Promise<string[]>;

	/**
		* Gets the current state of the HTML5 application cache for the current page.
		*
		* @returns
		* The cache status. One of 0 (uncached), 1 (cached/idle), 2 (checking), 3 (downloading), 4 (update ready), 5
		* (obsolete).
		*/
	getApplicationCacheStatus(): Promise<number>;

	/**
		* Terminates the session. No more commands will be accepted by the remote after this point.
		*/
	quit(): Promise<void>;

	/**
		* Gets the list of keys set in local storage for the focused window/frame.
		*/
	getLocalStorageKeys(): Promise<string[]>;

	/**
		* Sets a value in local storage for the focused window/frame.
		*
		* @param key The key to set.
		* @param value The value to set.
		*/
	setLocalStorageItem(key: string, value: string): Promise<void>;

	/**
		* Clears all data in local storage for the focused window/frame.
		*/
	clearLocalStorage(): Promise<void>;

	/**
		* Gets a value from local storage for the focused window/frame.
		*
		* @param key The key of the data to get.
		*/
	getLocalStorageItem(key: string): Promise<string>;

	/**
		* Deletes a value from local storage for the focused window/frame.
		*
		* @param key The key of the data to delete.
		*/
	deleteLocalStorageItem(key: string): Promise<void>;

	/**
		* Gets the number of keys set in local storage for the focused window/frame.
		*/
	getLocalStorageLength(): Promise<number>;

	/**
		* Gets the list of keys set in session storage for the focused window/frame.
		*/
	getSessionStorageKeys(): Promise<string[]>;

	/**
		* Sets a value in session storage for the focused window/frame.
		*
		* @param key The key to set.
		* @param value The value to set.
		*/
	setSessionStorageItem(key: string, value: string): Promise<void>;

	/**
		* Clears all data in session storage for the focused window/frame.
		*/
	clearSessionStorage(): Promise<void>;

	/**
		* Gets a value from session storage for the focused window/frame.
		*
		* @param key The key of the data to get.
		*/
	getSessionStorageItem(key: string): Promise<string>;

	/**
		* Deletes a value from session storage for the focused window/frame.
		*
		* @param key The key of the data to delete.
		*/
	deleteSessionStorageItem(key: string): Promise<void>;

	/**
		* Gets the number of keys set in session storage for the focused window/frame.
		*/
	getSessionStorageLength(): Promise<number>;

	/**
		* Gets the first element in the currently active window/frame matching the given CSS class name.
		*
		* @param className The CSS class name to search for.
		*/
	findByClassName(className: string): Promise<Element>;

	/**
		* Gets the first element in the currently active window/frame matching the given CSS selector.
		*
		* @param selector The CSS selector to search for.
		*/
	findByCssSelector(selector: string): Promise<Element>;

	/**
		* Gets the first element in the currently active window/frame matching the given ID.
		*
		* @param id The ID of the element.
		*/
	findById(id: string): Promise<Element>;

	/**
		* Gets the first element in the currently active window/frame matching the given name attribute.
		*
		* @param name The name of the element.
		*/
	findByName(name: string): Promise<Element>;

	/**
		* Gets the first element in the currently active window/frame matching the given case-insensitive link text.
		*
		* @param text The link text of the element.
		*/
	findByLinkText(text: string): Promise<Element>;

	/**
		* Gets the first element in the currently active window/frame partially matching the given case-insensitive link text.
		*
		* @param text The partial link text of the element.
		*/
	findByPartialLinkText(text: string): Promise<Element>;

	/**
		* Gets the first element in the currently active window/frame matching the given HTML tag name.
		*
		* @param tagName The tag name of the element.
		*/
	findByTagName(tagName: string): Promise<Element>;

	/**
		* Gets the first element in the currently active window/frame matching the given XPath selector.
		*
		* @param path The XPath selector to search for.
		*/
	findByXpath(path: string): Promise<Element>;

	/**
		* Gets all elements in the currently active window/frame matching the given CSS class name.
		*
		* @param className The CSS class name to search for.
		*/
	findAllByClassName(className: string): Promise<Element[]>;

	/**
		* Gets all elements in the currently active window/frame matching the given CSS selector.
		*
		* @param selector The CSS selector to search for.
		*/
	findAllByCssSelector(selector: string): Promise<Element[]>;

	/**
		* Gets all elements in the currently active window/frame matching the given name attribute.
		*
		* @param name The name of the element.
		*/
	findAllByName(name: string): Promise<Element[]>;

	/**
		* Gets all elements in the currently active window/frame matching the given case-insensitive link text.
		*
		* @param text The link text of the element.
		*/
	findAllByLinkText(text: string): Promise<Element[]>;

	/**
		* Gets all elements in the currently active window/frame partially matching the given case-insensitive link text.
		*
		* @param text The partial link text of the element.
		*/
	findAllByPartialLinkText(text: string): Promise<Element[]>;

	/**
		* Gets all elements in the currently active window/frame matching the given HTML tag name.
		*
		* @param tagName The tag name of the element.
		*/
	findAllByTagName(tagName: string): Promise<Element[]>;

	/**
		* Gets all elements in the currently active window/frame matching the given XPath selector.
		*
		* @param path The XPath selector to search for.
		*/
	findAllByXpath(path: string): Promise<Element[]>;

	/**
		* Waits for all elements in the currently active window/frame that match the given query to be destroyed.
		*
		* @param using
		* The element retrieval strategy to use. See {@link module:leadfoot/Session#find} for options.
		*
		* @param value
		* The strategy-specific value to search for. See {@link module:leadfoot/Session#find} for details.
		*/
	waitForDeleted(using: string, value: string): Promise<void>;

	/**
		* Waits for all elements in the currently active window/frame matching the given CSS class name to be destroyed.
		*
		* @param className The CSS class name to search for.
		*/
	waitForDeletedByClassName(className: string): Promise<void>;

	/**
		* Waits for all elements in the currently active window/frame matching the given CSS selector to be destroyed.
		*
		* @param selector The CSS selector to search for.
		*/
	waitForDeletedByCssSelector(className: string): Promise<void>;

	/**
		* Waits for all elements in the currently active window/frame matching the given ID to be destroyed.
		*
		* @param id The ID of the element.
		*/
	waitForDeletedById(id: string): Promise<void>;

	/**
		* Waits for all elements in the currently active window/frame matching the given name attribute to be destroyed.
		*
		* @param name The name of the element.
		*/
	waitForDeletedByName(name: string): Promise<void>;

	/**
		* Waits for all elements in the currently active window/frame matching the given case-insensitive link text to be destroyed.
		*
		* @param text The link text of the element.
		*/
	waitForDeletedByLinkText(text: string): Promise<void>;

	/**
		* Waits for all elements in the currently active window/frame partially matching the given case-insensitive link text to be
		* destroyed.
		*
		* @param text The partial link text of the element.
		*/
	waitForDeletedByPartialLinkText(text: string): Promise<void>;

	/**
		* Waits for all elements in the currently active window/frame matching the given HTML tag name to be destroyed.
		*
		* @param tagName The tag name of the element.
		*/
	waitForDeletedByTagName(tagName: string): Promise<void>;

	/**
		* Waits for all elements in the currently active window/frame matching the given XPath selector to be destroyed.
		*
		* @param path The XPath selector to search for.
		*/
	waitForDeletedByXpath(path: string): Promise<void>;

	/**
		* Gets the timeout for {@link module:leadfoot/Session#executeAsync} calls.
		*/
	getExecuteAsyncTimeout(): Promise<number>;

	/**
		* Sets the timeout for {@link module:leadfoot/Session#executeAsync} calls.
		*
		* @param ms The length of the timeout, in milliseconds.
		*/
	setExecuteAsyncTimeout(ms: number): Promise<number>;

	/**
		* Gets the timeout for {@link module:leadfoot/Session#find} calls.
		*/
	getFindTimeout(): Promise<number>;

	/**
		* Sets the timeout for {@link module:leadfoot/Session#find} calls.
		*
		* @param ms The length of the timeout, in milliseconds.
		*/
	setFindTimeout(ms: number): Promise<void>;

	/**
		* Gets the timeout for {@link module:leadfoot/Session#get} calls.
		*/
	getPageLoadTimeout(): Promise<number>;

	/**
		* Sets the timeout for {@link module:leadfoot/Session#get} calls.
		*
		* @param ms The length of the timeout, in milliseconds.
		*/
	setPageLoadTimeout(ms: number): Promise<void>;
}

export = Session;
