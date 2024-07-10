(function () {
  if (window.rtcstats) {
    console.warn("[RTCStats] Already declared");
    return;
  }

  window.rtcstats = this;

  // Test ID and Client IDs to help make the data identifiable
  const test_id =
    document.currentScript.getAttribute("test_id") || crypto.randomUUID();
  const client_id =
    document.currentScript.getAttribute("client_id") || crypto.randomUUID();
  // How often each peer connection will generate stats
  const report_interval =
    document.currentScript.getAttribute("report_interval") || 1;
  // How often this script will log data
  const log_interval = document.currentScript.getAttribute("log_interval") || 5;

  const _config = {
    report_interval: report_interval,
    log_interval: write_interval,
    test_id,
    client_id,
  };

  // Reference all active WebRTC peer connections
  const peerConns = [];

  async function store(reportArray) {
    console.info("RTCStats] Logging data...", reportArray);
    // Store report array here
  }

  async function logBatch(batchCollection) {
    // Note: async function so main event loop is kept unblocked
    const reportArray = [];
    batchCollection.forEach((b) => {
      // grab the reports and empty the array (batch is cleared)
      const reports = b.splice(0, b.length).forEach((data) =>
        reportArray.push({
          test_id: _config.test_id,
          data,
        })
      );
    });

    if (!reportArray.length) {
      return;
    }

    store(reportArray);
  }

  /**
   * -----------------------
   * RTCPeerConnection shim
   * -----------------------
   */
  class RTCStatsPeerConnection extends RTCPeerConnection {
    constructor(config) {
      super();

      // Init
      this.batch = []; // Array of reports collected
      this.report_num = 0; // Current tick for timeseries
      this.connection_id = crypto.randomUUID();

      // Append to global array
      peerConns.push(this);

      console.warn("PeerConnection instantiated", this);

      // Listen for connection state, start harvesting when connected
      this.addEventListener("connectionstatechange", () => {
        clearInterval(this._statsInterval);

        if (this.connectionState === "connected") {
          this._getStats(this.getStats());

          // Start collecting data every TICK...
          this._statsInterval = setInterval(() => {
            if (this.connectionState !== "connected")
              return clearInterval(this._statsInterval);

            // Run an override of the getStats method
            this._getStats(this.getStats());
          }, _config.report_interval * 1000);
        }
      });
    }

    async _getStats(getStatsPromise) {
      const stats = await getStatsPromise;
      const rtcdata = Object.fromEntries(stats.entries());

      if (!rtcdata) return;

      this.batch.push({
        clientId: _config.client_id,
        testId: _config.test_id,
        connectionId: this.connection_id,
        reportNum: this.report_num,
        ...rtcdata,
      });

      // Increment report number for timeseries
      this.report_num += 1;
    }
  }

  /**
   * -----------------------
   * Init method
   * -----------------------
   */
  if (!["test_id", "client_id"].every((k) => k in _config)) {
    console.warn("[RTCStats] Missing config keys. Exiting");
  } else {
    console.info(`[RTCStats] Init with config:`, _config);
    RTCPeerConnection = RTCStatsPeerConnection;

    // Main write interval
    setInterval(() => {
      if (!peerConns.length) {
        // No connected peers, do nothing
        return;
      }
      // Create a batch of reports from each peer connection
      const batchCollection = peerConns
        .filter((pc) => pc.batch.length) // filter out PeerConnections with empty batches (no reports)
        .map((pc) => pc.batch); // return the batch array containing all the reports (arbitrary amount)
      if (batchCollection.length) {
        logBatch(batchCollection);
      }
    }, _config.log_interval * 1000);
  }
})();
