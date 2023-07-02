import os
import glob
import json
import markdown
import datetime

# List to hold all posts data
posts = []
stylesheet_path = 'poststyle.css'

# Iterate over all markdown files in the current directory
for md_file in glob.glob("post*.md"):
    # Read the markdown file
    with open(md_file, 'r') as f:
        lines = f.readlines()

    # Convert to HTML
    html_content = markdown.markdown(''.join(lines))

    # Wrap content in HTML tags
    html = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{md_file.replace('.md', '')}</title>
        <link rel="stylesheet" href="{stylesheet_path}">
    </head>
    <body>
        <div class="container">
            <div class="subcontainer">
                {html_content}
            </div>
        </div>
    </body>
    </html>
    """

    # Write to an HTML file
    html_file_name = md_file.replace('.md', '.html')
    with open(html_file_name, 'w') as f:
        f.write(html)

    # Extract title (assuming it's the first line in markdown file)
    title = lines[0].strip().replace('# ', '')

    # Create an excerpt (first 150 characters or entire post if it's shorter)
    excerpt = ''.join(lines[1:]).strip()[:150] + '...'

    # Get the last modified date
    last_modified_date = datetime.datetime.fromtimestamp(os.path.getmtime(md_file))

    # Add post details to list
    posts.append({
        'title': title,
        'path': html_file_name,
        'excerpt': excerpt,
        'last_modified_date': last_modified_date.isoformat(),
    })

# Write posts data to JSON file
with open('posts.json', 'w') as json_file:
    json.dump(posts, json_file)
