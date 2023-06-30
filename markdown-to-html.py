import os
import glob
import json
import markdown

# List to hold all posts data
posts = []

# Iterate over all markdown files in the current directory
for md_file in glob.glob("post*.md"):
    # Read the markdown file
    with open(md_file, 'r') as f:
        lines = f.readlines()

    # Convert to HTML
    html = markdown.markdown(''.join(lines))

    # Write to an HTML file
    html_file_name = md_file.replace('.md', '.html')
    with open(html_file_name, 'w') as f:
        f.write(html)

    # Extract title (assuming it's the first line in markdown file)
    title = lines[0].strip().replace('# ', '')

    # Add post details to list
    posts.append({'title': title, 'path': html_file_name})

# Write posts data to JSON file
with open('posts.json', 'w') as json_file:
    json.dump(posts, json_file)
