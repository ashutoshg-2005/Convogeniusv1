import autocannon from "autocannon";

const baseUrl = process.env.PERF_BASE_URL ?? "http://127.0.0.1:3000";
const routes = (process.env.PERF_ROUTES ?? "/")
  .split(",")
  .map((route) => route.trim())
  .filter(Boolean);
const duration = Number(process.env.PERF_DURATION ?? 15);
const connections = Number(process.env.PERF_CONNECTIONS ?? 10);
const maxAverageLatencyMs = Number(process.env.PERF_MAX_AVG_MS ?? 500);
const maxP95LatencyMs = Number(process.env.PERF_MAX_P95_MS ?? 1500);
const trackProgress = process.env.PERF_TRACK === "true";
const warmupRequests = Number(process.env.PERF_WARMUP_REQUESTS ?? 1);
const warmupAttempts = Number(process.env.PERF_WARMUP_ATTEMPTS ?? 10);
const warmupDelayMs = Number(process.env.PERF_WARMUP_DELAY_MS ?? 500);

function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function warmRoute(url) {
  for (let index = 0; index < warmupRequests; index += 1) {
    let warmed = false;
    let lastStatus = "no-response";

    for (let attempt = 0; attempt < warmupAttempts; attempt += 1) {
      const response = await fetch(url, {
        headers: {
          "cache-control": "no-cache",
        },
      });

      lastStatus = response.status;

      if (response.ok) {
        warmed = true;
        break;
      }

      await wait(warmupDelayMs);
    }

    if (!warmed) {
      throw new Error(`Warmup request failed for ${url} with status ${lastStatus}`);
    }
  }
}

function runAutocannon(url) {
  return new Promise((resolve, reject) => {
    const instance = autocannon(
      {
        url,
        duration,
        connections,
        renderProgressBar: trackProgress,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      },
    );

    if (trackProgress) {
      autocannon.track(instance, {
        renderProgressBar: true,
      });
    }
  });
}

try {
  if (routes.length === 0) {
    throw new Error("No PERF_ROUTES were provided.");
  }

  const summaries = [];

  for (const route of routes) {
    const url = new URL(route, baseUrl).toString();
    await warmRoute(url);
    const result = await runAutocannon(url);
    const requestsP95 = result.requests.p95 ?? 0;
    const latencyP95Ms = result.latency.p95 ?? 0;

    summaries.push({
      route,
      url,
      duration,
      connections,
      requestsAverage: result.requests.average,
      requestsP95,
      latencyAverageMs: result.latency.average,
      latencyP95Ms,
      errors: result.errors,
      non2xx: result.non2xx,
      timeouts: result.timeouts,
    });
  }

  console.log("\nPerformance smoke summary");
  console.log(JSON.stringify(summaries, null, 2));

  const failures = summaries.filter(
    (summary) =>
      summary.errors > 0 ||
      summary.non2xx > 0 ||
      summary.timeouts > 0 ||
      summary.latencyAverageMs > maxAverageLatencyMs ||
      summary.latencyP95Ms > maxP95LatencyMs,
  );

  if (failures.length > 0) {
    console.error("\nPerformance smoke test failed for these routes:");

    for (const failure of failures) {
      console.error(
        `- ${failure.route}: avg ${failure.latencyAverageMs}ms, p95 ${failure.latencyP95Ms}ms, errors ${failure.errors}, non2xx ${failure.non2xx}, timeouts ${failure.timeouts}`,
      );
    }

    process.exit(1);
  }
} catch (error) {
  console.error("Performance smoke test crashed:", error);
  process.exit(1);
}
