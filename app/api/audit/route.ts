import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { patterns, laws } from "@/lib/data";

const client = new Anthropic();

function buildSystemPrompt(): string {
  const patternList = patterns
    .map((p) => `- ${p.title}: ${p.desc} (${p.psychology})`)
    .join("\n");

  const lawList = laws
    .map((l) => `- ${l.name} (${l.category}): ${l.use}`)
    .join("\n");

  return `You are a UX psychology expert conducting psychology-mapped audits of digital products.

You have expertise in these proven UX patterns:
${patternList}

And these psychology laws:
${lawList}

When given a website or GitHub repository, analyze it thoroughly and return a JSON audit report.

RESPONSE FORMAT — return ONLY this JSON structure, no markdown, no explanation:
{
  "score": <integer 0-100, honest assessment>,
  "summary": "<2-3 sentences: what the product does well and where it falls short>",
  "frictionPoints": [
    {
      "area": "<specific area: onboarding | checkout | navigation | forms | etc>",
      "issue": "<precise description of the friction>",
      "impact": "high|medium|low"
    }
  ],
  "psychologyGaps": [
    {
      "pattern": "<exact pattern name from the list above>",
      "explanation": "<why this pattern is missing or misapplied>",
      "recommendation": "<specific, actionable step to implement it>"
    }
  ],
  "fixFirst": [
    {
      "title": "<short, action-oriented title>",
      "why": "<the psychological reason this matters for conversion/retention>",
      "how": "<2-3 concrete implementation steps>",
      "effort": "low|medium|high",
      "impact": "high|medium|low"
    }
  ]
}

Rules:
- frictionPoints: 3-6 items, most impactful first
- psychologyGaps: 3-5 patterns genuinely absent or poorly executed
- fixFirst: exactly 4 items, ranked by impact/effort ratio (high impact + low effort first)
- Be specific and actionable, not generic
- Score honestly: a well-designed product might score 70-85, a poor one 20-40`;
}

async function fetchGitHubContent(url: string): Promise<string> {
  const match = url.match(/github\.com\/([^/]+)\/([^/\s?#]+)/);
  if (!match) return `GitHub repository: ${url}`;

  const [, owner, repo] = match;
  const cleanRepo = repo.replace(/\.git$/, "");

  try {
    const [readmeRes, repoRes, contentsRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${owner}/${cleanRepo}/readme`, {
        headers: { Accept: "application/vnd.github.v3+json" },
      }),
      fetch(`https://api.github.com/repos/${owner}/${cleanRepo}`, {
        headers: { Accept: "application/vnd.github.v3+json" },
      }),
      fetch(`https://api.github.com/repos/${owner}/${cleanRepo}/contents`, {
        headers: { Accept: "application/vnd.github.v3+json" },
      }),
    ]);

    let content = `GitHub Repository: ${owner}/${cleanRepo}\n\n`;

    if (repoRes.ok) {
      const repoData = await repoRes.json();
      content += `Description: ${repoData.description || "No description"}\n`;
      content += `Language: ${repoData.language || "Unknown"}\n`;
      content += `Stars: ${repoData.stargazers_count}\n\n`;
    }

    if (contentsRes.ok) {
      const files = await contentsRes.json();
      if (Array.isArray(files)) {
        const fileNames = files.map((f: { name: string }) => f.name).join(", ");
        content += `Root files: ${fileNames}\n\n`;
      }
    }

    if (readmeRes.ok) {
      const readmeData = await readmeRes.json();
      const decoded = Buffer.from(readmeData.content, "base64").toString("utf-8");
      content += `README:\n${decoded.slice(0, 4000)}`;
    }

    return content;
  } catch {
    return `GitHub repository: ${url}`;
  }
}

async function fetchWebsiteContent(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; UX-Playbook-Audit/1.0)",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return `Website: ${url} (HTTP ${res.status})`;

    const html = await res.text();

    // Extract title and meta description
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descMatch = html.match(
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i
    );

    const title = titleMatch?.[1]?.trim() ?? "";
    const description = descMatch?.[1]?.trim() ?? "";

    // Strip scripts, styles, then tags
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 4000);

    return `Website: ${url}
Title: ${title}
Meta description: ${description}

Page content:
${text}`;
  } catch {
    return `Website: ${url} (could not fetch — analyze based on URL structure)`;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "A valid URL is required." }, { status: 400 });
    }

    const isGitHub = /github\.com/i.test(url);
    const content = isGitHub
      ? await fetchGitHubContent(url)
      : await fetchWebsiteContent(url);

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: [
        {
          type: "text",
          text: buildSystemPrompt(),
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [
        {
          role: "user",
          content: `Please audit this ${isGitHub ? "GitHub repository" : "website"}:\n\n${content}`,
        },
      ],
    });

    const rawText =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Strip any accidental markdown code fences
    const cleaned = rawText
      .replace(/^```(?:json)?\n?/, "")
      .replace(/\n?```$/, "")
      .trim();

    const result = JSON.parse(cleaned);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Audit error:", error);
    return NextResponse.json(
      { error: "Audit failed. Please check the URL and try again." },
      { status: 500 }
    );
  }
}
