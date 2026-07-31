import type { Level, DeviceId } from "./types";
import {
  CURRICULUM as BASE_CURRICULUM,
  getLessonDeviceTip as baseGetLessonDeviceTip,
  DEVICES,
  detectDevice,
  getDeviceById,
} from "./curriculum";
import { ADVANCED_LEVELS } from "./curriculumAdvanced";
import { SPECIALIZATION_LEVELS } from "./curriculumLevel10";
import {
  getDeviceSetup,
  getDeviceResources,
  EXTENDED_LESSON_TIPS,
} from "./curriculumGuides";

// ============================================================
// The complete 11-level curriculum: base levels (Zero → DSA),
// advanced levels (Frontend → Capstone), and the post-graduation
// Specialization level (10).
// ============================================================

export type { DeviceGuide } from "./curriculum";
export { DEVICES, detectDevice, getDeviceById, getDeviceSetup, getDeviceResources };

export const CURRICULUM: Level[] = [
  ...BASE_CURRICULUM,
  ...ADVANCED_LEVELS,
  ...SPECIALIZATION_LEVELS,
];

/** Index of the Capstone level in the merged curriculum — passing it graduates you. */
export const GRADUATION_LEVEL_INDEX =
  BASE_CURRICULUM.length + ADVANCED_LEVELS.length - 1;

/**
 * Lesson-level device tips for the full curriculum:
 * extended tips (levels 3-10) first, falling back to the base
 * tips (levels 0-2) when a lesson has no extended tip.
 */
export function getLessonDeviceTip(
  levelIdx: number,
  lessonIdx: number,
  device: DeviceId | null | undefined
): string | null {
  const key = device as DeviceId;
  const extended = key
    ? EXTENDED_LESSON_TIPS[`${levelIdx}-${lessonIdx}`]?.[key]
    : undefined;
  if (extended) return extended;
  return baseGetLessonDeviceTip(levelIdx, lessonIdx, device);
}
