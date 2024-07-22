<!-- @format -->

# RTCStats

## How it works

This script acts a shim over the browser's default RTCPeerConnection object.

It periodically (set with the config option `report_interval`) retrieves WebRTC native `getStats()` data and holds a reference to it internally.

Asychronously, this script will run a collection interval (`log_interval`) to retrieve all reports from each active RTCPeerConnection and send the batch to `store()` method.

For each report, it will also assign both a test and client identifier, as well as a report number to help align the results as a pseudo timeseries.

## Usage

### API

- `test_id`: Test identifer that stats are recorded with. Change this for each test you run.
- `client_id`: unique identifer to each connected peer. Leave blank for a random UUID.
- `report_interval`: Interval at which each peer connection create a stats report. Defaults to 1 second.
- `log_interval`: Interval at which the script will log / store data. Defaults to 5 seconds.

Add this to your project like so:

```js
import { rtcStats } from "../app/rtcStats";

useEffect(() => {
	const config = {
		test_id: crypto.randomUUID(),
		client_id: crypto.randomUUID(),
	};
	console.info("Adding rtcstats script to page", config);
	rtcStats(config);
}, [config]);
```

## Storing data

`rtcStats.js` has a store method that defaults to a noop / console.log.

Override this method to store data to your backend of choice, e.g. SQLLite

## Adjusting settings

When you initialise rtcStats, you have to pass through a config with a test_id and a client_id.
Other than that, all other settings are in the constants javascript file. This is where you specify
what metrics to transform from cumulative to per second metrics, etc.

## Building

If you have made changes to the script and would like create a new bundle, please run ESBuild:

```js
npm run build
```

A new bundle will be available in the `/build` folder, which can be added to your project.

Please note: you do not need to build this project. You can import the index.js into your script instead (no minification or sourcemaps)

---

Got questions? Pop over to our Discord at https://discord.gg/dailyco
