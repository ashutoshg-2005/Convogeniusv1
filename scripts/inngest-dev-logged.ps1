$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$logDir = Join-Path $repoRoot "observability\logs"
$logFile = Join-Path $logDir "inngest.log"

New-Item -ItemType Directory -Force -Path $logDir | Out-Null
if (Test-Path $logFile) {
  Clear-Content $logFile
}

Push-Location $repoRoot
try {
  npx inngest-cli@latest dev -u http://localhost:3000/api/inngest 2>&1 | Tee-Object -FilePath $logFile
} finally {
  Pop-Location
}
