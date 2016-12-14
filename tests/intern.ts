export const capabilities = {
	'selenium-version': '2.43.0',
	'idle-timeout': 30
};

export const environments = [
	{ browserName: 'microsoftedge', fixSessionCapabilities: false },
	{ browserName: 'internet explorer', version: '11', platform: 'WIN8', fixSessionCapabilities: false },
	{ browserName: 'internet explorer', version: '10', platform: 'WIN8', fixSessionCapabilities: false },
	{ browserName: 'internet explorer', version: '9', platform: 'WINDOWS', fixSessionCapabilities: false },
	{ browserName: 'firefox', version: '33', platform: [ 'WINDOWS', 'MAC' ], fixSessionCapabilities: false },
	{ browserName: 'chrome', version: '38', platform: [ 'WINDOWS', 'MAC' ], fixSessionCapabilities: false },
	{ browserName: 'safari', version: '9', platform: 'MAC', fixSessionCapabilities: false }
];

export const maxConcurrency = 2;
export const tunnel = 'BrowserStackTunnel';

export const loaderOptions = {
	packages: [
		{ name: 'leadfoot', location: '_build/src' },
		{ name: 'tests', location: '_build/tests' },
		{ name: 'dojo', location: 'node_modules/dojo'}
	]
};

export const loaders = {
	'host-node': 'dojo-loader'
};

export const suites = [
	'tests/nodeSuite!unit/lib/util',
	'tests/nodeSuite!unit/compat'
];

export const functionalSuites = [
	'tests/nodeSuite!functional/helpers/pollUntil',
	'tests/nodeSuite!functional/Server',
	'tests/nodeSuite!functional/Session',
	'tests/nodeSuite!functional/Element',
	'tests/nodeSuite!functional/Command',
	'tests/nodeSuite!functional/compat'
];

export const excludeInstrumentation = /^(?:tests|node_modules)\//;
