"""
A simple task tracker — deliberately messy.
You'll use Claude Code to understand, fix, and extend it.
"""

import json
import os

TASKS_FILE = "tasks.json"


def load_tasks():
    if os.path.exists(TASKS_FILE):
        with open(TASKS_FILE, "r") as f:
            return json.load(f)
    return []


def save_tasks(tasks):
    with open(TASKS_FILE, "w") as f:
        json.dump(tasks, f, indent=2)


def add_task(title):
    tasks = load_tasks()
    task = {
        "id": len(tasks) + 1,
        "title": title,
        "done": False
    }
    tasks.append(task)
    save_tasks(tasks)
    print(f"Added: {task['title']} (#{task['id']})")


def complete_task(task_id):
    tasks = load_tasks()
    for task in tasks:
        if task["id"] == task_id:
            task["done"] = True
            save_tasks(tasks)
            print(f"Completed: {task['title']}")
            return
    print(f"Task #{task_id} not found")


def list_tasks():
    tasks = load_tasks()
    if not tasks:
        print("No tasks yet. Add one with: python app.py add 'Your task'")
        return
    for task in tasks:
        status = "done" if task["done"] else "todo"
        print(f"  [{status}] #{task['id']} — {task['title']}")


def show_stats():
    tasks = load_tasks()
    total = len(tasks)
    done = len([t for t in tasks if t["done"]])
    # BUG: division by zero when no tasks exist
    percent = (done / total) * 100
    print(f"Progress: {done}/{total} ({percent:.0f}%)")


if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        list_tasks()
    elif sys.argv[1] == "add":
        title = " ".join(sys.argv[2:])
        add_task(title)
    elif sys.argv[1] == "done":
        complete_task(int(sys.argv[2]))
    elif sys.argv[1] == "stats":
        show_stats()
    else:
        print(f"Unknown command: {sys.argv[1]}")
        print("Usage: python app.py [add <title> | done <id> | stats]")
