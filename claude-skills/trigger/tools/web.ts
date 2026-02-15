/**
 * Web search and fetch tools
 */

interface SearchResult {
  type: string;
  title?: string;
  text: string;
  url: string;
}

export async function webSearch(
  query: string
): Promise<{ query: string; results: SearchResult[] }> {
  // Use DuckDuckGo instant answer API (no API key needed)
  const url = new URL("https://api.duckduckgo.com/");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("no_html", "1");
  url.searchParams.set("skip_disambig", "1");

  try {
    const response = await fetch(url.toString());
    const data = (await response.json()) as {
      Abstract?: string;
      Heading?: string;
      AbstractURL?: string;
      RelatedTopics?: any[];
    };

    const results: SearchResult[] = [];

    // Abstract (main result)
    if (data.Abstract) {
      results.push({
        type: "abstract",
        title: data.Heading || "",
        text: data.Abstract,
        url: data.AbstractURL || "",
      });
    }

    // Related topics (up to 5)
    const relatedTopics = data.RelatedTopics || [];
    for (const topic of relatedTopics.slice(0, 5)) {
      if (typeof topic === "object" && topic.Text) {
        results.push({
          type: "related",
          text: topic.Text,
          url: topic.FirstURL || "",
        });
      }
    }

    // If no results, provide suggestion
    if (results.length === 0) {
      results.push({
        type: "suggestion",
        text: `No instant results for '${query}'. Try web_fetch on specific company/person websites.`,
        url: "",
      });
    }

    console.log(`🔍 Web search: ${query} -> ${results.length} results`);
    return { query, results };
  } catch (error) {
    console.error(`Web search error: ${error}`);
    throw error;
  }
}

export async function webFetch(
  url: string
): Promise<{ url: string; content: string; length: number }> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    let html = await response.text();

    // Simple HTML to text conversion
    // Remove script and style elements
    html = html.replace(/<script[^>]*>.*?<\/script>/gis, "");
    html = html.replace(/<style[^>]*>.*?<\/style>/gis, "");

    // Remove HTML tags
    let text = html.replace(/<[^>]+>/g, " ");

    // Clean up whitespace
    text = text.replace(/\s+/g, " ").trim();

    // Truncate if too long
    if (text.length > 15000) {
      text = text.slice(0, 15000) + "... [truncated]";
    }

    console.log(`🌐 Fetched ${url} (${text.length} chars)`);
    return { url, content: text, length: text.length };
  } catch (error) {
    console.error(`Web fetch error: ${error}`);
    throw error;
  }
}

// Tool definitions for Claude
export const webSearchTool = {
  name: "web_search",
  description:
    "Search the web for information. Use this to research people, companies, products, or any unfamiliar terms.",
  input_schema: {
    type: "object" as const,
    properties: {
      query: { type: "string", description: "The search query" },
    },
    required: ["query"],
  },
};

export const webFetchTool = {
  name: "web_fetch",
  description:
    "Fetch and read content from a specific URL. Returns the text content of the page.",
  input_schema: {
    type: "object" as const,
    properties: {
      url: { type: "string", description: "The URL to fetch" },
    },
    required: ["url"],
  },
};
