import { getMiiaOutreachLogsCollection } from '@/lib/db';

type FacebookPayload = {
  pageId?: string;
  message?: string;
  source?: string;
  dryRun?: boolean;
};

async function safeInsertOutreachLog(entry: {
  to: string;
  subject: string;
  source: string;
  status: 'validation_failed' | 'dry_run' | 'send_failed' | 'sent';
  mode: 'human_loop' | 'direct_api';
  reason?: string;
  messageId?: string;
}) {
  try {
    const logsCollection = await getMiiaOutreachLogsCollection();
    await logsCollection.insertOne({
      ...entry,
      createdAt: new Date(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown logging error';
    console.warn('[MIIA Facebook] Logging skipped:', message);
  }
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as FacebookPayload;

    const pageId = payload.pageId?.trim() || '';
    const message = payload.message?.trim() || '';
    const source = payload.source || 'tokshow-episode-1';

    const upsertLog = async (entry: {
      to: string;
      subject: string;
      status: 'validation_failed' | 'dry_run' | 'send_failed' | 'sent';
      mode: 'human_loop' | 'direct_api';
      reason?: string;
      messageId?: string;
    }) => {
      await safeInsertOutreachLog({
        ...entry,
        source,
      });
    };

    if (!pageId || !message) {
      await upsertLog({
        to: pageId || 'missing-page-id',
        subject: 'facebook-page-post',
        status: 'validation_failed',
        mode: 'direct_api',
        reason: 'Missing pageId or message',
      });
      return Response.json({ error: 'Missing pageId or message' }, { status: 400 });
    }

    const requiredKey = process.env.MIIA_FACEBOOK_APPROVAL_KEY || process.env.MIIA_OUTREACH_APPROVAL_KEY;
    const providedKey = req.headers.get('x-miia-approval-key') || '';

    if (!requiredKey) {
      await upsertLog({
        to: pageId,
        subject: 'facebook-page-post',
        status: 'validation_failed',
        mode: 'direct_api',
        reason: 'Facebook outbound approval key not configured',
      });
      return Response.json({ error: 'Facebook outbound is not configured yet' }, { status: 503 });
    }

    if (providedKey !== requiredKey) {
      await upsertLog({
        to: pageId,
        subject: 'facebook-page-post',
        status: 'validation_failed',
        mode: 'direct_api',
        reason: 'Approval key rejected',
      });
      return Response.json({ error: 'Approval key rejected. Human approval is required.' }, { status: 403 });
    }

    if (payload.dryRun) {
      await upsertLog({
        to: pageId,
        subject: 'facebook-page-post',
        status: 'dry_run',
        mode: 'human_loop',
      });
      return Response.json({
        success: true,
        mode: 'dry-run',
        pageId,
        preview: message.slice(0, 220),
      });
    }

    const pageToken = process.env.MIIA_FACEBOOK_PAGE_ACCESS_TOKEN;
    if (!pageToken) {
      await upsertLog({
        to: pageId,
        subject: 'facebook-page-post',
        status: 'validation_failed',
        mode: 'direct_api',
        reason: 'Missing MIIA_FACEBOOK_PAGE_ACCESS_TOKEN',
      });
      return Response.json({ error: 'MIIA_FACEBOOK_PAGE_ACCESS_TOKEN is not configured' }, { status: 503 });
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
      const reason = data.error?.message || 'Facebook post failed';
      await upsertLog({
        to: pageId,
        subject: 'facebook-page-post',
        status: 'send_failed',
        mode: 'direct_api',
        reason,
      });
      return Response.json({ error: reason }, { status: 502 });
    }

    await upsertLog({
      to: pageId,
      subject: 'facebook-page-post',
      status: 'sent',
      mode: 'direct_api',
      messageId: data.id,
    });

    return Response.json({
      success: true,
      mode: 'sent',
      pageId,
      postId: data.id || null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[MIIA Facebook] Error:', message);
    return Response.json({ error: message }, { status: 500 });
  }
}
