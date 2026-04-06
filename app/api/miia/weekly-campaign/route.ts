import { getMiiaOutreachLogsCollection } from '@/lib/db';
import { sendOutreachEmail } from '@/lib/email';

const weeklyEmailBody = `Subject: Weekly global partnership alignment - MIIA x SVL

Hello [Name],

This is the weekly MIIA x Sanders Viopro Labs outreach signal for aligned partners supporting emergency food, clean-water resilience, and mission-centered deployment.

We are building a repeatable Keep People Alive system that combines practical execution, transparent reporting, and soul-centered support through TokHealth and our Wisdom Feed.

If your organization is open to collaboration, reply ALIGN and we will schedule a focused mission call.

Respectfully,
[Name]
[Title]
[Phone]

Wisdom Signal:
Proverbs 3:5-6 reminds us to lead with trust, clarity, and right action.
Our Proverbs In R&B wellness layer is part of the way we care for both impact and people.`;

const weeklyFacebookMessage = `Weekly MIIA x SVL Global Outreach Signal

We are continuing our weekly partnership outreach around emergency food, clean-water resilience, and mission-centered health support.

Our system now includes the TokHealth Wisdom Feed and Proverbs In R&B soul layer so the mission stays practical and human.

If your organization wants to collaborate, reply ALIGN.

#SVL #MIIA #KeepPeopleAlive #GlobalImpact #TokHealth #ProverbsInRNB`;

type WeeklyCampaignPayload = {
  dryRun?: boolean;
};

type LogStatus = 'validation_failed' | 'dry_run' | 'send_failed' | 'sent';
type LogMode = 'human_loop' | 'direct_api';

function isAutomationEnabled() {
  return process.env.MIIA_WEEKLY_AUTOMATION_ENABLED === 'true';
}

function parseTemplate(rawBody: string) {
  const subjectPrefix = 'Subject:';
  if (!rawBody.startsWith(subjectPrefix)) {
    return { subject: 'SVL Weekly Campaign', body: rawBody };
  }

  const firstBreak = rawBody.indexOf('\n');
  const subjectLine = firstBreak === -1 ? rawBody : rawBody.slice(0, firstBreak);
  const subject = subjectLine.replace(subjectPrefix, '').trim() || 'SVL Weekly Campaign';
  const body = firstBreak === -1 ? '' : rawBody.slice(firstBreak).trim();
  return { subject, body };
}

async function logWeeklyEvent(entry: {
  to: string;
  subject: string;
  status: LogStatus;
  mode: LogMode;
  reason?: string;
  messageId?: string;
}) {
  const collection = await getMiiaOutreachLogsCollection();
  await collection.insertOne({
    ...entry,
    source: 'miia-weekly-campaign',
    createdAt: new Date(),
  });
}

async function postToFacebook(pageId: string, message: string) {
  const pageToken = process.env.MIIA_FACEBOOK_PAGE_ACCESS_TOKEN;
  if (!pageToken) {
    return { success: false, message: 'MIIA_FACEBOOK_PAGE_ACCESS_TOKEN is not configured' };
  }

  const response = await fetch(`https://graph.facebook.com/v23.0/${encodeURIComponent(pageId)}/feed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      access_token: pageToken,
    }),
  });

  const data = (await response.json()) as { id?: string; error?: { message?: string } };
  if (!response.ok || data.error) {
    return { success: false, message: data.error?.message || 'Facebook post failed' };
  }

  return { success: true, postId: data.id };
}

function isAuthorized(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const bearer = req.headers.get('authorization') || '';
  const approvalKey = req.headers.get('x-miia-approval-key') || '';
  const configuredApproval = process.env.MIIA_OUTREACH_APPROVAL_KEY || '';

  if (cronSecret && bearer === `Bearer ${cronSecret}`) {
    return true;
  }

  if (configuredApproval && approvalKey === configuredApproval) {
    return true;
  }

  return false;
}

async function handleWeeklyCampaign(req: Request, payload: WeeklyCampaignPayload) {
  if (!isAuthorized(req)) {
    await logWeeklyEvent({
      to: 'weekly-campaign',
      subject: 'weekly-campaign',
      status: 'validation_failed',
      mode: 'direct_api',
      reason: 'Unauthorized weekly campaign request',
    });
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isAutomationEnabled()) {
    await logWeeklyEvent({
      to: 'weekly-campaign',
      subject: 'weekly-campaign',
      status: 'validation_failed',
      mode: 'direct_api',
      reason: 'Weekly automation disabled',
    });
    return Response.json({ error: 'Weekly automation is disabled' }, { status: 503 });
  }

  const emailTo = process.env.MIIA_WEEKLY_EMAIL_TO || '';
  const facebookPageId = process.env.MIIA_WEEKLY_FACEBOOK_PAGE_ID || '';

  if (!emailTo || !facebookPageId) {
    await logWeeklyEvent({
      to: 'weekly-campaign',
      subject: 'weekly-campaign',
      status: 'validation_failed',
      mode: 'direct_api',
      reason: 'Missing MIIA_WEEKLY_EMAIL_TO or MIIA_WEEKLY_FACEBOOK_PAGE_ID',
    });
    return Response.json({ error: 'Missing weekly campaign env configuration' }, { status: 503 });
  }

  const { subject, body } = parseTemplate(weeklyEmailBody);

  if (payload.dryRun) {
    await logWeeklyEvent({
      to: emailTo,
      subject,
      status: 'dry_run',
      mode: 'human_loop',
    });
    await logWeeklyEvent({
      to: facebookPageId,
      subject: 'facebook-weekly-campaign',
      status: 'dry_run',
      mode: 'human_loop',
    });
    return Response.json({
      success: true,
      mode: 'dry-run',
      emailTo,
      facebookPageId,
      emailPreview: body.slice(0, 180),
      facebookPreview: weeklyFacebookMessage.slice(0, 180),
    });
  }

  const [emailResult, facebookResult] = await Promise.all([
    sendOutreachEmail({
      brand: 'svl',
      to: emailTo,
      subject,
      body,
    }),
    postToFacebook(facebookPageId, weeklyFacebookMessage),
  ]);

  if (!emailResult.success) {
    await logWeeklyEvent({
      to: emailTo,
      subject,
      status: 'send_failed',
      mode: 'direct_api',
      reason: emailResult.message || 'Weekly email send failed',
    });
  } else {
    await logWeeklyEvent({
      to: emailTo,
      subject,
      status: 'sent',
      mode: 'direct_api',
      messageId: emailResult.messageId,
    });
  }

  if (!facebookResult.success) {
    await logWeeklyEvent({
      to: facebookPageId,
      subject: 'facebook-weekly-campaign',
      status: 'send_failed',
      mode: 'direct_api',
      reason: facebookResult.message,
    });
  } else {
    await logWeeklyEvent({
      to: facebookPageId,
      subject: 'facebook-weekly-campaign',
      status: 'sent',
      mode: 'direct_api',
      messageId: facebookResult.postId,
    });
  }

  if (!emailResult.success || !facebookResult.success) {
    return Response.json(
      {
        error: 'One or more weekly campaign channels failed',
        email: emailResult,
        facebook: facebookResult,
      },
      { status: 502 }
    );
  }

  return Response.json({
    success: true,
    mode: 'sent',
    emailMessageId: emailResult.messageId || null,
    facebookPostId: facebookResult.postId || null,
  });
}

export async function GET(req: Request) {
  return handleWeeklyCampaign(req, { dryRun: true });
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as WeeklyCampaignPayload;
    return handleWeeklyCampaign(req, payload);
  } catch {
    return handleWeeklyCampaign(req, {});
  }
}