/**
 * @description Target values for various WebRTC metrics. These values represent ideal performance goals.
 */
export const TARGETS = {
  frameHeight: 720, // Aiming for 720p
  framesDecodedPerSecond: 30, // Aiming for 30 fps
  smoothnessTarget: 100, // Aiming for 100% smoothness
  freezeCountPerSecond: 1, // Inverted so we don't divide by 0. We also invert the actual freeze duration per second
  totalFreezesDurationPerSecond: 1, // Inverted so we don't divide by 0. We also invert the actual freeze duration per second
};

/**
 * @description Settings for smoothness calculation and frame rate analysis. frameRatePeriodChange is the number of periods we look at to see if there was a change in framerate. frameRateDelta is the maximum difference in frame rate we allow before we consider it a change.
 */
export const SETTINGS = {
  frameRatePeriodChange: 2,
  frameRateDelta: 5
}

/**
 * @description Types of RTC statistics to keep in the filtered reports.
 */
export const TYPES_TO_KEEP = ['inbound-rtp'];

/**
 * @description Kinds of media to keep in the filtered reports.
 */
export const KINDS_TO_KEEP = ['video'];

/**
 * @description SSRC values to remove from the reports. The "1234" SSRC is a bandwidth probe and shouldn't be included in the reports.
 */
export const SSRC_TO_REMOVE = [1234];

/**
 * @description Keys to keep in the filtered RTC statistics reports.
 */
export const KEYS_TO_KEEP = [
  'id',
  'timestamp',
  'type',
  'kind',
  'ssrc',
  'transportId',
  'framesDecoded',
  'freezeCount',
  'frameHeight',
  'bytesReceived',
  'totalFreezesDuration',
];

/**
 * @description Keys representing cumulative metrics that need to be converted to per-second values.
 */
export const CUMULATIVE_KEYS = [
  'framesDecoded',
  'freezeCount',
  'totalFreezesDuration',
];

/**
 * @description Keys to keep after performing per-second calculations.
 */
export const KEYS_TO_KEEP_AFTER_PER_SECOND_CALCULATIONS = [
  'id',
  'timestamp',
  'type',
  'kind',
  'ssrc',
  'transportId',
  'framesDecodedPerSecond',
  'freezeCountPerSecond',
  'frameHeight',
  'totalFreezesDurationPerSecond',
  'samplesDurationPerSecond',
  'frameHeightTargetPct',
  'framerateTargetPct',
  'smoothnessTargetPct',
  'freezeTargetPct',
  'freezeDurationTargetPct',
];


