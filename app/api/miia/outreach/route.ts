import { sendOutreachEmail } from '@/lib/email';
import { getMiiaOutreachLogsCollection } from '@/lib/db';

type OutreachPayload = {
  to?: string;
  rawBody?: string;
  source?: string;
  dryRun?: boolean;
};

function parseTemplate(rawBody: string) {
  const trimmed = rawBody.trim();
  const subjectPrefix = 'Subject:';

  if (!trimmed.startsWith(subjectPrefix)) {
    return {
      subject: 'SVL Collaboration Outreach',
      body: trimmed,
    };
  }

  const firstBreak = trimmed.indexOf('\n');
  const subjectLine = firstBreak === -1 ? trimmed : trimmed.slice(0, firstBreak);
  const subject = subjectLine.replace(subjectPrefix, '').trim() || 'SVL Collaboration Outreach';
  const body = firstBreak === -1 ? '' : trimmed.slice(firstBreak).trim();

  return { subject, body };
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const logsCollection = await getMiiaOutreachLogsCollection();
    const payload = (await req.json()) as OutreachPayload;
    const to = payload.to?.trim() || '';
    const rawBody = payload.rawBody?.trim() || '';
    const source = payload.source || 'unknown';

    const upsertLog = async (entry: {
      to: string;
      subject: string;
      status: 'validation_failed' | 'dry_run' | 'send_failed' | 'sent';
      mode: 'human_loop' | 'direct_api';
      reason?: string;
      messageId?: string;
    }) => {
      await logsCollection.insertOne({
        ...entry,
        source,
        createdAt: new Date(),
      });
    };

    if (!to || !rawBody) {
      await upsertLog({
        to: to || 'missing',
        subject: 'missing',
        status: 'validation_failed',
        mode: 'direct_api',
        reason: 'Missing to or rawBody',
      });
      return Response.json({ error: 'Missing to or rawBody' }, { status: 400 });
    }

    if (!isValidEmail(to)) {
      await upsertLog({
        to,
        subject: 'invalid',
        status: 'validation_failed',
        mode: 'direct_api',
        reason: 'Invalid recipient email',
      });
      return Response.json({ error: 'Invalid recipient email' }, { status: 400 });
    }

    const { subject, body } = parseTemplate(rawBody);

    const requiredKey = process.env.MIIA_OUTREACH_APPROVAL_KEY;
    const providedKey = req.headers.get('x-miia-approval-key') || '';

    if (!requiredKey) {
      await upsertLog({
        to,
        subject,
        status: 'validation_failed',
        mode: 'direct_api',
        reason: 'MIIA outbound is not configured yet',
      });
      return Response.json(
        { error: 'MIIA outbound is not configured yet' },
        { status: 503 }
      );
    }

    if (providedKey !== requiredKey) {
      await upsertLog({
        to,
        subject,
        status: 'validation_failed',
        mode: 'direct_api',
        reason: 'Approval key rejected',
      });
      return Response.json(
        { error: 'Approval key rejected. Human approval is required.' },
        { status: 403 }
      );
    }

    if (payload.dryRun) {
      await upsertLog({
        to,
        subject,
        status: 'dry_run',
        mode: 'human_loop',
      });
      return Response.json({
        success: true,
        mode: 'dry-run',
        to,
        subject,
        bodyPreview: body.slice(0, 200),
        source,
      });
    }

    const result = await sendOutreachEmail({
      brand: 'svl',
      to,
      subject,
      body,
    });

    if (!result.success) {
      await upsertLog({
        to,
        subject,
        status: 'send_failed',
        mode: 'direct_api',
        reason: result.message || 'Outbound delivery failed',
      });
      return Response.json(
        { error: result.message || 'Outbound delivery failed' },
        { status: 502 }
      );
    }

    await upsertLog({
      to,
      subject,
      status: 'sent',
      mode: 'direct_api',
      messageId: result.messageId || undefined,
    });

    return Response.json({
      success: true,
      mode: 'sent',
      to,
      subject,
      source,
      messageId: result.messageId || null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[MIIA Outreach] Error:', message);
    return Response.json({ error: message }, { status: 500 });
  }
}
