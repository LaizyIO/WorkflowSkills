param(
    [string[]]$Paths = @("."),
    [string[]]$Extensions = @(
        ".cs",
        ".csproj",
        ".css",
        ".html",
        ".js",
        ".jsx",
        ".json",
        ".md",
        ".mdc",
        ".mdx",
        ".props",
        ".ps1",
        ".py",
        ".scss",
        ".sh",
        ".targets",
        ".toml",
        ".ts",
        ".tsx",
        ".txt",
        ".yaml",
        ".yml"
    )
)

$ErrorActionPreference = "Stop"

$patterns = @(
    [string][char]0x00C3,
    "$([char]0x00C2) ",
    "$([char]0x00C2)$([char]0x00A0)",
    "$([char]0x00E2)$([char]0x20AC)",
    "$([char]0x00E2)$([char]0x2020)",
    "$([char]0x00E2)$([char]0x201D)",
    "$([char]0x00E2)$([char]0x2013)",
    "$([char]0x00EF)$([char]0x00B8)",
    "$([char]0x00E2)$([char]0x0192)",
    "$([char]0x00E2)$([char]0x0161)",
    [string][char]0xFFFD                          # Unicode replacement character
)

$literalArtifactPatternsByExtension = @{
    ".md" = @(
        '`r`n'
    )
}

$excludedParts = @(
    ".agents",
    ".claude",
    ".codex",
    ".git",
    ".next",
    ".tmp",
    ".tokens",
    "bin",
    "build",
    "coverage",
    "dist",
    "node_modules",
    "obj",
    "tmp"
)

function Read-TextFile {
    param([string]$Path)

    $bytes = [System.IO.File]::ReadAllBytes($Path)
    if ($bytes.Length -ge 2) {
        if ($bytes[0] -eq 0xFF -and $bytes[1] -eq 0xFE) {
            return [System.Text.Encoding]::Unicode.GetString($bytes)
        }
        if ($bytes[0] -eq 0xFE -and $bytes[1] -eq 0xFF) {
            return [System.Text.Encoding]::BigEndianUnicode.GetString($bytes)
        }
    }

    $sampleLength = [Math]::Min($bytes.Length, 2000)
    $oddNulls = 0
    $evenNulls = 0
    for ($i = 0; $i -lt $sampleLength; $i++) {
        if ($bytes[$i] -eq 0) {
            if (($i % 2) -eq 0) {
                $evenNulls++
            } else {
                $oddNulls++
            }
        }
    }

    if ($oddNulls -gt 10 -and $oddNulls -gt ($evenNulls * 4)) {
        return [System.Text.Encoding]::Unicode.GetString($bytes)
    }

    if ($evenNulls -gt 10 -and $evenNulls -gt ($oddNulls * 4)) {
        return [System.Text.Encoding]::BigEndianUnicode.GetString($bytes)
    }

    return [System.Text.Encoding]::UTF8.GetString($bytes)
}

$findings = New-Object System.Collections.Generic.List[string]

foreach ($root in $Paths) {
    if (-not (Test-Path -LiteralPath $root)) {
        continue
    }

    Get-ChildItem -LiteralPath $root -Recurse -File | ForEach-Object {
        $file = $_

        if ($Extensions -notcontains $file.Extension) {
            return
        }

        foreach ($part in $excludedParts) {
            if ($file.FullName -match [regex]::Escape("\$part\")) {
                return
            }
        }

        $content = Read-TextFile -Path $file.FullName
        $lines = $content -split "`r?`n"

        for ($i = 0; $i -lt $lines.Length; $i++) {
            foreach ($pattern in $patterns) {
                if ($lines[$i].Contains($pattern)) {
                    $relative = Resolve-Path -LiteralPath $file.FullName -Relative
                    $findings.Add("${relative}:$($i + 1): $($lines[$i])")
                    break
                }
            }

            if ($literalArtifactPatternsByExtension.ContainsKey($file.Extension)) {
                foreach ($pattern in $literalArtifactPatternsByExtension[$file.Extension]) {
                    if ($lines[$i].Contains($pattern)) {
                        $relative = Resolve-Path -LiteralPath $file.FullName -Relative
                        $findings.Add("${relative}:$($i + 1): $($lines[$i])")
                        break
                    }
                }
            }
        }
    }
}

if ($findings.Count -gt 0) {
    Write-Host "Mojibake candidates found:" -ForegroundColor Red
    $findings | ForEach-Object { Write-Host $_ }
    exit 1
}

Write-Host "No mojibake candidates found in source, scripts, root files and docs." -ForegroundColor Green
