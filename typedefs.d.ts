/**
 * An error from the remote WebDriver server.
 */
export interface WebDriverError extends Error {
	/**
	 * The human-readable error type returned by the WebDriver server. See {@link module:leadfoot/lib/statusCodes} for a
	 * list of error types.
	 */
	name: string;

	/**
	 * A human-readable message describing the error.
	 */
	message: string;

	/**
	 * The raw error status code returned by the WebDriver server.
	 */
	status: number;

	/**
	 * The raw detail of the error returned by the WebDriver server.
	 */
	detail: any;

	/**
	 * The parameters for the request.
	 */
	request: {
		url: string;
		method: string;
		requestData: {};
	};

	/**
	 * The response object for the request.
	 */
//	response: request.IResponse;
	response: any;

	/**
	 * The stack trace for the request.
	 */
	stack: string;
}

/**
 * An object that describes an HTTP cookie.
 */
export interface WebDriverCookie {
	/**
	 * The name of the cookie.
	 */
	name: string;

	/**
	 * The value of the cookie.
	 */
	value: string;

	/**
	 * The registered path for the cookie.
	 */
	path: string;

	/**
	 * The registered domain for the cookie.
	 */
	domain: string;

	/**
	 * True if the cookie should only be transmitted over HTTPS.
	 */
	secure: boolean;

	/**
	 * True if the cookie should be inaccessible to client-side scripting.
	 */
	httpOnly: boolean;

	/**
	 * The expiration date of the cookie.
	 */
	expiry: Date;
}

/**
 * An object that describes a geographical location.
 */
export interface Geolocation {
	/**
	 * Latitude in WGS84 decimal coordinate system.
	 */
	latitude: number;

	/**
	 * Longitude in WGS84 decimal coordinate system.
	 */
	longitude: number;

	/**
	 * Altitude in meters above the WGS84 ellipsoid.
	 */
	altitude: number;
}

/**
 * A remote log entry.
 */
export interface LogEntry {
	/**
	 * The timestamp of the entry in seconds since unix epoch.
	 */
	timestamp: number;

	/**
	 * The severity level of the entry. This level is not currently normalised.
	 */
	level: string;

	/**
	 * The log entry message.
	 */
	message: string;
}

/**
 * A list of possible capabilities for a remote WebDriver environment.
 */
export interface Capabilities {
	/**
	 * Environments with this capability expose the state of the browser’s offline application cache via the WebDriver API.
	 */
	applicationCacheEnabled?: boolean;

	/**
	 * Environments with this capability are incapable of clearing or deleting cookies. This issue cannot be worked around.
	 */
	brokenCookies?: boolean;

	/**
	 * Environments with this capability do not correctly retrieve the size of a CSS transformed element. This issue is
	 * automatically corrected.
	 */
	brokenCssTransformedSize?: boolean;

	/**
	 * Environments with this capability do not correctly delete cookies. This issue is automatically corrected for cookies
	 * that are accessible via JavaScript.
	 */
	brokenDeleteCookie?: boolean;

	/**
	 * Environments with this capability do not follow the correct event order when double-clicking. This issue is
	 * automatically corrected.
	 */
	brokenDoubleClick?: boolean;

	/**
	 * Environments with this capability return invalid element handles from execute functions. This issue cannot be worked
	 * around.
	 */
	brokenExecuteElementReturn?: boolean;

	/**
	 * Environments with this capability claim fully transparent elements are non-hidden. This issue is automatically
	 * corrected.
	 */
	brokenElementDisplayedOpacity?: boolean;

	/**
	 * Environments with this capability claim elements positioned offscreen to the top/left of the page are non-hidden.
	 * This issue is automatically corrected.
	 */
	brokenElementDisplayedOffscreen?: boolean;

	/**
	 * Environments with this capability do not correctly retrieve the position of a CSS transformed element. This issue is
	 * automatically corrected.
	 */
	brokenElementPosition?: boolean;

	/**
	 * Environments with this capability do not operate correctly when the `flickFinger` method is called. This issue cannot
	 * be corrected.
	 */
	brokenFlickFinger?: boolean;

	/**
	 * Environments with this capability return HTML tag names with the incorrect case. This issue is automatically
	 * corrected.
	 */
	brokenHtmlTagName?: boolean;

	/**
	 * Environments with this capability fail to perform long tap gestures. This issue is not currently corrected.
	 */
	brokenLongTap?: boolean;

	/**
	 * Environments with this capability have broken mouse event APIs. This issue is automatically corrected as much as
	 * possible through JavaScript-based event emulation.
	 */
	brokenMouseEvents?: boolean;

	/**
	 * Environments with this capability do not support dragging fingers across the page. This issue is not currently
	 * corrected.
	 */
	brokenMoveFinger?: boolean;

	/**
	 * Environments with this capability do not support browser navigation functions (back, forward, refresh). This issue
	 * cannot be corrected.
	 */
	brokenNavigation?: boolean;

	/**
	 * Environments with this capability incorrectly return an empty string instead of `null` for attributes that do not
	 * exist when using the `getSpecAttribute` retrieval method. This issue is automatically corrected.
	 */
	brokenNullGetSpecAttribute?: boolean;

	/**
	 * Environments with this capability fail to complete calls to refresh a page through the standard WebDriver API. This
	 * issue is automatically corrected.
	 */
	brokenRefresh?: boolean;

	/**
	 * Environments with this capability have broken keyboard event APIs. This issue is automatically corrected as much as
	 * possible through JavaScript-based event emulation.
	 */
	brokenSendKeys?: boolean;

	/**
	 * Environments with this capability incorrectly omit the key/value of the button being submitted. This issue is
	 * automatically corrected.
	 */
	brokenSubmitElement?: boolean;

	/**
	 * Environments with this capability do not operate correctly when the `touchScroll` method is called. This issue is
	 * automatically corrected.
	 */
	brokenTouchScroll?: boolean;

	/**
	 * Environments with this capability cannot switch between windows. This issue cannot be corrected.
	 */
	brokenWindowSwitch?: boolean;

	/**
	 * Environments with this capability break when `setWindowPosition` is called. This issue cannot be corrected.
	 */
	brokenWindowPosition?: boolean;

	/**
	 * The name of the current environment.
	 */
	browserName: string;

	/**
	 * Environments with this capability can use CSS selectors to find elements.
	 */
	cssSelectorsEnabled?: boolean;

	/**
	 * Environments with this capability have viewports that can be resized.
	 */
	dynamicViewport?: boolean;

	/**
	 * Environments with this capability break when the `getLogTypes` method is called. The list of log types provided here
	 * are used in lieu of the values provided by the server when calling `getLogTypes`.
	 */
	fixedLogTypes?: boolean | string[];

	/**
	 * Environments with this capability have JavaScript enabled. Leadfoot does not operate in environments without
	 * JavaScript.
	 */
	javascriptEnabled?: boolean;

	/**
	 * Environments with this capability allow the geographic location of the browser to be set and retrieved using the
	 * WebDriver API.
	 */
	locationContextEnabled?: boolean;

	/**
	 * Environments with this capability support interaction via mouse commands.
	 */
	mouseEnabled?: boolean;

	/**
	 * Environments with this capability use platform native events instead of emulated events.
	 */
	nativeEvents?: boolean;

	/**
	 * The name of the platform on which the current environment is running.
	 */
	platform: string;

	/**
	 * Environments with this capability allow the rotation of the device to be set and retrieved using the WebDriver API.
	 */
	rotatable?: boolean;

	/**
	 * The special key that is used by default on the given platform to perform keyboard shortcuts.
	 */
	shortcutKey?: string;

	/**
	 * Environments with this capability support CSS transforms.
	 */
	supportsCssTransforms?: boolean;

	/**
	 * Environments with this capability support asynchronous JavaScript execution.
	 */
	supportsExecuteAsync?: boolean;

	/**
	 * Environments with this capability support navigation to `data:` URIs.
	 */
	supportsNavigationDataUris?: boolean;

	/** {boolean} takesScreenshot
	 * Environments with this capability allow screenshots of the current screen to be taken.
	 */
	takesScreenshot?: boolean;

	/**
	 * Environments with this capability support interaction via touch commands.
	 */
	touchEnabled?: boolean;

	/**
	 * The version number of the current environment.
	 */
	version: string;

	/**
	 * Environments with this capability allow local storage and session storage to be set and retrieved using the
	 * WebDriver API.
	 */
	webStorageEnabled?: boolean;
}
