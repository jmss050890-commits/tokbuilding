/**
 * Memorial Membership Utilities
 * Determines user tier based on TokStore subscriptions
 */

export interface MemorialTierInfo {
  tier: 'free' | 'silver' | 'gold' | 'platinum';
  slotLimit: number;
  canInviteUsers: boolean;
  invitableUserCount: number;
  invitableUserSlots: number;
  isSubscribed: boolean;
  subscriptionId?: string;
  status?: string;
}

// TokStore appIds for memorial products
const MEMORIAL_APP_IDS = {
  free: 'memorial-free',
  silver: 'memorial-silver',
  gold: 'memorial-gold',
  platinum: 'memorial-platinum',
};

const TIER_LIMITS = {
  free: {
    slots: 1,
    canInvite: false,
    invitableUsers: 0,
    invitableUserSlots: 0,
  },
  silver: {
    slots: 5,
    canInvite: false,
    invitableUsers: 0,
    invitableUserSlots: 0,
  },
  gold: {
    slots: 15,
    canInvite: false,
    invitableUsers: 0,
    invitableUserSlots: 0,
  },
  platinum: {
    slots: 15,
    canInvite: true,
    invitableUsers: 2,
    invitableUserSlots: 5,
  },
};

/**
 * Get user's memorial tier from their TokStore subscriptions
 * Returns the highest active tier, or 'free' if none
 */
export async function getUserMemorialTier(
  userId: string,
  subscriptions?: any[]
): Promise<MemorialTierInfo> {
  // If subscriptions not provided, you'd query the DB
  // For now, assuming subscriptions are passed in

  if (!subscriptions || subscriptions.length === 0) {
    return {
      tier: 'free',
      slotLimit: TIER_LIMITS.free.slots,
      canInviteUsers: false,
      invitableUserCount: 0,
      invitableUserSlots: 0,
      isSubscribed: false,
    };
  }

  // Check for active memorial subscriptions in order of priority
  const activeSubscription = subscriptions.find(
    (sub) => sub.status === 'active' && Object.values(MEMORIAL_APP_IDS).includes(sub.appId)
  );

  if (!activeSubscription) {
    return {
      tier: 'free',
      slotLimit: TIER_LIMITS.free.slots,
      canInviteUsers: false,
      invitableUserCount: 0,
      invitableUserSlots: 0,
      isSubscribed: false,
    };
  }

  // Determine tier from appId
  let tier: 'free' | 'silver' | 'gold' | 'platinum' = 'free';
  for (const [tierName, appId] of Object.entries(MEMORIAL_APP_IDS)) {
    if (activeSubscription.appId === appId) {
      tier = tierName as 'free' | 'silver' | 'gold' | 'platinum';
      break;
    }
  }

  const tierLimits = TIER_LIMITS[tier];

  return {
    tier,
    slotLimit: tierLimits.slots,
    canInviteUsers: tierLimits.canInvite,
    invitableUserCount: tierLimits.invitableUsers,
    invitableUserSlots: tierLimits.invitableUserSlots,
    isSubscribed: true,
    subscriptionId: activeSubscription._id,
    status: activeSubscription.status,
  };
}

/**
 * Count user's current memorials
 * Pass their memorials array from the DB
 */
export function countUserMemorials(memorials?: any[]): number {
  return memorials?.length || 0;
}

/**
 * Check if user has slots available for new memorial
 */
export function hasMemorialSlots(
  tierInfo: MemorialTierInfo,
  currentMemorialCount: number
): boolean {
  return currentMemorialCount < tierInfo.slotLimit;
}

/**
 * Get TokStore product config for memorial tier
 */
export const getMemorialProductConfig = (tier: string) => {
  const configs: Record<string, any> = {
    silver: {
      appId: MEMORIAL_APP_IDS.silver,
      appName: 'Memorial Membership - Silver',
      description: '5 secure memorial slots',
      priceMonthly: 1000,
      priceYearly: 10800,
    },
    gold: {
      appId: MEMORIAL_APP_IDS.gold,
      appName: 'Memorial Membership - Gold',
      description: '15 secure memorial slots + family sharing',
      priceMonthly: 3000,
      priceYearly: 32400,
    },
    platinum: {
      appId: MEMORIAL_APP_IDS.platinum,
      appName: 'Memorial Membership - Platinum',
      description: '15 memorials + 2 family stewards with 5 memorials each',
      priceMonthly: 5500,
      priceYearly: 59400,
    },
  };

  return configs[tier] || null;
};
