/**
 * @fileoverview This module provides RTCStats functionality for WebRTC connections.
 * It includes utilities for gathering, processing, and logging WebRTC statistics.
 */

/**
 * Imported constants and utility functions for RTC stats processing.
 */
import {
  TARGETS,
  CUMULATIVE_KEYS,
  KINDS_TO_KEEP,
  KEYS_TO_KEEP,
  TYPES_TO_KEEP,
  SSRC_TO_REMOVE,
  KEYS_TO_KEEP_AFTER_PER_SECOND_CALCULATIONS,
  SETTINGS,
} from './rtcStats/constants';
import {
  calculateSmoothness,
  filterPeriodMetrics,
  calculatePerSecondMetrics,
  updateCallTargets,
} from './rtcStats/rtcStatsUtils.js';
/**
 * @typedef {import('./rtcStats/rtcStatsUtils.js').RTCStatsReport} RTCStatsReport
 * @typedef {import('./rtcStats/rtcStatsUtils.js').RawReport} RawReport
 * @typedef {import('./rtcStats/rtcStatsUtils.js').FilteredReport} FilteredReport
 * @typedef {import('./rtcStats/rtcStatsUtils.js').PerSecondMetricsBeforeRemovingKeys} PerSecondMetricsBeforeRemovingKeys
 * @typedef {import('./rtcStats/rtcStatsUtils.js').PerSecondMetrics} PerSecondMetrics
 * @typedef {import('./rtcStats/rtcStatsUtils.js').PerSecondMetricsWithTargets} PerSecondMetricsWithTargets
 * @typedef {import('./rtcStats/rtcStatsUtils.js').PerSecondMetricsWithTargetsAndSmoothness} PerSecondMetricsWithTargetsAndSmoothness
 * @typedef {import('./rtcStats/rtcStatsUtils.js').StreamAverages} StreamAverages
 * @typedef {import('./rtcStats/rtcStatsUtils.js').StreamTargets} StreamTargets
 * @typedef {import('./rtcStats/rtcStatsUtils.js').MetricAverage} MetricAverage
 */

/**
 * @description Initializes and manages RTCStats functionality. This function sets up WebRTC statistics gathering and reporting.
 * @param {Object} config - Configuration options for RTCStats.
 * @param {string} config.test_id - Unique identifier for the test session.
 * @param {string} config.client_id - Identifier for the client.
 * @param {number} [config.report_interval=1] - Interval in seconds for gathering stats.
 * @param {number} [config.log_interval=5] - Interval in seconds for logging batched stats.
 */
export function rtcStats(config) {
  if (window.rtcstats) {
    console.warn('[RTCStats] Already declared');
    return;
  }
  window.rtcstats = this;

  const _config = {
    report_interval: 1,
    log_interval: 5,
    ...config,
  };

  /**
   * @description Array of peer connection reports.
   * @type {Array<{
   *   batch: Array<PerSecondMetricsWithTargetsAndSmoothness>,
   *   report_num: number,
   *   connection_id: string
   * }>}
   */
  const peerConns = [];

  /**
   * @description Array of call averages and targets for each peer connection.
   * @type {Array<{
   *   callAverages: Object.<string, StreamAverages>,
   *   callTargets: Object.<string, StreamTargets>
   * }>}
   */
  const callAveragesArray = []; // Needs to be an array because of the peer connections. By the end of this process, we filter out empty ones. So in that case, there might be only one object in the array. But if we use this for other providers who use multiple peer connections, or track outbound metrics, this array will have more objects.

  /**
   * @description Raw reports for each connection.
   * @type {Object.<string, RawReport>}
   */
  const rawReports = {};

  /**
   * @description Current filtered reports for each connection.
   * @type {Object.<string, Object.<string, FilteredReport>>}
   */
  const currentFilteredReports = {};

  /**
   * @description Previous filtered reports for each connection.
   * @type {Object.<string, Object.<string, FilteredReport>>}
   */
  const previousFilteredReports = {};

  /**
   * @description Current per-second report for each connection.
   * @type {Object.<string, Object.<string, PerSecondMetricsWithTargets>>}
   */
  const currentPerSecondReport = {};

  /**
   * @description Checks whether the object is empty.
   * @param {Object} obj - The object to check.
   * @returns {boolean} True if the object is empty, false otherwise.
   */
  const isObjectEmpty = (obj) => Object.keys(obj).length === 0;

  /**
   * @description Stores the collected RTC statistics data. Currently, this function only logs the data to the console. In a production environment, this would typically send the data to a server or persistent storage.
   * @param {Object} data - The RTC statistics data to be stored.
   */
  async function store(data) {
    console.info('[RTCStats] Logging data...', data);
    console.log(
      '[RTCStats] Logging data at the time...',
      structuredClone(data)
    );
    // Store report array here
  }

  /**
   * @description Collection of call averages and targets for each peer connection.
   * @typedef {Object} CallTargetCollection
   * @property {Object.<string, StreamAverages>} callAverages - Averaged metrics for all streams in a call.
   * @property {Object.<string, StreamTargets>} callTargets - Target metrics for all streams in a call.
   */

  /**
   * Logs the call's rolling averages and targets for each peer connection.
   * @param {CallTargetCollection[]} callTargetCollection - Array of call targets and averages for each peer connection.
   */
  async function logCallTarget(callTargetCollection) {
    callTargetCollection.forEach(({ callAverages, callTargets }) => {
      Object.keys(callAverages).forEach((id) => {
        updateCallTargets(callAverages, callTargets, TARGETS, id);
      });
    });

    /**
     * @description Final collection of call targets and averages for all peer connections. Includes the report number and test ID.
     * @typedef {Object} finalCallTargetCollection
     * @property {number} reportNum - The report number, initialized to 0 and incremented.
     * @property {string} test_id - The test ID from the configuration.
     * @property {Array<Object>} callTargetCollection - The processed collection of call targets and averages.
     */
    const finalCallTargetCollection = {
      reportNum: 0,
      test_id: _config.test_id,
      callTargetCollection,
    };
    finalCallTargetCollection.reportNum += 1;
    if (!isObjectEmpty(finalCallTargetCollection.callTargetCollection)) {
      await store(finalCallTargetCollection);
    }
  }

  /**
   * @typedef {Object.<string, PerSecondMetricsWithTargetsAndSmoothness>} BatchReport
   * A report containing metrics for multiple streams.
   */

  /**
   * Logs a batch of RTC statistics reports.
   * @param {BatchReport[]} batchCollection - Collection of batches of RTC statistics reports.
   * Each element in the array represents a separate batch of reports, typically one per peer connection.
   */
  async function logBatch(batchCollection) {

    /**
     * @type {Array<Object>}
     * @property {string} test_id - The test ID from the configuration.
     * @property {Object} data - The RTC statistics data for a single report.
     */
    const reportArray = batchCollection.flatMap((b) =>
      b.splice(0, b.length).map((data) => ({
        test_id: _config.test_id,
        data,
      }))
    );

    if (reportArray.length) {
      await store(reportArray);
    }
  }

  /**
   * Extends RTCPeerConnection to include RTC statistics gathering functionality.
   * This class overrides the standard RTCPeerConnection to automatically gather and process RTC stats.
   * @extends RTCPeerConnection
   */
  class RTCStatsPeerConnection extends RTCPeerConnection {
    /**
     * Creates an instance of RTCStatsPeerConnection.
     * @param {RTCConfiguration} config - The configuration for the RTCPeerConnection.
     */
    constructor(config) {
      super(config);

      /**
       * @type {Object}
       * @property {Array} batch - Array of RTC statistics reports.
       * @property {number} report_num - Number of reports generated.
       * @property {string} connection_id - Unique identifier for this connection.
       */
      this.report = {
        batch: [],
        report_num: 0,
        connection_id: crypto.randomUUID(),
      };

      /**
       * @type {Object}
       * @property {Array} smoothnessBuffer - Buffer for smoothness calculations.
       * @property {Object} callAverages - Averaged metrics for the call.
       * @property {Object} callTargets - Target metrics for the call.
       */
      this.calculations = {
        smoothnessBuffer: [],
        callAverages: {},
        callTargets: {},
      };

      // Add this peer connection's report to the global array of peer connection reports
      peerConns.push(this.report);

      // Add this peer connection's call averages and targets to the global array
      callAveragesArray.push({
        callAverages: this.calculations.callAverages,
        callTargets: this.calculations.callTargets,
      });

      console.warn('PeerConnection instantiated', this.report);

      this.addEventListener(
        'connectionstatechange',
        this.handleConnectionStateChange.bind(this)
      );
    }

    /**
     * Handles changes in the connection state of the peer connection.
     */
    handleConnectionStateChange() {
      clearInterval(this._statsInterval);

      if (this.connectionState === 'connected') {
        this._getStats(this.getStats());

        this._statsInterval = setInterval(() => {
          if (this.connectionState !== 'connected') {
            return clearInterval(this._statsInterval);
          }
          this._getStats(this.getStats());
        }, _config.report_interval * 1000);
      }
    }

    /**
     * Retrieves and processes RTC statistics.
     * @param {Promise<RTCStatsReport>} getStatsPromise - Promise that resolves to an RTCStatsReport.
     * @private
     */
    async _getStats(getStatsPromise) {

      const stats = await getStatsPromise;

      /**
       * @type {RTCStatsReport}
       */
      const rtcdata = Object.fromEntries(stats.entries());
      if (!rtcdata) return;


      /**
       * @type {FilteredReport} 
       */
      previousFilteredReports[this.report.connection_id] = {
        ...currentFilteredReports[this.report.connection_id],
      };


      /**
       * @type {Object.<string, RawReport>} Raw reports including client and test information.
       */
      rawReports[this.report.connection_id] = {
        clientId: _config.client_id,
        testId: _config.test_id,
        connectionId: this.report.connection_id,
        reportNum: this.report.report_num,
        ...rtcdata,
      };

      /**
       * @type {FilteredReport}
       */
      currentFilteredReports[this.report.connection_id] = filterPeriodMetrics(
        rawReports[this.report.connection_id],
        TYPES_TO_KEEP,
        KINDS_TO_KEEP,
        SSRC_TO_REMOVE,
        KEYS_TO_KEEP
      );


      /**
       * @type {PerSecondReport}
       */
      currentPerSecondReport[this.report.connection_id] =
        calculatePerSecondMetrics(
          currentFilteredReports[this.report.connection_id],
          previousFilteredReports[this.report.connection_id],
          CUMULATIVE_KEYS,
          KEYS_TO_KEEP_AFTER_PER_SECOND_CALCULATIONS,
          TARGETS,
          this.report.connection_id
        );

      if (!isObjectEmpty(currentPerSecondReport[this.report.connection_id])) {
        /**
         * @type {PerSecondMetrics[]}
         * Buffer of recent PerSecondReports used for smoothness calculations.
         * This buffer stores up to SETTINGS.frameRatePeriodChange number of reports.
         * When the buffer is full, the oldest report is removed (shifted) before adding a new one.
         */
        this.calculations.smoothnessBuffer.push(
          currentPerSecondReport[this.report.connection_id]
        );
        if (
          this.calculations.smoothnessBuffer.length >
          SETTINGS.frameRatePeriodChange
        ) {
          this.calculations.smoothnessBuffer.shift();
        }

        /**
         * Calculates smoothness metrics based on the smoothness buffer and other parameters.
         * @type {PerSecondMetricsWithTargetsAndSmoothness}
         */
        const metricsWithSmoothness = calculateSmoothness(
          this.calculations.smoothnessBuffer,
          SETTINGS.frameRatePeriodChange,
          SETTINGS.frameRateDelta,
          this.calculations.callAverages
        );
        this.report.batch.push(metricsWithSmoothness);
        this.report.report_num += 1;
      }
    }
  }

  if (!['test_id', 'client_id'].every((k) => k in _config)) {
    console.warn('[RTCStats] Missing config keys. Exiting');
  } else {
    console.info(`[RTCStats] Init with config:`, _config);
    RTCPeerConnection = RTCStatsPeerConnection;

    /**
     * Main logging interval.
     * This interval function runs every `log_interval` seconds to collect and log batched RTC statistics and call targets.
     * It's the primary mechanism for regularly gathering and storing RTC performance data.
     */
    setInterval(() => {
      if (peerConns.length) {

        /**
         * @typedef {Object.<string, PerSecondMetricsWithTargetsAndSmoothness>} BatchReport
         * A report containing metrics for multiple streams.
         */

        /**
         * @type {BatchReport[]}
         * Collection of batches, where each batch contains metrics for multiple streams.
         * Each element in the array represents a separate batch of reports.
         */
        const batchCollection = peerConns
          .filter((pc) => pc.batch.length)
          .map((pc) => pc.batch);


        /**
         * @typedef {Object} CallAveragesAndTargets
         * @property {Object.<string, StreamAverages>} callAverages - Averaged metrics for each stream.
         * @property {Object.<string, StreamTargets>} callTargets - Target metrics for each stream.
         */

        /**
         * @type {CallAveragesAndTargets[]}
         * Collection of call averages and targets for each peer connection.
         * Each element in the array represents averages and targets for a single peer connection.
         */
        const callTargetCollection = callAveragesArray.filter(
          (ca) => Object.keys(ca.callAverages).length
        );
        if (batchCollection.length) {
          logBatch(batchCollection);
          logCallTarget(callTargetCollection);
        }
      }
    }, _config.log_interval * 1000);
  }
}
