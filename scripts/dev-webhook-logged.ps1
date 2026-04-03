$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$logDir = Join-Path $repoRoot "observability\logs"
$logFile = Join-Path $logDir "ngrok.log"

New-Item -ItemType Directory -Force -Path $logDir | Out-Null
if (Test-Path $logFile) {
  Clear-Content $logFile
}

Push-Location $repoRoot
try {
  npm run dev:webhook 2>&1 | Tee-Object -FilePath $logFile
} finally {
  Pop-Location
}
