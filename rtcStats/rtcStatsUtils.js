/**
 * @description Below is an example of the RTCStatsReport object. Key names will change based on ssrcs etc. Each keys value is an object with various statistics.
 * @typedef {Object} RTCStatsReport
 * @property {Object} AP - Media playout statistics
 * @property {Object} CF59:FE:36:75:A6:2E:54:91:ED:13:62:F2:0D:C9:03:83:57:14:B3:EF:DA:F3:54:A9:DB:27:27:E9:06:19:3F:BC - Certificate information
 * @property {Object} CFD7:5C:4C:5E:2C:C2:56:AD:C5:A6:00:38:60:97:59:02:3A:0A:6E:43 - Certificate information
 * @property {Object} CIT01_100_minptime=10;useinbandfec=1 - Codec information
 * @property {Object} CIT01_101 - Codec information
 * @property {Object} CPMzLZhBL7_Abq03s0L - Candidate pair information
 * @property {Object} CPe/uLRNvM_ka6XMIpE - Candidate pair information
 * @property {Object} I+JkIf3zb - Local candidate information
 * @property {Object} IAbq03s0L - Remote candidate information
 * @property {Object} IMzLZhBL7 - Local candidate information
 * @property {Object} IT01A137677776 - Inbound RTP statistics (audio)
 * @property {Object} IT01A178402963 - Inbound RTP statistics (audio)
 * @property {Object} IT01V1234 - Inbound RTP statistics (video)
 * @property {Object} IT01V564912016 - Inbound RTP statistics (video)
 * @property {Object} IT01V814976811 - Inbound RTP statistics (video)
 * @property {Object} Ie/uLRNvM - Local candidate information
 * @property {Object} Ika6XMIpE - Remote candidate information
 * @property {Object} P - Peer connection information
 * @property {Object} ROA137677776 - Remote outbound RTP statistics (audio)
 * @property {Object} ROA178402963 - Remote outbound RTP statistics (audio)
 * @property {Object} ROV564912016 - Remote outbound RTP statistics (video)
 * @property {Object} ROV814976811 - Remote outbound RTP statistics (video)
 * @property {Object} T01 - Transport statistics
 */

/**
 * @typedef {Object} RawReport
 * @property {string} clientId - Unique identifier for the client.
 * @property {string} testId - Unique identifier for the test.
 * @property {string} connectionId - Unique identifier for the connection.
 * @property {number} reportNum - The report number.
 * @property {RTCStatsReport} rtcdata - The RTC statistics data.
 */


/**
 * @typedef {Object} FilteredReport
 * @description Filtered reports containing only specified types, kinds, and keys. The keys are typically SSRC identifiers (e.g., "IT01V564912016", "IT01V814976811").
 * @property {string} id - Unique identifier for the report.
 * @property {number} timestamp - Timestamp of the report.
 * @property {string} type - Type of the report (e.g., "inbound-rtp").
 * @property {string} kind - Kind of media (e.g., "video").
 * @property {number} ssrc - Synchronization Source identifier.
 * @property {string} transportId - Transport identifier.
 * @property {number} framesDecoded - Number of frames decoded.
 * @property {number} freezeCount - Number of freezes.
 * @property {number} frameHeight - Height of the video frame.
 * @property {number} bytesReceived - Number of bytes received.
 * @property {number} totalFreezesDuration - Total duration of freezes.
 */

/**
 * @typedef {Object} PerSecondMetricsBeforeRemovingKeys
 * @description Calculated per-second metrics for each stream. The keys are typically SSRC identifiers (e.g., "IT01V564912016", "IT01V814976811").
 * @property {string} id - Unique identifier for the report.
 * @property {number} timestamp - Timestamp of the report.
 * @property {string} type - Type of the report (e.g., "inbound-rtp").
 * @property {string} kind - Kind of media (e.g., "video").
 * @property {number} ssrc - Synchronization Source identifier.
 * @property {string} transportId - Transport identifier.
 * @property {number} framesDecoded - Number of frames decoded.
 * @property {number} freezeCount - Number of freezes.
 * @property {number} frameHeight - Height of the video frame.
 * @property {number} bytesReceived - Number of bytes received.
 * @property {number} totalFreezesDuration - Total duration of freezes.
 * @property {number} framesDecodedPerSecond - Number of frames decoded per second.
 * @property {number} freezeCountPerSecond - Number of freezes per second.
 * @property {number} totalFreezesDurationPerSecond - Total duration of freezes per second.
 */

/**
 * @typedef {Object} PerSecondMetrics
 * @property {string} connection_id - Unique identifier for the connection.
 * @property {string} id - Unique identifier for the stream.
 * @property {number} timestamp - Timestamp of the report.
 * @property {string} type - Type of the report (e.g., "inbound-rtp").
 * @property {string} kind - Kind of media (e.g., "video").
 * @property {number} ssrc - Synchronization Source identifier.
 * @property {string} transportId - Transport identifier.
 * @property {number} frameHeight - Height of the video frame.
 * @property {number} framesDecodedPerSecond - Number of frames decoded per second.
 * @property {number} freezeCountPerSecond - Number of freezes per second.
 * @property {number} totalFreezesDurationPerSecond - Total duration of freezes per second.
 */

/**
* @typedef {Object} PerSecondMetricsWithTargets
* @property {string} connection_id - Unique identifier for the connection.
* @property {string} id - Unique identifier for the stream.
* @property {number} timestamp - Timestamp of the report.
* @property {string} type - Type of the report (e.g., "inbound-rtp").
* @property {string} kind - Kind of media (e.g., "video").
* @property {number} ssrc - Synchronization Source identifier.
* @property {string} transportId - Transport identifier.
* @property {number} frameHeight - Height of the video frame.
* @property {number} framesDecodedPerSecond - Number of frames decoded per second.
* @property {number} freezeCountPerSecond - Number of freezes per second.
* @property {number} totalFreezesDurationPerSecond - Total duration of freezes per second.
* @property {number} frameHeightTargetPct - Percentage of target frame height achieved.
* @property {number} framesDecodedPerSecondTargetPct - Percentage of target frames decoded per second achieved.
* @property {number} freezeCountPerSecondTargetPct - Percentage of target freeze count per second.
* @property {number} totalFreezesDurationPerSecondTargetPct - Percentage of target total freeze duration per second.
*/

/**
* @typedef {Object} PerSecondMetricsWithTargetsAndSmoothness
* @property {string} connection_id - Unique identifier for the connection.
* @property {string} id - Unique identifier for the stream.
* @property {number} timestamp - Timestamp of the report.
* @property {string} type - Type of the report (e.g., "inbound-rtp").
* @property {string} kind - Kind of media (e.g., "video").
* @property {number} ssrc - Synchronization Source identifier.
* @property {string} transportId - Transport identifier.
* @property {number} frameHeight - Height of the video frame.
* @property {number} framesDecodedPerSecond - Number of frames decoded per second.
* @property {number} freezeCountPerSecond - Number of freezes per second.
* @property {number} totalFreezesDurationPerSecond - Total duration of freezes per second.
* @property {number} frameHeightTargetPct - Percentage of target frame height achieved.
* @property {number} framesDecodedPerSecondTargetPct - Percentage of target frames decoded per second achieved.
* @property {number} freezeCountPerSecondTargetPct - Percentage of target freeze count per second.
* @property {number} totalFreezesDurationPerSecondTargetPct - Percentage of target total freeze duration per second.
* @property {number} smoothness - Smoothness metric.
*/

/**
 * @typedef {Object} MetricAverage
 * @property {number} sum - Sum of all values.
 * @property {number} count - Number of values.
 * @property {number} avg - Average value.
 */

/**
 * @typedef {Object} StreamAverages
 * @property {number} reportNum - Number of reports.
 * @property {MetricAverage} frameHeight - Frame height metrics.
 * @property {MetricAverage} framesDecodedPerSecond - Frames decoded per second metrics.
 * @property {MetricAverage} freezeCountPerSecond - Freeze count per second metrics.
 * @property {MetricAverage} totalFreezesDurationPerSecond - Total freeze duration per second metrics.
 * @property {MetricAverage} smoothness - Smoothness metrics.
 */

/**
 * @typedef {Object} StreamTargets
 * @property {number} reportNum - Number of reports.
 * @property {number} frameHeightTargetPct - Frame height target percentage.
 * @property {number} framesDecodedPerSecondTargetPct - Frames decoded per second target percentage.
 * @property {number} freezeCountPerSecondTargetPct - Freeze count per second target percentage.
 * @property {number} totalFreezesDurationPerSecondTargetPct - Total freeze duration per second target percentage.
 * @property {number} smoothnessTargetPct - Smoothness target percentage.
 */


/**
 * @description Filters metrics for a given period based on specified criteria.
 * @param {RawReport} currentPeriod - Current period's raw metrics.
 * @param {string[]} TYPES_TO_KEEP - Types of metrics to retain (e.g., ['inbound-rtp']).
 * @param {string[]} KINDS_TO_KEEP - Kinds of metrics to retain (e.g., ['video']).
 * @param {number[]} SSRC_TO_REMOVE - SSRC values to exclude.
 * @param {string[]} KEYS_TO_KEEP - Specific keys to keep in the filtered metrics.
 * @returns {Object.<string, FilteredReport>} Filtered metrics for each stream.
 */
export const filterPeriodMetrics = (
  currentPeriod,
  TYPES_TO_KEEP,
  KINDS_TO_KEEP,
  SSRC_TO_REMOVE,
  KEYS_TO_KEEP
) =>
  Object.entries(currentPeriod).reduce((acc, [key, metric]) => {
    if (
      !TYPES_TO_KEEP.includes(metric.type) ||
      (metric.kind && !KINDS_TO_KEEP.includes(metric.kind)) ||
      (metric.ssrc && SSRC_TO_REMOVE.includes(metric.ssrc))
    ) {
      return acc;
    }

    acc[key] = KEYS_TO_KEEP.reduce((filteredMetric, keyToKeep) => {
      if (metric[keyToKeep] !== undefined) {
        filteredMetric[keyToKeep] = metric[keyToKeep];
      }
      return filteredMetric;
    }, {});

    return acc;
  }, {});

/**
 * @description Calculates per-second metrics based on current and previous period data.
 * @param {Object.<string, FilteredReport>} currentPeriod - Current period's metrics, keyed by SSRC.
 * @param {Object.<string, FilteredReport>} previousPeriod - Previous period's metrics, keyed by SSRC.
 * @param {string[]} CUMULATIVE_KEYS - Keys for cumulative metrics (e.g., ['framesDecoded', 'freezeCount']).
 * @param {string[]} KEYS_TO_KEEP_AFTER_PER_SECOND_CALCULATIONS - Keys to retain after calculations.
 * @param {Object} TARGETS - Target values for various metrics (e.g., {frameHeight: 720, framesDecodedPerSecond: 30}).
 * @param {string} connection_id - Unique identifier for the connection.
 * @returns {PerSecondReport} Calculated per-second metrics for each stream.
 */
export const calculatePerSecondMetrics = (
  currentPeriod,
  previousPeriod,
  CUMULATIVE_KEYS,
  KEYS_TO_KEEP_AFTER_PER_SECOND_CALCULATIONS,
  TARGETS,
  connection_id
) => {
  const perSecondMetrics = Object.entries(currentPeriod).reduce(
    (acc, [key, current]) => {
      const previous = previousPeriod[key];
      let perSecondMetric = {};

      if (previous) {
        const deltaTime = (current.timestamp - previous.timestamp) / 1000;

        if (deltaTime > 0) {
          CUMULATIVE_KEYS.forEach((metricKey) => {
            if (
              current[metricKey] !== undefined &&
              previous[metricKey] !== undefined
            ) {
              perSecondMetric[`${metricKey}PerSecond`] =
                (current[metricKey] - previous[metricKey]) / deltaTime;
            }
          });
        }
      } else {
        CUMULATIVE_KEYS.forEach((metricKey) => {
          if (current[metricKey] !== undefined) {
            perSecondMetric[`${metricKey}PerSecond`] = current[metricKey];
          }
        });
      }

      acc[key] = {
        connection_id: connection_id,
        ...removeKeysAfterPerSecondCalculations(
          current,
          KEYS_TO_KEEP_AFTER_PER_SECOND_CALCULATIONS
        ),
        ...perSecondMetric,
      };

      return acc;
    },
    {}
  );

  return calculatePerPeriodTargets(perSecondMetrics, TARGETS);
};

/**
 * @description Removes specified keys from metrics after per-second calculations.
 * @param {PerSecondMetricsBeforeRemovingKeys} metrics - The metrics object to filter.
 * @param {string[]} KEYS_TO_KEEP_AFTER_PER_SECOND_CALCULATIONS - Keys to retain.
 * @returns {PerSecondMetrics} Filtered metrics object with only specified keys.
 */
const removeKeysAfterPerSecondCalculations = (
  metrics,
  KEYS_TO_KEEP_AFTER_PER_SECOND_CALCULATIONS
) =>
  KEYS_TO_KEEP_AFTER_PER_SECOND_CALCULATIONS.reduce((acc, key) => {
    if (metrics.hasOwnProperty(key)) {
      acc[key] = metrics[key];
    }
    return acc;
  }, {});



/**
 * @description Calculates target percentages for each metric in the given period.
 * @param {PerSecondMetrics} metrics - The per-second metrics for each stream.
 * @param {Object} TARGETS - Target values for various metrics.
 * @property {number} TARGETS.frameHeight - Target frame height.
 * @property {number} TARGETS.framesDecodedPerSecond - Target frames decoded per second.
 * @property {number} TARGETS.freezeCountPerSecond - Target freeze count per second.
 * @property {number} TARGETS.totalFreezesDurationPerSecond - Target total freeze duration per second.
 * @returns {PerSecondMetricsWithTargets} Metrics object with calculated target percentages added.
 */
const calculatePerPeriodTargets = (metrics, TARGETS) =>
  Object.entries(metrics).reduce((acc, [key, value]) => {
    acc[key] = Object.entries(TARGETS).reduce(
      (targets, [targetKey, targetValue]) => {
        const metricKey = targetKey.replace('Target', '');
        if (value.hasOwnProperty(metricKey)) {
          targets[`${metricKey}TargetPct`] =
            (value[metricKey] / targetValue) * 100;
        }
        return targets;
      },
      value
    );
    return acc;
  }, {});

/**
 * @description Calculates smoothness based on a buffer of recent metrics.
 * @param {[PerSecondMetrics]} smoothnessBuffer - Buffer of recent per-second metrics.
 * @param {number} frameRatePeriodChange - Number of periods to consider for frame rate change.
 * @param {number} frameRateDelta - Threshold for frame rate change.
 * @param {Object.<string, StreamAverages>} callAverages - Ongoing averages for various metrics, keyed by stream ID.
 * @returns {PerSecondMetricsWithTargetsAndSmoothness} Metrics with calculated smoothness for each stream.
 */
export const calculateSmoothness = (
  smoothnessBuffer,
  frameRatePeriodChange,
  frameRateDelta,
  callAverages
) => {
  if (smoothnessBuffer.length < frameRatePeriodChange) {
    return smoothnessBuffer[smoothnessBuffer.length - 1];
  }

  const mostRecentPeriod = smoothnessBuffer[smoothnessBuffer.length - 1];
  const otherPeriod =
    smoothnessBuffer[smoothnessBuffer.length - frameRatePeriodChange];

  return Object.entries(mostRecentPeriod).reduce((acc, [key, recentValue]) => {
    if (otherPeriod.hasOwnProperty(key)) {
      const frameRateDeltaMetric = Math.abs(
        recentValue.framesDecodedPerSecond -
        otherPeriod[key].framesDecodedPerSecond
      );
      const smoothness = frameRateDeltaMetric >= frameRateDelta ? 0 : 100;
      const id = recentValue.id;

      acc[key] = {
        ...recentValue,
        smoothness: smoothness,
      };

      if (!callAverages[id]) {
        callAverages[id] = {
          reportNum: 0,
          frameHeight: { sum: 0, count: 0, avg: 0 },
          framesDecodedPerSecond: { sum: 0, count: 0, avg: 0 },
          freezeCountPerSecond: { sum: 0, count: 0, avg: 0 },
          totalFreezesDurationPerSecond: { sum: 0, count: 0, avg: 0 },
          smoothness: { sum: 0, count: 0, avg: 0 },
        };
      }

      updateCallAverages(acc[key], callAverages, id);
    }
    return acc;
  }, {});
};

/**
 * @description Updates running averages for call metrics.
 * @param {PerSecondMetricsWithTargetsAndSmoothness} metrics - Current period metrics for a single stream.
 * @param {Object.<string, StreamAverages>} callAverages - Object storing running averages for all streams.
 * @param {string} id - Unique identifier for the stream.
 */
const updateCallAverages = (metrics, callAverages, id) => {
  const metricsToUpdate = [
    'frameHeight',
    'framesDecodedPerSecond',
    'freezeCountPerSecond',
    'totalFreezesDurationPerSecond',
    'smoothness',
  ];
  callAverages[id].reportNum += 1;

  metricsToUpdate.forEach((metric) => {
    if (metrics[metric] !== undefined) {
      callAverages[id][metric].sum += metrics[metric];
      callAverages[id][metric].count += 1;
      callAverages[id][metric].avg =
        callAverages[id][metric].sum / callAverages[id][metric].count;
    }
  });
};

/**
 * @description Updates call targets based on call averages.
 * @param {Object.<string, StreamAverages>} callAverages - Averaged metrics for each stream.
 * @param {Object.<string, StreamTargets>} callTargets - Target metrics for each stream.
 * @param {Object} TARGETS - Predefined target values (e.g., {frameHeight: 720, framesDecodedPerSecond: 30}).
 * @param {string} id - Unique identifier for the stream.
 */
export const updateCallTargets = (callAverages, callTargets, TARGETS, id) => {
  if (!callTargets[id]) {
    callTargets[id] = {
      reportNum: 0,
      frameHeightTargetPct: 100,
      framesDecodedPerSecondTargetPct: 100,
      freezeCountPerSecondTargetPct: 100,
      totalFreezesDurationPerSecondTargetPct: 100,
      smoothnessTargetPct: 100,
    };
  }

  const metricsToUpdate = [
    { metric: 'frameHeight', target: 'frameHeight' },
    { metric: 'framesDecodedPerSecond', target: 'framesDecodedPerSecond' },
    {
      metric: 'freezeCountPerSecond',
      target: 'freezeCountPerSecond',
      invert: true,
    },
    {
      metric: 'totalFreezesDurationPerSecond',
      target: 'totalFreezesDurationPerSecond',
      invert: true,
    },
    { metric: 'smoothness', target: 'smoothnessTarget' },
  ];

  metricsToUpdate.forEach(({ metric, target, invert }) => {
    if (callAverages[id][metric].avg !== undefined) {
      const value = invert
        ? 1 - callAverages[id][metric].avg
        : callAverages[id][metric].avg;
      callTargets[id][`${metric}TargetPct`] = (value / TARGETS[target]) * 100;
      callTargets[id].reportNum = callAverages[id].reportNum;
    }
  });
};

/**
 * @exports
 */
const exportedTypes = {}