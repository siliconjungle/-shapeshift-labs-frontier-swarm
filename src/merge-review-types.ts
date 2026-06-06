import type {
  JsonObject
} from '@shapeshift-labs/frontier';
import type {
  FRONTIER_SWARM_HOTSPOT_REPORT_KIND,
  FRONTIER_SWARM_HOTSPOT_REPORT_VERSION,
  FRONTIER_SWARM_REVIEWER_LANE_PLAN_KIND,
  FRONTIER_SWARM_REVIEWER_LANE_PLAN_VERSION
} from './constants.js';
import type {
  FrontierSwarmMergeAdmission
} from './context-types.js';
import type {
  FrontierSwarmMergeBundle,
  FrontierSwarmMergeIndex
} from './merge-types.js';
import type {
  FrontierSwarmJobResult,
  FrontierSwarmJobResultInput
} from './result-types.js';
import type {
  FrontierSwarmTaskInput
} from './task-types.js';

export interface FrontierSwarmHotspotReportInput {
  id?: string;
  bundles?: readonly FrontierSwarmMergeBundle[];
  results?: readonly (FrontierSwarmJobResult | FrontierSwarmJobResultInput)[];
  threshold?: number;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmHotspotReport {
  kind: typeof FRONTIER_SWARM_HOTSPOT_REPORT_KIND;
  version: typeof FRONTIER_SWARM_HOTSPOT_REPORT_VERSION;
  id: string;
  generatedAt: number;
  threshold: number;
  entries: FrontierSwarmHotspotEntry[];
  recommendations: FrontierSwarmHotspotRecommendation[];
  summary: {
    pathCount: number;
    hotspotCount: number;
    recommendationCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmHotspotEntry {
  path: string;
  touchCount: number;
  jobIds: string[];
  regions: string[];
  dispositions: string[];
  riskLevels: string[];
}

export interface FrontierSwarmHotspotRecommendation {
  path: string;
  reason: 'repeated-conflicts' | 'hot-file' | 'region-overlap';
  suggestedModuleId: string;
  suggestedOwnershipRegions: string[];
  jobIds: string[];
}

export interface FrontierSwarmReviewerLanePlanInput {
  id?: string;
  index: FrontierSwarmMergeIndex;
  admission?: FrontierSwarmMergeAdmission;
  reviewerLane?: string;
  reviewers?: readonly string[];
  includeAutoMergeable?: boolean;
  generatedAt?: number;
  metadata?: unknown;
}

export interface FrontierSwarmReviewerLanePlan {
  kind: typeof FRONTIER_SWARM_REVIEWER_LANE_PLAN_KIND;
  version: typeof FRONTIER_SWARM_REVIEWER_LANE_PLAN_VERSION;
  id: string;
  mergeIndexId: string;
  generatedAt: number;
  reviewerLane: string;
  assignments: FrontierSwarmReviewerLaneAssignment[];
  tasks: FrontierSwarmTaskInput[];
  summary: {
    assignmentCount: number;
    taskCount: number;
  };
  metadata?: JsonObject;
}

export interface FrontierSwarmReviewerLaneAssignment {
  jobId: string;
  reviewers: string[];
  required: boolean;
  reasons: string[];
}
