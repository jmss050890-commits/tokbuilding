<<<<<<< HEAD
﻿import { AGENTS } from "@/lib/lib/lib/agents";
=======
import { AGENTS } from "@/lib/lib/lib/agents";
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b

function escapeIcsValue(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export async function GET() {
  const agent = AGENTS["mr-kpa"];
  const agendaLines = (agent?.meetingAgenda || []).map((item, index) => `${index + 1}. ${item}`);
  const description = [
    "Daily SVL AI Agent Team Meeting led by Mr. KPA.",
    "Purpose: keep every agent aligned with KPA principles and current trusted research.",
    "",
    ...agendaLines,
  ].join("\n");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
<<<<<<< HEAD
    "PRODID:-//Sanders Viopro Labs LLC//Mr. KPA Daily Meeting//EN",
=======
    "PRODID:-//Sanders Viopro Labs//Mr. KPA Daily Meeting//EN",
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:SVL AI Agent Team Meeting",
    "X-WR-TIMEZONE:America/Chicago",
    "BEGIN:VEVENT",
<<<<<<< HEAD
    "UID:mr-kpa-daily-ai-agent-team-meeting@sandersvioprolabsllc.com",
=======
    "UID:mr-kpa-daily-ai-agent-team-meeting@sandersvioprolabs.com",
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
    "DTSTAMP:20260323T000000Z",
    "DTSTART;TZID=America/Chicago:20260324T080000",
    "DURATION:PT30M",
    "RRULE:FREQ=DAILY",
    `SUMMARY:${escapeIcsValue(agent?.meetingCadenceTitle || "SVL AI Agent Team Meeting")}`,
    `DESCRIPTION:${escapeIcsValue(description)}`,
<<<<<<< HEAD
    "LOCATION:sandersvioprolabsllc.com",
=======
    "LOCATION:SandersVioproLabs.com",
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new Response(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="svl-ai-agent-team-meeting.ics"',
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
<<<<<<< HEAD

=======
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
