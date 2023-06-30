# Get the list of markdown files with the prefix "post"
$markdownFiles = Get-ChildItem -Filter "post*.md" | Where-Object { $_.Name -match '^post\d+\.md$' }

# Check if any files are found
if ($markdownFiles.Count -eq 0) {
    $newFileName = "post0.md"
    $newSequenceNumber = 0
} else {
    # Find the largest sequence number in the existing markdown files
    $largestSequenceNumber = 0
    foreach ($file in $markdownFiles) {
        $sequenceNumber = [regex]::Match($file.Name, '\d+').Value
        $sequenceNumber = [int]$sequenceNumber
        if ($sequenceNumber -gt $largestSequenceNumber) {
            $largestSequenceNumber = $sequenceNumber
        }
    }

    # Create the next markdown file with the incremented sequence number
    $newSequenceNumber = $largestSequenceNumber + 1
    $newFileName = "post$newSequenceNumber.md"
}

# Specify the path to the template file
$templateFilePath = "template.md"

# Read the content of the template file
$templateContent = Get-Content -Path $templateFilePath -Raw

# Replace placeholders in the template content if needed
# Example: $templateContent = $templateContent -replace "placeholder1", "replacement1"
# Uncomment and modify the above line as per your specific needs

# Save the new markdown file with the template content
$templateContent | Out-File -FilePath $newFileName -Encoding UTF8

# Output the name of the newly created markdown file
Write-Output "Created $newFileName"
