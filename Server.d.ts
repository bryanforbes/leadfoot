import * as leadfoot from './typedefs';

import Promise = require('dojo/Promise');
import Session = require('./Session');

/**
	* The Server class represents a remote HTTP server implementing the WebDriver wire protocol that can be used to
	* generate new remote control sessions.
	*/
declare class Server {
	/**
		* @param url
		* The fully qualified URL to the JsonWireProtocol endpoint on the server. The default endpoint for a
		* JsonWireProtocol HTTP server is http://localhost:4444/wd/hub. You may also pass a parsed URL object which will
		* be converted to a string.
		*/
	constructor(url: {} | string);

	/**
		* An alternative session constructor. Defaults to the standard {@link module:leadfoot/Session} constructor if
		* one is not provided.
		*/
	sessionConstructor: typeof Session;

	/**
		* Whether or not to perform capabilities testing and correction when creating a new Server.
		*
		* @default true
		*/
	fixSessionCapabilities: boolean;

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
		* Gets the status of the remote server.
		*
		* @returns An object containing arbitrary properties describing the status of the remote
		* server.
		*/
	getStatus(): Promise<{}>;

	/**
		* Creates a new remote control session on the remote server.
		*
		* @param desiredCapabilities
		* A hash map of desired capabilities of the remote environment. The server may return an environment that does
		* not match all the desired capabilities if one is not available.
		*
		* @param requiredCapabilities
		* A hash map of required capabilities of the remote environment. The server will not return an environment that
		* does not match all the required capabilities if one is not available.
		*/
	createSession(desiredCapabilities: leadfoot.Capabilities, requiredCapabilities?: leadfoot.Capabilities): Promise<Session>;

	/**
		* Adds additional capabilities data on the `capabilities` key of the passed session.
		*/
	protected _fillCapabilities(session: Session): Session;

	/**
		* Gets a list of all currently active remote control sessions on this server.
		*
		* @returns {Promise.<Object[]>}
		*/
	getSessions(): Promise<{}[]>;

	/**
		* Gets information on the capabilities of a given session from the server. The list of capabilities returned
		* by this command will not include any of the extra session capabilities detected by Leadfoot and may be
		* inaccurate.
		*
		* @param sessionId
		*/
	getSessionCapabilities(sessionId: string): Promise<leadfoot.Capabilities>;

	/**
		* Terminates a session on the server.
		*
		* @param sessionId
		*/
	deleteSession(sessionId: string): Promise<void>;
}

export = Server;
