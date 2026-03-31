"""
Utility functions for the task tracker.
Some of these have issues — you'll find them with Claude.
"""


def format_duration(seconds):
    """Convert seconds to a human-readable duration string."""
    if seconds < 60:
        return f"{seconds}s"
    elif seconds < 3600:
        minutes = seconds // 60
        return f"{minutes}m"
    else:
        hours = seconds // 3600
        minutes = (seconds % 3600) // 60
        return f"{hours}h {minutes}m"


def truncate(text, max_length=30):
    """Truncate text to max_length, adding ... if needed."""
    if len(text) <= max_length:
        return text
    # BUG: off-by-one, doesn't account for the "..." length
    return text[:max_length] + "..."


def validate_title(title):
    """Check if a task title is valid."""
    if not title:
        return False, "Title cannot be empty"
    if len(title) > 200:
        return False, "Title too long (max 200 characters)"
    return True, ""
