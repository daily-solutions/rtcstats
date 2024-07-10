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

```html
<script src="build/rtcstats.js" type="text/javascript" test_id="DailyTest" async></script>
```

... or if using React:

```js
useEffect(() => {
    console.info('Adding rtcstats script to page', config);
    const script = document.createElement('script');
    script.dataset.clientid = crypto.randomUUID();
    script.dataset.testid = config.testId;
    script.src = '/stats.js';
    script.async = true;
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, [config, region]);

```

## Storing data

`index.js` has a store method that defaults to a noop / console.log.

Override this method to store data to your backend of choice, e.g. SQLLite


## Building

If you have made changes to the script and would like create a new bundle, please run ESBuild:

```js
npm run build
```

A new bundle will be available in the `/build` folder, which can be added to your project.

Please note: you do not need to build this project. You can import the index.js into your script instead (no minification or sourcemaps)

---

Got questions? Pop over to our Discord at https://discord.gg/dailyco