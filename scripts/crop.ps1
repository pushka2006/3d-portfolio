Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path (Get-Location) "public\cyber-hero.jpg"
$destPath = Join-Path (Get-Location) "public\anime-character.png"

$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $src.Width
$h = $src.Height
Write-Host "Source image: $w x $h"

# Crop the anime character and portal on the right
# From X=550 to 1020, Y=10 to 265
$cropX = [int]($w * 0.54)
$cropY = [int]($h * 0.02)
$cropW = [int]($w * 0.45)
$cropH = [int]($h * 0.44)

Write-Host "Crop: X=$cropX, Y=$cropY, W=$cropW, H=$cropH"

$rect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH
$cropped = $src.Clone($rect, $src.PixelFormat)

$cropped.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

$cropped.Dispose()
$src.Dispose()

Write-Host "Generated public\anime-character.png successfully"
